import Link from "next/link";
import { breweries } from "@/data/breweries";

const areas = [
  ["Pittsburgh", "City neighborhoods, North Side, Strip District and more"],
  ["North", "Millvale, Bellevue and the northern suburbs"],
  ["South", "South Hills and communities south of the rivers"],
  ["East", "Sharpsburg, Blawnox, Homestead and the eastern corridor"],
  ["West", "West End, airport corridor and western communities"],
  ["Surrounding Counties", "Worth-the-drive breweries across Western PA"]
];

const featured = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);
const heroImage = "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Pittsburgh_skyline_from_North_Shore_near_PNC_Park_August_2025.jpeg/1280px-Pittsburgh_skyline_from_North_Shore_near_PNC_Park_August_2025.jpeg";

export default function Home() {
  return (
    <main>
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.97)_0%,rgba(8,8,8,.82)_45%,rgba(8,8,8,.38)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#0a0a0a_0%,transparent_45%)]" />

        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[var(--gold)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Independent Pittsburgh brewery guide
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-8xl lg:text-[6.8rem]">
              Find your next <span className="text-[var(--gold)]">Pittsburgh brewery.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Search a growing, independently maintained directory of breweries across Pittsburgh and Western Pennsylvania — without digging through stale lists and scattered links.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/breweries" className="bg-[var(--gold)] px-6 py-3.5 font-black text-black transition hover:-translate-y-0.5 hover:brightness-110">Explore Breweries</Link>
              <Link href="/submit" className="border border-white bg-white px-6 py-3.5 font-black text-black transition hover:bg-zinc-200">Submit an Update</Link>
            </div>
            <p className="mt-4 text-[11px] text-zinc-500">
              Hero photo: Dough4872 / Wikimedia Commons, CC BY-SA 4.0. <Link href="/credits" className="underline hover:text-zinc-300">Image credits</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[#0d0d0d]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[var(--border)] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
          <Stat number={`${breweries.length}`} label="Starter breweries verified" />
          <Stat number="6" label="Regional groupings" />
          <Stat number="Sep 2026" label="Directory last reviewed" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <div className="eyebrow">Explore by area</div>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.035em] md:text-6xl">Start with a part of town.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
            Pittsburgh's brewery scene spreads well beyond the city grid. Browse by region first, then narrow things down with search and food filters.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map(([area, description], index) => (
            <Link key={area} href={`/breweries?area=${encodeURIComponent(area)}`} className="area-card group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-600">0{index + 1}</div>
                  <div className="mt-8 text-2xl font-black tracking-tight">{area}</div>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">{description}</p>
                </div>
                <span className="text-xl text-[var(--gold)] transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Recently verified</div>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.035em] md:text-6xl">A few places to start.</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)] hover:text-white">Browse the directory →</Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((brewery) => (
              <article key={brewery.slug} className="border border-[var(--border)] bg-[#101010] p-6">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gold)]">{brewery.neighborhood} · {brewery.area}</div>
                <h3 className="mt-3 text-2xl font-black">{brewery.name}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">{brewery.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2"><span className="tag">{brewery.type}</span><span className="tag">{brewery.food}</span></div>
                <Link href={`/breweries?area=${encodeURIComponent(brewery.area)}`} className="mt-6 inline-block text-sm font-black text-zinc-200 hover:text-[var(--gold)]">Explore area →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[radial-gradient(circle_at_80%_20%,rgba(255,207,36,.16),transparent_28rem),#0a0a0a]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="max-w-2xl">
            <div className="eyebrow">Built to stay useful</div>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.035em] md:text-6xl">Know something changed?</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Openings, closures, moved taprooms, new kitchens — send the correction and help keep Pittsburgh Brews current without turning this into another weekly content grind.</p>
            <Link href="/submit" className="mt-7 inline-block bg-white px-6 py-3.5 font-black text-black hover:bg-[var(--gold)]">Submit an Update</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return <div className="py-7 sm:px-6 first:pl-0"><div className="text-2xl font-black text-[var(--gold)]">{number}</div><div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">{label}</div></div>;
}
