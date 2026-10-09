import type { BeerEvent } from "@/data/events";
import { getVisibleBeerEvents } from "@/data/events";
import { getAutomaticBeerEvents, mergeBeerEvents } from "@/data/automaticEvents";
import { getSquarespaceBeerEvents } from "@/data/squarespaceEvents";
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
export async function getCurrentEvents() {
  const [ics, squarespace] = await Promise.all([getAutomaticBeerEvents(), getSquarespaceBeerEvents()]);
  return getVisibleBeerEvents(0, mergeBeerEvents(getVisibleBeerEvents(), [...ics, ...squarespace])).map(withVenueImage);
}
export function findEvent(events: BeerEvent[], slug: string) {
  return events.find(e => eventSlug(e) === slug);
}
