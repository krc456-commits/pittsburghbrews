import Link from "next/link";
import { breweries } from "@/data/allBreweries";
import { beerEvents } from "@/data/events";

const primaryActions = [
  { label: "Brewery Search", href: "/breweries", icon: "⌕" },
  { label: "Browse by Area", href: "/areas", icon: "◎" },
  { label: "Events", href: "/events", icon: "✦" },
] as const;

const featuredBrewery =
  breweries.find((brewery) => brewery.slug === "hitchhiker-sharpsburg") ??
  breweries.find((brewery) => brewery.image) ??
  breweries[0];

const upcomingEvents = beerEvents.slice(0, 4);

export default function Home() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_80%_10%,rgba(255,207,36,.08),transparent_28rem),#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">Pittsburgh Brews</div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
              Pittsburgh beer, made easier.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Find breweries, taprooms, food, patios, and local beer events around Pittsburgh and Western Pennsylvania.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
            {primaryActions.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex min-h-[74px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#151514] px-2 py-3 text-center text-white transition hover:-translate-y-0.5 hover:border-[var(--gold)]/50 hover:bg-[#1a1a18] sm:min-h-[82px] sm:px-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-base font-black text-black sm:h-9 sm:w-9">
                  {item.icon}
                </span>
                <span className="text-xs font-black leading-tight sm:text-sm md:text-base">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredBrewery && (
        <section className="border-b border-white/8 bg-[#10100f]">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.12em] text-[var(--gold)]">Featured brewery</div>
                <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">Worth a stop</h2>
              </div>
              <Link href="/breweries" className="text-sm font-black text-zinc-400 transition hover:text-[var(--gold)]">Browse all →</Link>
            </div>

            <Link
              href={`/breweries?q=${encodeURIComponent(featuredBrewery.name)}`}
              className="group grid overflow-hidden rounded-2xl border border-white/8 bg-[#141413] transition hover:border-[var(--gold)]/30 md:grid-cols-[1.15fr_.85fr]"
            >
              {featuredBrewery.image ? (
                <div className="h-56 overflow-hidden bg-[#191918] md:h-72">
                  <img
                    src={featuredBrewery.image.url}
                    alt={featuredBrewery.image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-[#191918] text-5xl text-[var(--gold)] md:h-72">🍺</div>
              )}

              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-500">{featuredBrewery.neighborhood}</div>
                <div className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">{featuredBrewery.name}</div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">{featuredBrewery.blurb}</p>
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

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-600">On the calendar</div>
              <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">Upcoming beer events</h2>
            </div>
            <Link href="/events" className="text-sm font-black text-[var(--gold)]">See all →</Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-[#121211]">
            {upcomingEvents.map((event, index) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className={`group grid gap-2 px-5 py-4 transition hover:bg-white/[.025] sm:grid-cols-[170px_1fr_auto] sm:items-center sm:gap-5 ${index !== upcomingEvents.length - 1 ? "border-b border-white/8" : ""}`}
              >
                <div className="text-xs font-black uppercase tracking-[0.08em] text-[var(--gold)]">{event.date}</div>
                <div>
                  <div className="font-black text-white group-hover:text-[var(--gold)]">{event.name}</div>
                  <div className="mt-0.5 text-sm text-zinc-500">{event.location}</div>
                </div>
                <div className="hidden text-lg text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-[var(--gold)] sm:block">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111110]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="text-sm text-zinc-600">Pittsburgh Brews is independently maintained.</div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/about" className="text-white hover:text-[var(--gold)]">About →</Link>
            <Link href="/submit" className="text-zinc-400 hover:text-white">Submit an update →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
