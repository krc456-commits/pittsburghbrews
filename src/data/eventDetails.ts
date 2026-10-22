import eventImageFiles from "@/data/eventImageFiles.json";
import type { BeerEvent } from "@/data/events";
import { getVisibleBeerEvents } from "@/data/events";
import { getAutomaticBeerEvents, mergeBeerEvents } from "@/data/automaticEvents";
import { getSquarespaceBeerEvents } from "@/data/squarespaceEvents";
import { getTribeBeerEvents } from "@/data/tribeEvents";
import { getOfficialEventArtwork } from "@/data/officialEventArtwork";
import { verifiedCalendarAdditions } from "@/data/verifiedCalendarAdditions";
import { getApprovedSubmittedEvents } from "@/data/submittedEvents";
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
  { match: /golden age/i, slug: "golden-age" },
  { match: /trace brewing/i, slug: "trace-brewing" },
  { match: /hitchhiker.*sharpsburg|sharpsburg.*hitchhiker/i, slug: "hitchhiker-sharpsburg" },
  { match: /hitchhiker.*lebanon|lebanon.*hitchhiker/i, slug: "hitchhiker-mt-lebanon" },
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



// Use uploaded event-specific artwork where the event identity is unambiguous.
// Keep the original artwork intact; never use these for unrelated venue events.
function withUploadedEventArtwork(event: BeerEvent): BeerEvent {
  const name = event.name.toLowerCase();
  const location = event.location.toLowerCase();
  const image = (
    name.includes("brewing for a cause") && event.startDate.startsWith("2026")
      ? { url: "/brand/events/BrewingForACause2026.png", alt: "Official Brewing for a Cause 2026 event flyer" }
    : name.includes("pittsburgh winter beerfest") && event.startDate.startsWith("2027")
      ? { url: "/brand/events/PittsburghWinterBeerFest2027.png", alt: "Official Pittsburgh Winter Beerfest 2027 event flyer" }
    : name.includes("hops and hayrides") && /trax/.test(location)
      ? { url: "/brand/events/HopsHayridesTraxFarm2026.png", alt: "Official Hops and Hayrides at Trax Farm Market 2026 event flyer" }
    : name.includes("nightmare bar") && /eleventh hour/.test(location)
      ? { url: "/brand/events/NightmareBarEleventhHour2026.png", alt: "Official Nightmare Bar at Eleventh Hour Brewing 2026 event flyer" }
    : name.includes("scream bar") && /hundred acres/.test(location)
      ? { url: "/brand/events/ScreamBarHundredAcresManor2026.png", alt: "Official Scream Bar at Hundred Acres Manor 2026 event flyer" }
    : /plant\s*pop[ -]?up/i.test(event.name) && /trace/i.test(location) && event.startDate.startsWith("2026-10")
      ? { url: "/brand/events/PlantPopUpTrace2026.png", alt: "Official Plant Pop-Up at Trace Brewing 2026 event flyer" }
    : null
  );
  return image ? { ...event, image } : event;
}


// Files named event-name.png in public/brand/events are picked
// up automatically after a GitHub upload triggers the next deployment.
// Match only events already verified from curated data or approved calendars.
// Ambiguous names are deliberately ignored rather than attaching wrong artwork.
function artworkKey(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function eventUploadArtwork(events: BeerEvent[]): Map<string, BeerEvent["image"]> {
  const result = new Map<string, BeerEvent["image"]>();
  const files: string[] = eventImageFiles;
  const compact = (value: string) => artworkKey(value).replace(/-/g, "");
  for (const filename of files) {
    const parts=filename.match(/^(.+)\.(png|jpe?g|webp|avif)$/i);
    if (!parts) continue;
    const basename=parts[1];
    const fileYear=basename.match(/20\d{2}/)?.[0];
    const stem=compact(basename.replace(/20\d{2}/g,""));
    if (stem.length<12) continue;
    const matches=events.filter(event=>{
      if (fileYear && !event.startDate.startsWith(fileYear)) return false;
      const name=compact(event.name);
      return name===stem || name.includes(stem);
    });
    // Never guess which event owns a flyer when filenames overlap.
    if (matches.length!==1) continue;
    const event=matches[0];
    const key=artworkKey(event.name);
    result.set(key,{url:"/brand/events/"+encodeURIComponent(filename),alt:"Event flyer: "+event.name});
  }
  return result;
}

export function eventSlug(event: BeerEvent) {
  return [event.startDate, event.name, event.location].join("-").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 220);
}
export function eventUrl(event: BeerEvent) {
  return "/events/" + eventSlug(event);
}

export function isRoutineEvent(event: BeerEvent) {
  const text = `${event.name} ${event.description}`;
  // Venue calendar entries such as BYO-food nights, vendor visits and themed trivia
  // are day-to-day happenings, even when a calendar labels them as a holiday.
  if (/acrospire/i.test(event.location) && !/festival|beerfest|anniversary|ticketed concert|oktoberfest/i.test(event.name)) return true;
  if (/\bBYO\s*food\b|\bBYOFood\b|\bfood trucks?\b|\bvisiting food vendor\b/i.test(event.name)) return true;
  return event.category === "Food trucks"
    || event.category === "Trivia & games"
    || /\bweekly\b|\bevery (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(`${event.name} ${event.description}`);
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
export async function getCurrentEvents(includeHidden = false) {
  const [ics, squarespace, tribe, artwork, submitted] = await Promise.all([getAutomaticBeerEvents(), getSquarespaceBeerEvents(), getTribeBeerEvents(), getOfficialEventArtwork(), getApprovedSubmittedEvents()]);
  const merged = getVisibleBeerEvents(7, mergeBeerEvents(getVisibleBeerEvents(), [...submitted, ...verifiedCalendarAdditions, ...ics, ...squarespace, ...tribe]));
  let hidden = new Set<string>();
  try {
    const url = process.env.SUPABASE_URL, key=process.env.SUPABASE_PUBLISHABLE_KEY;
    if(url){
      const res=await fetch(url+"/rest/v1/event_hidden_sources?select=event_key",{headers:{apikey:key||""},cache:"no-store"});
      if(res.ok) hidden=new Set((await res.json() as {event_key:string}[]).map(x=>x.event_key));
    }
  }catch(error){console.error("Event visibility lookup failed",error)}
  const events=includeHidden?merged:merged.filter(event=>!hidden.has(eventSlug(event)));
  const uploaded = eventUploadArtwork(events);
  return events.map(event => {
    const key = artworkKey(event.name);
    const official = uploaded.get(key) ?? artwork.get(event.name);
    return withUploadedEventArtwork(withVenueImage(official ? { ...event, image: official } : event));
  });
}
export function findEvent(events: BeerEvent[], slug: string) {
  return events.find(e => eventSlug(e) === slug);
}
