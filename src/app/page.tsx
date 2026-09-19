import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import HeroBackgroundRotator from "@/components/HeroBackgroundRotator";
import { breweries } from "@/data/allBreweries";
import { beerEvents } from "@/data/events";
import { featuredProfileOrder, representativeBrewerySlugs } from "@/data/breweryProfileContent";
import { getBreweryProfileRoute } from "@/data/breweryProfiles";

export const revalidate = 3600;

const primaryActions = [
  { label: "Brewery Search", href: "/breweries", icon: "⌕" },
  { label: "Browse by Area", href: "/areas", icon: "◎" },
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

function getFeaturedBrewery() {
  const { year, month, day } = getPittsburghDateParts();
  const today = new Date(Date.UTC(year, month - 1, day, 12));
  const baseMonday = Date.UTC(2026, 8, 14, 12);
  const weekIndex = Math.floor((today.getTime() - baseMonday) / (7 * 24 * 60 * 60 * 1000));
  const profileSlug = featuredProfileOrder[((weekIndex % featuredProfileOrder.length) + featuredProfileOrder.length) % featuredProfileOrder.length];
  const brewerySlug = representativeBrewerySlugs[profileSlug];

  return breweries.find((brewery) => brewery.slug === brewerySlug) ??
    breweries.find((brewery) => brewery.image) ??
    breweries[0];
}

const featuredBrewery = getFeaturedBrewery();

const upcomingEvents = beerEvents.slice(0, 5);

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

export default function Home() {
  const heroStorefronts = getHeroStorefronts();
  return (
    <main className="bg-[#171714]">
      <section className="relative overflow-hidden border-b border-white/10">
        <HeroBackgroundRotator images={heroStorefronts} />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="eyebrow">Independent Pittsburgh beer guide</div>
            <h1 className="mt-3 whitespace-nowrap text-[clamp(1.65rem,7vw,4rem)] font-black tracking-[-0.05em] text-white">
              Pittsburgh beer, made easier.
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-zinc-200 sm:text-base md:text-lg md:leading-7">
              Find breweries, browse by area, and discover local beer events — without turning a night out into a project.
            </p>

            <div className="mx-auto mt-7 grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
              {primaryActions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-[72px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/35 px-2 py-3 text-center text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[var(--gold)]/70 hover:bg-black/50 sm:min-h-[82px] sm:px-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-base font-black text-black sm:h-9 sm:w-9">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-black leading-tight sm:text-sm md:text-base">{item.label}</span>
                </Link>
              ))}
            </div>

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
              Independent guide · Local events · No paid placement
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#eee8d9] text-[#191815]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 md:grid-cols-[1.2fr_.8fr] md:items-center md:px-8">
          <div>
            <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">Why Pittsburgh Brews?</div>
            <h2 className="mt-2 max-w-3xl text-2xl font-black tracking-[-.035em] md:text-3xl">
              Less planning. More enjoying Pittsburgh beer.
            </h2>
          </div>
          <p className="text-sm leading-6 text-[#5e594d] md:text-base">
            One place for current brewery details, useful filters, upcoming beer events, and a little inspiration for where to go next.
          </p>
        </div>
      </section>

      {featuredBrewery && (
        <section className="border-b border-white/10 bg-[#1d1c18]">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.12em] text-[var(--gold)]">Featured brewery</div>
                <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">Worth a stop</h2>
              </div>
              <Link href="/breweries" className="text-sm font-black text-zinc-400 transition hover:text-[var(--gold)]">Browse all →</Link>
            </div>

            <Link
              href={getBreweryProfileRoute(featuredBrewery.slug) ?? `/breweries?q=${encodeURIComponent(featuredBrewery.name)}`}
              className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#27251f] transition hover:border-[var(--gold)]/30 md:grid-cols-[1.15fr_.85fr]"
            >
              {featuredBrewery.image ? (
                <div className="h-56 overflow-hidden bg-[#22211d] md:h-72">
                  <img
                    src={featuredBrewery.image.url}
                    alt={featuredBrewery.image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-[#22211d] text-5xl text-[var(--gold)] md:h-72">🍺</div>
              )}

              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400">{featuredBrewery.neighborhood}</div>
                <div className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">{featuredBrewery.name}</div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">{featuredBrewery.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="tag">{featuredBrewery.food}</span>
                  {featuredBrewery.outdoor && <span className="tag">Patio</span>}
                  {featuredBrewery.dogFriendly && <span className="tag">Dog friendly</span>}
                </div>
                <div className="mt-6 text-sm font-black text-[var(--gold)]">Check it out →</div>
              </div>
            </Link>
          </div>
        </section>
      )}

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
                href={event.url}
                target="_blank"
                rel="noreferrer"
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
