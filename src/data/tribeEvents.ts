import type { BeerEvent } from "@/data/events";
import { classifyEvent } from "@/data/eventClassification";

type TribeVenue = { venue?: string; address?: string; city?: string; stateprovince?: string };
type TribeImage = { url?: string; alt?: string };
type TribeEvent = {
  title?: string;
  description?: string;
  excerpt?: string;
  start_date?: string;
  end_date?: string;
  url?: string;
  venue?: TribeVenue;
  image?: TribeImage;
  status?: string;
};

const sources = [
  {
    brewery: "Hitchhiker Brewing Co.",
    endpoint: "https://hitchhiker.beer/wp-json/tribe/events/v1/events",
    allowedHost: "hitchhiker.beer",
  },
] as const;

function plainText(value: unknown) {
  return typeof value === "string"
    ? value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#(?:39|x27);|&apos;/gi, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim()
    : "";
}

function isoDay(value: string | undefined) {
  const match = value?.match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? null;
}

function displayDay(day: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${day}T12:00:00Z`));
}

function displayTime(value: string | undefined) {
  const match = value?.match(/[T ](\d{2}):(\d{2})/);
  if (!match) return "";
  const hour = Number(match[1]);
  const minute = match[2] === "00" ? "" : `:${match[2]}`;
  return `${hour % 12 || 12}${minute} ${hour >= 12 ? "PM" : "AM"}`;
}

function approvedUrl(raw: string | undefined, host: string, fallback: string) {
  try {
    const url = new URL(raw || fallback);
    return url.protocol === "https:" && url.hostname === host ? url.href : fallback;
  } catch { return fallback; }
}

function parseEvent(item: TribeEvent, source: typeof sources[number], today: string, lastDay: string): BeerEvent | null {
  if (item.status?.toLowerCase() === "cancelled") return null;
  const title = plainText(item.title).slice(0, 130);
  const startDate = isoDay(item.start_date);
  const endDate = isoDay(item.end_date) ?? startDate;
  if (!title || !startDate || !endDate || endDate < today || startDate > lastDay || endDate < startDate) return null;

  const description = plainText(item.description || item.excerpt).slice(0, 350) || `Listed on the official ${source.brewery} calendar. Confirm details with the brewery.`;
  const venue = item.venue;
  const place = [plainText(venue?.venue), plainText(venue?.address), plainText(venue?.city)].filter(Boolean).join(" · ");
  if (!place || !/hitchhiker|sharpsburg|lebanon/i.test(place)) return null;
  const url = approvedUrl(item.url, source.allowedHost, `https://${source.allowedHost}/events/`);
  const startTime = displayTime(item.start_date);
  const endTime = displayTime(item.end_date);
  const time = startTime ? ` · ${startTime}${endTime && endTime !== startTime ? `–${endTime}` : ""}` : "";
  const imageUrl = approvedUrl(item.image?.url, source.allowedHost, "");
  const image = imageUrl ? { url: imageUrl, alt: `Official event image: ${plainText(item.image?.alt) || title}`, credit: source.brewery } : undefined;

  return {
    name: `${title} · ${source.brewery}`,
    date: startDate === endDate ? `${displayDay(startDate)}${time}` : `${displayDay(startDate)} – ${displayDay(endDate)}`,
    startDate,
    endDate,
    location: place,
    category: classifyEvent(title, description),
    description,
    url,
    image,
  };
}

export async function getTribeBeerEvents(): Promise<BeerEvent[]> {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const last = new Date(`${today}T12:00:00Z`);
  last.setUTCDate(last.getUTCDate() + 180);
  const lastDay = last.toISOString().slice(0, 10);

  const results = await Promise.all(sources.map(async source => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      try {
        const query = new URLSearchParams({ start_date: today, end_date: lastDay, per_page: "100" });
        const response = await fetch(`${source.endpoint}?${query}`, { next: { revalidate: 21600 }, signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok || Number(response.headers.get("content-length") ?? 0) > 1500000) return [];
        const raw = await response.text();
        if (raw.length > 1500000) return [];
        const body: unknown = JSON.parse(raw);
        const events = body && typeof body === "object" && Array.isArray((body as { events?: unknown[] }).events) ? (body as { events: TribeEvent[] }).events : [];
        return events.slice(0, 100).map(item => parseEvent(item, source, today, lastDay)).filter((event): event is BeerEvent => event !== null);
      } finally { clearTimeout(timeout); }
    } catch { return []; }
  }));
  return results.flat();
}
