import type { BeerEvent } from "@/data/events";
import { getVisibleBeerEvents } from "@/data/events";
import { getAutomaticBeerEvents, mergeBeerEvents } from "@/data/automaticEvents";
import { getSquarespaceBeerEvents } from "@/data/squarespaceEvents";

export function eventSlug(event: BeerEvent) {
  return [event.startDate, event.name, event.location].join("-").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 220);
}
export function eventUrl(event: BeerEvent) {
  return "/events/" + eventSlug(event);
}
export async function getCurrentEvents() {
  const [ics, squarespace] = await Promise.all([getAutomaticBeerEvents(), getSquarespaceBeerEvents()]);
  return getVisibleBeerEvents(0, mergeBeerEvents(getVisibleBeerEvents(), [...ics, ...squarespace]));
}
export function findEvent(events: BeerEvent[], slug: string) {
  return events.find(e => eventSlug(e) === slug);
}
