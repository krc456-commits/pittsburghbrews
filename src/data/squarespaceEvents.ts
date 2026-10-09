import type { BeerEvent } from "@/data/events";

// Squarespace supports structured public collection output. Sources below are
// reviewed brewery-owned calendar pages. If a source becomes unavailable or
// changes format, it fails closed and manual listings remain untouched.
const calendars = [
  { page: "https://www.11thhourbrews.com/foodtrucks-1", brewery: "Eleventh Hour Brewing", location: "Eleventh Hour Brewing · Lawrenceville" },
  { page: "https://pittsburgh.stbcbeer.com/taproomevents", brewery: "Southern Tier Pittsburgh", location: "Southern Tier Brewing · North Shore" },
] as const;

function pittsburghDate(timestamp: number): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(timestamp));
  const fields = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return `${fields.year}-${fields.month}-${fields.day}`;
}
function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
function plainText(input: unknown): string {
  return typeof input === "string" ? input.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim() : "";
}
type SourceItem = Record<string, unknown>;
function itemsFrom(value: unknown): SourceItem[] {
  if (!value || typeof value !== "object") return [];
  const v = value as Record<string, unknown>;
  const candidate = [v.upcoming, v.items, (v.collection as Record<string, unknown> | undefined)?.items]
    .find(Array.isArray);
  return Array.isArray(candidate) ? candidate.filter(item => item && typeof item === "object") as SourceItem[] : [];
}
function parseItem(item: SourceItem, calendar: typeof calendars[number], today: string): BeerEvent | null {
  const metadata = item.structuredContent && typeof item.structuredContent === "object" ? item.structuredContent as SourceItem : {};
  const title = plainText(item.title).slice(0, 120);
  const startValue = Number(metadata.startDate ?? item.startDate);
  const endValue = Number(metadata.endDate ?? item.endDate ?? startValue);
  if (!title || !Number.isFinite(startValue) || !Number.isFinite(endValue) || startValue < 1000000000000 || endValue < startValue) return null;
  const startDate = pittsburghDate(startValue);
  const endDate = pittsburghDate(endValue);
  if (endDate < today || startDate > pittsburghDate(Date.now() + 180 * 86400000)) return null;
  const rawPath = plainText(item.fullUrl ?? item.urlId);
  let url = calendar.page;
  if (rawPath) {
    try {
      const resolved = new URL(rawPath.startsWith("/") ? rawPath : `/${rawPath}`, calendar.page);
      if (resolved.origin === new URL(calendar.page).origin && resolved.protocol === "https:") url = resolved.href;
    } catch { /* Keep source calendar link. */ }
  }
  const name = title;
  const description = plainText(item.excerpt ?? item.body ?? item.description).slice(0, 300) || `Listed on the ${calendar.brewery} event calendar. Check the source for full details and changes.`;
  const category = /trivia|bingo|game night|quiz/i.test(name + " " + description) ? "Trivia & games" as const
    : /food truck|pizza|bbq|taco|tortas|sando|wrap|trailer|chamo|rincon|horns|boonseek|77 club|off the press/i.test(name) ? "Food trucks" as const
    : /music|concert|band|dj|comedy/i.test(name + " " + description) ? "Live music" as const : "Beer Event" as const;
  return { name: `${name} · ${calendar.brewery}`, date: startDate === endDate ? displayDate(startDate) : `${displayDate(startDate)} – ${displayDate(endDate)}`, startDate, endDate, location: calendar.location, category, description, url };
}

export async function getSquarespaceBeerEvents(): Promise<BeerEvent[]> {
  const today = pittsburghDate(Date.now());
  const fetched = await Promise.all(calendars.map(async calendar => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);
      try {
        const response = await fetch(`${calendar.page}?format=json-pretty`, { next: { revalidate: 21600 }, signal: controller.signal });
        if (!response.ok || Number(response.headers.get("content-length") ?? 0) > 800000) return [];
        const raw = await response.text();
        if (raw.length > 800000) return [];
        const body: unknown = JSON.parse(raw);
        return itemsFrom(body).slice(0, 150).map(item => parseItem(item, calendar, today)).filter((item): item is BeerEvent => item !== null);
      } finally { clearTimeout(timeout); }
    } catch { return []; }
  }));
  return fetched.flat();
}
