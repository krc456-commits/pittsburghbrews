import Link from "next/link";
import HomeFinder from "@/components/HomeFinder";
import { breweries } from "@/data/breweries";

const quickLinks = [
  ["Patios", "/breweries?feature=outdoor"],
  ["Food", "/breweries?food=Full%20kitchen"],
  ["Dog friendly", "/breweries?feature=dog"],
  ["Pittsburgh", "/breweries?area=Pittsburgh"],
  ["North", "/breweries?area=North"],
  ["East", "/breweries?area=East"],
] as const;

const featured = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 4);

export default function Home() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Pittsburgh brewery finder</div>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">Find a brewery.</h1>
            </div>
            <div className="text-sm font-bold text-zinc-500">{breweries.length} verified · Updated Sep 2026</div>
          </div>

          <div className="mt-7">
            <HomeFinder />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map(([label, href]) => (
              <Link key={label} href={href} className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-sm font-black text-zinc-300 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">{label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#10100f]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white md:text-3xl">Recently verified</h2>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)]">View all →</Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((brewery) => (
              <Link key={brewery.slug} href={`/breweries?q=${encodeURIComponent(brewery.name)}`} className="group rounded-xl border border-white/8 bg-[#151514] p-5 transition hover:border-white/20 hover:bg-[#191917]">
                <div className="text-[11px] font-black uppercase tracking-[.12em] text-[var(--gold)]">{brewery.neighborhood}</div>
                <div className="mt-2 text-lg font-black text-white">{brewery.name}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag">{brewery.food}</span>
                  {brewery.outdoor && <span className="tag">Patio</span>}
                </div>
                <div className="mt-5 text-sm font-black text-zinc-600 group-hover:text-[var(--gold)]">Open →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:grid-cols-3 md:px-8 md:py-16">
          <Link href="/breweries" className="rounded-xl border border-white/8 bg-[#131312] p-5 transition hover:border-white/20">
            <div className="text-xs font-black uppercase tracking-[.12em] text-zinc-600">Directory</div>
            <div className="mt-2 text-xl font-black text-white">Browse all breweries</div>
          </Link>
          <Link href="/events" className="rounded-xl border border-white/8 bg-[#131312] p-5 transition hover:border-white/20">
            <div className="text-xs font-black uppercase tracking-[.12em] text-zinc-600">Events</div>
            <div className="mt-2 text-xl font-black text-white">Beer events & festivals</div>
          </Link>
          <Link href="/submit" className="rounded-xl border border-white/8 bg-[#131312] p-5 transition hover:border-white/20">
            <div className="text-xs font-black uppercase tracking-[.12em] text-zinc-600">Keep it current</div>
            <div className="mt-2 text-xl font-black text-white">Submit an update</div>
          </Link>
        </div>
      </section>

      <section className="bg-[#111110]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="text-sm text-zinc-500">Want the story behind Pittsburgh Brews?</div>
          <Link href="/about" className="text-sm font-black text-white hover:text-[var(--gold)]">Read about the guide →</Link>
        </div>
      </section>
    </main>
  );
}
