import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import HeroBackgroundRotator from "@/components/HeroBackgroundRotator";
import { breweries } from "@/data/allBreweries";
import { getVisibleBeerEvents } from "@/data/events";
import { eventUrl, getCurrentEvents } from "@/data/eventDetails";
import { getAutomaticBeerEvents, mergeBeerEvents } from "@/data/automaticEvents";
import { getSquarespaceBeerEvents } from "@/data/squarespaceEvents";
import { breweryProfiles, featuredProfileOrder, representativeBrewerySlugs } from "@/data/breweryProfileContent";
import { getBreweryProfileRoute } from "@/data/breweryProfiles";

export const dynamic = "force-dynamic";

const primaryActions = [
  { label: "Breweries", href: "/breweries", icon: "⌕" },
  { label: "Craft Beer Retailers", href: "/retailers", icon: "▣" },
  { label: "Events", href: "/events", icon: "✦" },
] as const;

const quickPicks = [
  ["Patios", "/breweries?feature=outdoor"],
  ["Full kitchen", "/breweries?food=Full%20kitchen"],
  ["Food trucks", "/breweries?food=Food%20trucks"],
  ["Dog friendly", "/breweries?feature=dog"],
] as const;

function getPittsburghDateParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

const retailerSpotlights = [
  { name: "Hal’s Bottle Shop", description: "North Hills craft beer shop with a Rare Beer Club and build-your-own six-packs.", tags: ["Rare Beer Club", "Local craft beer", "Build-your-own six-packs"] },
  { name: "Beer Towne", description: "Gibsonia retailer offering local craft beers and a published beer menu.", tags: ["Local craft beer", "Gibsonia"] },
  { name: "Creekside Beer", description: "Sewickley-area beer distributor with an online catalog.", tags: ["Beer catalog", "Sewickley"] },
  { name: "Babcock Beer", description: "North Hills retailer with a broad craft beer selection.", tags: ["Craft beer", "North Hills"] },
  { name: "Bethel Beer and More", description: "Bethel Park retailer featuring Pittsburgh craft favorites.", tags: ["Local craft beer", "Bethel Park"] },
] as const;

function getWeeklySpotlight() {
  const { year, month, day } = getPittsburghDateParts();
  const today = Date.UTC(year, month - 1, day, 12);
  const baseMonday = Date.UTC(2026, 8, 14, 12);
  const week = Math.floor((today - baseMonday) / (7 * 24 * 60 * 60 * 1000));
  const cycle = Math.floor(week / 2);
  if (((week % 2) + 2) % 2 === 1) {
    const item = retailerSpotlights[((cycle % retailerSpotlights.length) + retailerSpotlights.length) % retailerSpotlights.length];
    return { category: "Beer retailer", title: item.name, description: item.description, tags: [...item.tags], href: `/retailers?spotlight=${encodeURIComponent(item.name)}`, image: null as null | {url:string;alt:string}, logo: null as null | {url:string;alt:string} };
  }
  const slug = featuredProfileOrder[((cycle % featuredProfileOrder.length) + featuredProfileOrder.length) % featuredProfileOrder.length];
  const representativeSlug = representativeBrewerySlugs[slug];
  const brewery = breweries.find(item => item.slug === representativeSlug) ?? breweries.find(item => item.image) ?? breweries[0];
  const profile = breweryProfiles[slug];
  const route = getBreweryProfileRoute(brewery.slug);
  const places = route ? breweries.filter(item => getBreweryProfileRoute(item.slug) === route) : [brewery];
  return {
    category: "Brewery",
    title: profile?.name ?? brewery.name,
    description: profile?.tagline ?? brewery.blurb,
    tags: (profile?.knownFor ?? [brewery.type]).slice(0,3),
    href: route ?? `/breweries?q=${encodeURIComponent(brewery.name)}`,
    image: places.find(item => item.image)?.image ?? null,
    logo: places.find(item => item.logo)?.logo ?? null,
  };
}

// Editorially choose at most one event per calendar month. Don't silently
// switch to a different event when feeds change or the selected event ends.
const monthlyEventPicks: Record<string, string> = {
  "2026-11": "Brewing for a Cause 2026",
};

function getEventOfTheMonth(events: Awaited<ReturnType<typeof getCurrentEvents>>) {
  const { year, month, day } = getPittsburghDateParts();
  const key = `${year}-${String(month).padStart(2, "0")}`;
  const pickedName = monthlyEventPicks[key];
  if (!pickedName) return null;
  const selected = events.find(e => e.name === pickedName && e.startDate.startsWith(key));
  const today = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  return selected && selected.endDate >= today ? selected : null;
}

function getHeroStorefronts() {
  const root = path.join(process.cwd(), "public", "brand", "breweries");
  const validExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

  function walk(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) return walk(fullPath);

      const extension = path.extname(entry.name).toLowerCase();
      if (!validExtensions.has(extension) || !entry.name.toLowerCase().includes("storefront")) return [];

      const relativePath = path.relative(path.join(process.cwd(), "public"), fullPath).split(path.sep).join("/");
      return [`/${relativePath}`];
    });
  }

  return walk(root).sort();
}

export default async function Home() {
  const upcomingEvents = (await getCurrentEvents()).slice(0, 5);
  const heroStorefronts = getHeroStorefronts();
  const spotlight = getWeeklySpotlight();
  const eventOfTheMonth = getEventOfTheMonth(await getCurrentEvents());
  return (
    <main className="bg-[#171714]">
      <section className="relative overflow-hidden border-b border-white/10">
        <HeroBackgroundRotator images={heroStorefronts} />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="eyebrow">Pittsburgh Brews</div>
            <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              Find Your Brew in Pittsburgh.
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-zinc-200 sm:text-base md:text-lg md:leading-7">
              Discover breweries, beer retailers, and local craft beer events.
            </p>

            <div className="mx-auto mt-7 grid max-w-4xl grid-cols-3 gap-2 sm:gap-3">
              {primaryActions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-[105px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/35 px-1.5 py-3 text-center text-white backdrop-blur-md transition hover:border-[var(--gold)]/70 hover:bg-black/50 sm:min-h-[116px] sm:px-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)] text-base font-black text-black sm:h-10 sm:w-10">
                    {item.icon}
                  </span>
                  <span className="flex min-h-[30px] max-w-full items-center justify-center text-center text-[11px] font-black leading-snug sm:text-sm md:text-base">{item.label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/breweries?near=1"
              className="mx-auto mt-3 flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-[var(--gold)]/60 bg-black/65 px-4 py-4 text-center text-sm font-black text-white backdrop-blur-md transition hover:bg-black/80 sm:text-base"
            >
              <span aria-hidden="true" className="text-[var(--gold)]">⌖</span>
              Find Brews Near Me
              <span aria-hidden="true" className="text-[var(--gold)]">→</span>
            </Link>
            <p className="mt-2 text-center text-xs text-zinc-300">Combined brewery and retailer location search is coming next.</p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {quickPicks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-black text-zinc-100 backdrop-blur-sm transition hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-5 text-[11px] font-black uppercase tracking-[.12em] text-zinc-300/80">
              Independent · Useful filters · Local events · No paid placement
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#eee8d9] text-[#191815]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 md:grid-cols-[1.2fr_.8fr] md:items-center md:px-8">
          <div>
            <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">Why Pittsburgh Brews?</div>
            <h2 className="mt-2 max-w-3xl text-2xl font-black tracking-[-.035em] md:text-3xl">
              Find breweries, shops, and events near Pittsburgh.
            </h2>
          </div>
          <p className="text-sm leading-6 text-[#5e594d] md:text-base">
            Browse brewery locations and craft beer retailers, then explore local events. Business listings are factual and alphabetical — never ranked.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#1d1c18]">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
          <div className="mb-4"><h2 className="text-2xl font-black text-white md:text-3xl">Spotlight</h2></div>
          <Link href={spotlight.href} className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#27251f] transition hover:border-[var(--gold)]/30 md:grid-cols-[1.15fr_.85fr]">
            <div className="flex h-56 items-center justify-center overflow-hidden bg-[#22211d] md:h-72">
              {spotlight.image ? <img src={spotlight.image.url} alt={spotlight.image.alt} className="h-full w-full object-cover" /> :
                spotlight.logo ? <img src={spotlight.logo.url} alt={spotlight.logo.alt} className="max-h-full max-w-full object-contain p-8" /> :
                <div className="text-center"><div className="text-5xl font-black tracking-tight text-[var(--gold)]">PB</div><div className="mt-3 text-xs font-bold uppercase tracking-widest text-zinc-400">Pittsburgh Brews</div></div>}
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400">This week’s {spotlight.category.toLowerCase()}</div>
              <div className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">{spotlight.title}</div>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{spotlight.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{spotlight.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
              <div className="mt-6 text-sm font-black text-[var(--gold)]">Explore →</div>
            </div>
          </Link>
          {eventOfTheMonth && <Link href={eventUrl(eventOfTheMonth)} className="mt-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#27251f] p-5 transition hover:border-[var(--gold)]/30 sm:flex-row sm:items-center">
            {eventOfTheMonth.image && <img src={eventOfTheMonth.image.url} alt={eventOfTheMonth.image.alt} className="h-28 w-full rounded-lg object-contain sm:w-40" />}
            <div className="flex-1">
              <div className="text-xs font-black uppercase tracking-wider text-[var(--gold)]">Event of the Month</div>
              <div className="mt-2 text-xl font-black text-white">{eventOfTheMonth.name}</div>
              <p className="mt-1 text-sm text-zinc-300">{eventOfTheMonth.date} · {eventOfTheMonth.location}</p>
              <div className="mt-3 text-sm font-bold text-[var(--gold)]">Event details →</div>
            </div>
          </Link>}
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f6f1e7] text-[#191815]">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-[#8d6b00]">What’s happening</div>
              <h2 className="mt-1 text-2xl font-black md:text-3xl">Upcoming Pittsburgh beer events</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6a6457]">Festivals, Oktoberfests, brewery happenings, and beer-focused events worth knowing about.</p>
            </div>
            <Link href="/events" className="shrink-0 text-sm font-black text-[#8d6b00] hover:text-black">See all →</Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white/55">
            {upcomingEvents.map((event, index) => (
              <a
                key={event.name}
                href={eventUrl(event)}
                className={`group grid gap-2 px-5 py-4 transition hover:bg-white sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-5 ${index !== upcomingEvents.length - 1 ? "border-b border-black/10" : ""}`}
              >
                <div className="text-xs font-black uppercase tracking-[0.08em] text-[#8d6b00]">{event.date}</div>
                <div>
                  <div className="font-black text-[#191815] group-hover:text-[#8d6b00]">{event.name}</div>
                  <div className="mt-0.5 text-sm text-[#777064]">{event.location}</div>
                </div>
                <div className="hidden text-lg text-[#a59d8f] transition group-hover:translate-x-0.5 group-hover:text-[#8d6b00] sm:block">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#22211d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-sm font-black text-white">Pick a place. Find an event. Go enjoy it.</div>
            <div className="mt-1 text-sm text-zinc-400">Pittsburgh Brews is independently maintained for local beer drinkers and visitors.</div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/about" className="text-white hover:text-[var(--gold)]">Why Pittsburgh Brews? →</Link>
            <Link href="/submit" className="text-zinc-400 hover:text-white">Submit an update →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
