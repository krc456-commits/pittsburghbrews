import type { BeerEvent } from "@/data/events";

// Only operator-approved, publicly accessible HTTPS .ics feeds belong here.
// Feed subscriptions can also be supplied as a comma-separated EVENTS_ICS_FEEDS env var.
// Unknown formats, malformed events, and failed requests are ignored rather than published.
const curatedFeeds: string[] = [];
const knownCategories = ["Oktoberfest", "Festival", "Holiday themed", "Beer garden", "Beer Event"] as const;

function parseIcsDate(raw: string): string | null {
  const match = raw.match(/^(\d{4})(\d{2})(\d{2})(?:T\d{6}Z?)?$/);
  if (!match) return null;
  const iso = `${match[1]}-${match[2]}-${match[3]}`;
  const parsed = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso ? null : iso;
}
function unescapeIcs(text: string): string {
  return text.replace(/\\n/gi, " ").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\").trim();
}
function readField(rows: string[], field: string) {
  const line = rows.find(row => row.split(":")[0].split(";")[0].toUpperCase() === field);
  return line ? line.slice(line.indexOf(":") + 1) : "";
}
function parseFeed(feed: string, sourceUrl: string): BeerEvent[] {
  const unfolded = feed.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
  const events = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];
  const output: BeerEvent[] = [];
  for (const block of events.slice(0, 400)) {
    const rows = block.split(/\r?\n/);
    if (readField(rows, "STATUS").toUpperCase() === "CANCELLED") continue;
    // Recurrence expansion requires a dedicated calendar library. Do not invent occurrences.
    if (readField(rows, "RRULE") || readField(rows, "RECURRENCE-ID")) continue;
    const name = unescapeIcs(readField(rows, "SUMMARY")).slice(0, 130);
    const startDate = parseIcsDate(readField(rows, "DTSTART"));
    let endDate = parseIcsDate(readField(rows, "DTEND")) ?? startDate;
    if (!name || !startDate || !endDate) continue;
    // All-day .ics events usually use an exclusive DTEND.
    if (rows.some(row => /^DTEND;VALUE=DATE:/i.test(row))) {
      const prev = new Date(`${endDate}T12:00:00Z`);
      prev.setUTCDate(prev.getUTCDate() - 1);
      endDate = prev.toISOString().slice(0, 10);
    }
    if (endDate < startDate) continue;
    const location = unescapeIcs(readField(rows, "LOCATION")).slice(0, 160);
    if (!location) continue;
    const rawUrl = unescapeIcs(readField(rows, "URL"));
    const url = /^https:\/\//i.test(rawUrl) ? rawUrl : sourceUrl;
    const description = unescapeIcs(readField(rows, "DESCRIPTION")).slice(0, 350);
    const holiday = /halloween|christmas|xmas|holiday|valentine|st\. patrick|st patrick|new year|easter|thanksgiving|winter pop.up/i.test(name + " " + description);
    const category = holiday ? "Holiday themed" : knownCategories.find(c => name.toLowerCase().includes(c.toLowerCase())) ?? "Beer Event";
    output.push({ name, date: startDate === endDate ? startDate : `${startDate} to ${endDate}`, startDate, endDate, location, category, description, url });
  }
  return output;
}

export async function getAutomaticBeerEvents(): Promise<BeerEvent[]> {
  const configured = (process.env.EVENTS_ICS_FEEDS ?? "").split(",").map(s => s.trim()).filter(Boolean);
  const feeds = [...new Set([...curatedFeeds, ...configured])].filter(s => /^https:\/\//i.test(s)).slice(0, 12);
  const results = await Promise.all(feeds.map(async url => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);
      try {
        const response = await fetch(url, { next: { revalidate: 21600 }, signal: controller.signal, headers: { Accept: "text/calendar" } });
        if (!response.ok || Number(response.headers.get("content-length") ?? 0) > 500000) return [];
        const body = await response.text();
        return body.length < 500000 && body.includes("BEGIN:VCALENDAR") ? parseFeed(body, url) : [];
      } finally { clearTimeout(timeout); }
    } catch { return []; }
  }));
  return results.flat();
}

export function mergeBeerEvents(manual: BeerEvent[], automatic: BeerEvent[]) {
  const seen = new Set<string>();
  return [...manual, ...automatic].filter(e => {
    const key = `${e.name.toLowerCase().replace(/[^a-z0-9]/g, "")}|${e.startDate}|${e.location.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
