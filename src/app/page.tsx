import Link from "next/link";
import { breweries } from "@/data/allBreweries";
import { beerEvents } from "@/data/events";

const primaryActions = [
  {
    label: "Brewery Search",
    href: "/breweries",
    icon: "⌕",
  },
  {
    label: "Browse by Area",
    href: "/areas",
    icon: "◎",
  },
  {
    label: "Events",
    href: "/events",
    icon: "✦",
  },
] as const;

const featuredBreweries = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);
const featuredEvents = beerEvents.filter((event) => event.featured).slice(0, 3);

export default function Home() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_80%_10%,rgba(255,207,36,.08),transparent_28rem),#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <div className="eyebrow">Pittsburgh Brews</div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
              Pittsburgh beer, made easier.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Find breweries, taprooms, food, patios, and local beer events around Pittsburgh and Western Pennsylvania.
            </p>
          </div>

          <div className="mt-8">
            <div className="text-sm font-black uppercase tracking-[0.12em] text-zinc-500">Jump in</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {primaryActions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex min-w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-[#151514] px-5 py-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--gold)]/50 hover:bg-[#1a1a18]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-lg font-black text-black">
                    {item.icon}
                  </span>
                  <span className="text-base font-black">{item.label}</span>
                  <span className="ml-auto text-[var(--gold)] transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-600">Recently verified</div>
              <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">{breweries.length} brewery locations and growing</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)]">View all →</Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {featuredBreweries.map((brewery) => (
              <Link key={brewery.slug} href={`/breweries?q=${encodeURIComponent(brewery.name)}`} className="rounded-xl border border-white/8 bg-[#131312] p-5 transition hover:border-white/20">
                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--gold)]">{brewery.neighborhood}</div>
                <div className="mt-2 text-xl font-black text-white">{brewery.name}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag">{brewery.food}</span>
                  {brewery.outdoor && <span className="tag">Patio</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#10100f]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-600">This fall</div>
              <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">Beer events worth knowing about</h2>
            </div>
            <Link href="/events" className="text-sm font-black text-[var(--gold)]">See all →</Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <a key={event.name} href={event.url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/8 bg-[#141413] p-5 transition hover:border-white/20">
                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--gold)]">{event.category}</div>
                <div className="mt-2 text-lg font-black text-white">{event.name}</div>
                <div className="mt-3 text-sm font-black text-zinc-300">{event.date}</div>
                <div className="mt-1 text-sm text-zinc-500">{event.location}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111110]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-sm font-bold text-white">Pittsburgh Brews is independently maintained.</div>
            <div className="mt-1 text-sm text-zinc-600">Details, background, and how the guide stays current live on the About page.</div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/about" className="text-white hover:text-[var(--gold)]">About →</Link>
            <Link href="/submit" className="text-zinc-400 hover:text-white">Submit an update →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
