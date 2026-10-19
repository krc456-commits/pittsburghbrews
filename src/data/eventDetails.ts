import type { BeerEvent } from "@/data/events";
import { getVisibleBeerEvents } from "@/data/events";
import { getAutomaticBeerEvents, mergeBeerEvents } from "@/data/automaticEvents";
import { getSquarespaceBeerEvents } from "@/data/squarespaceEvents";
import { getOfficialEventArtwork } from "@/data/officialEventArtwork";
import { breweries } from "@/data/allBreweries";

// Map only unambiguous event locations to existing brewery location photos.
// Do not confuse venue photography with an event flyer, or show unrelated images.
const venueImages: { match: RegExp; slug: string }[] = [
  { match: /dancing gnome/i, slug: "dancing-gnome" },
  { match: /eleventh hour|11th hour/i, slug: "eleventh-hour" },
  { match: /southern tier/i, slug: "southern-tier-pittsburgh" },
  { match: /penn brewery/i, slug: "penn-brewery" },
  { match: /pittsburgh brewing company/i, slug: "pittsburgh-brewing-company" },
  { match: /lincoln avenue brewery/i, slug: "lincoln-avenue-brewery" },
  { match: /balance brewing/i, slug: "balance-brewing" },
  { match: /cinderlands warehouse/i, slug: "cinderlands-warehouse" },
  { match: /cinderlands.*wexford/i, slug: "cinderlands-wexford" },
  { match: /abjuration.*hazelwood/i, slug: "abjuration-hazelwood" },
  { match: /burghers.*millvale|burgh.ers.*millvale/i, slug: "burghers-millvale" },
];
function withVenueImage(event: BeerEvent): BeerEvent {
  if (event.image) return event;
  const match = venueImages.find(x => x.match.test(event.location));
  const image = match && breweries.find(b => b.slug === match.slug)?.image;
  return image ? { ...event, image: { url: image.url, alt: `Brewery venue photo: ${image.alt}`, credit: image.credit } } : event;
}


export function eventSlug(event: BeerEvent) {
  return [event.startDate, event.name, event.location].join("-").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 220);
}
export function eventUrl(event: BeerEvent) {
  return "/events/" + eventSlug(event);
}

export function isRoutineEvent(event: BeerEvent) {
  return event.category === "Food trucks" || event.category === "Trivia & games";
}

// Kevin's editorial pick for each Monday. Keeping this list explicit makes the
// feature feel curated instead of letting the largest automated feed choose it.
// Add a new Monday + exact event name whenever you want to change the feature.
const weeklyEventPicks: Record<string, string> = {
  "2026-10-19": "Hops and Hayrides at Trax Farm Market",
  "2026-11-09": "Brewing for a Cause 2026",
};

function pittsburghDayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function weekMonday(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

function eventTouchesWindow(event: BeerEvent, start: string, end: string) {
  if (event.occurrences?.length) return event.occurrences.some(date => date >= start && date <= end);
  return event.startDate <= end && event.endDate >= start;
}

export function getWeeklyFeaturedEvent(events: BeerEvent[]) {
  const today = pittsburghDayKey();
  const monday = weekMonday(today);
  const selectedName = weeklyEventPicks[monday];
  const selected = selectedName ? events.find(event => event.name === selectedName) : undefined;
  if (selected) return selected;

  const end = new Date(`${today}T12:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 7);
  const endKey = end.toISOString().slice(0, 10);
  return events.find(event => event.featured && !isRoutineEvent(event) && eventTouchesWindow(event, today, endKey))
    ?? events.find(event => !isRoutineEvent(event) && eventTouchesWindow(event, today, endKey))
    ?? null;
}
export async function getCurrentEvents() {
  const [ics, squarespace, artwork] = await Promise.all([getAutomaticBeerEvents(), getSquarespaceBeerEvents(), getOfficialEventArtwork()]);
  return getVisibleBeerEvents(7, mergeBeerEvents(getVisibleBeerEvents(), [...ics, ...squarespace])).map(event => {
    const official = artwork.get(event.name);
    return withVenueImage(official ? { ...event, image: official } : event);
  });
}
export function findEvent(events: BeerEvent[], slug: string) {
  return events.find(e => eventSlug(e) === slug);
}
