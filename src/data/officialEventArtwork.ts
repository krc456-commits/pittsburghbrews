import type { BeerEvent } from "@/data/events";

// Organizer-owned event listings expose event-specific poster URLs through their
// public calendar API. Embed the original URL only; never generate/recreate posters.
type PublicEvent = { title?: string; start_date?: string; image?: { url?: string; alt?: string }; url?: string };
export async function getOfficialEventArtwork(): Promise<Map<string, BeerEvent["image"]>> {
  const results = new Map<string, BeerEvent["image"]>();
  const endpoint = "https://friendsoftheriverfront.org/wp-json/tribe/events/v1/events?search=Slammin%27%20Cans&per_page=20";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    try {
      const response = await fetch(endpoint, { next: { revalidate: 21600 }, signal: controller.signal, headers: { Accept: "application/json" } });
      if (!response.ok) return results;
      const raw = await response.text();
      if (raw.length > 250000) return results;
      const body: unknown = JSON.parse(raw);
      if (!body || typeof body !== "object") return results;
      const events = (body as { events?: PublicEvent[] }).events;
      if (!Array.isArray(events)) return results;
      for (const event of events.slice(0, 20)) {
        if (!/slammin.*cans/i.test(event.title ?? "") || !/^2026-10-10/.test(event.start_date ?? "")) continue;
        const poster = event.image?.url;
        if (!poster) continue;
        const url = new URL(poster);
        // Restrict to the official organizer's own website, never unrelated photos.
        if (url.protocol !== "https:" || url.hostname !== "friendsoftheriverfront.org") continue;
        results.set("2026 Slammin' Cans Graffiti Jam", {
          url: url.href,
          alt: "Official 2026 Slammin' Cans Graffiti Jam event artwork from Friends of the Riverfront",
          credit: "Friends of the Riverfront",
        });
      }
    } finally { clearTimeout(timeout); }
  } catch { /* Use the venue image or branded fallback. */ }
  return results;
}
