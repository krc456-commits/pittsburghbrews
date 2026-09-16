import Link from "next/link";
import { breweries } from "@/data/breweries";

const breweryImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/East_End_Brewing_Company.jpg";
const featured = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);

const browseOptions = [
  { label: "Patios", detail: "Outdoor seating", href: "/breweries?feature=outdoor" },
  { label: "Food", detail: "Full kitchens", href: "/breweries?food=Full%20kitchen" },
  { label: "Dog friendly", detail: "Bring the pup", href: "/breweries?feature=dog" },
  { label: "Pittsburgh", detail: "City neighborhoods", href: "/breweries?area=Pittsburgh" },
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-white/8 bg-[#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-4xl">
            <div className="eyebrow">Independent Pittsburgh brewery guide</div>
            <h1 className="mt-4 text-5xl font-black leading-[.94] tracking-[-0.055em] text-[#f5f3ec] sm:text-6xl lg:text-7xl">
              Find your next <span className="text-[var(--gold)]">Pittsburgh brewery.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              Built for local beer drinkers first. Discover neighborhood taprooms, check food and patio options, or find somewhere new across Pittsburgh and Western Pennsylvania.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/breweries" className="rounded-md bg-[var(--gold)] px-6 py-3.5 font-black text-[#111] transition hover:bg-[#ffd94d]">Explore Breweries</Link>
              <Link href="/submit" className="rounded-md border border-white/15 bg-white/5 px-6 py-3.5 font-black text-white transition hover:bg-white/10">Submit an Update</Link>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-[#151514]">
            <div className="grid md:grid-cols-[1.2fr_.8fr] md:items-stretch">
              <div className="min-h-[260px] sm:min-h-[340px]">
                <img src={breweryImage} alt="East End Brewing Company in Pittsburgh" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="eyebrow">Local beer culture</div>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Know the scene. Find the next spot.</h2>
                <p className="mt-4 leading-7 text-zinc-500">Pittsburgh Brews is meant to be useful on a random Tuesday just as much as on a brewery crawl — current info, simple filters, and no paid placement.</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600">
                  <span>{breweries.length} verified starters</span>
                  <span>Updated Sep 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#10100f]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Browse the way you actually choose a brewery</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#f5f3ec] md:text-5xl">Start with what matters today.</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)] hover:text-white">See every brewery →</Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {browseOptions.map((item) => (
              <Link key={item.label} href={item.href} className="group rounded-lg border border-white/8 bg-[#151514] p-5 transition hover:border-white/20 hover:bg-[#191917]">
                <div className="text-xl font-black text-white">{item.label}</div>
                <div className="mt-1 text-sm text-zinc-500">{item.detail}</div>
                <div className="mt-7 text-sm font-black text-[var(--gold)]">Browse →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-22">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Recently verified</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#f5f3ec] md:text-5xl">A few places to start.</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)] hover:text-white">Browse the directory →</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((brewery) => (
              <article key={brewery.slug} className="rounded-lg border border-white/8 bg-[#131312] p-5">
                <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">{brewery.neighborhood}</div>
                <h3 className="mt-3 text-xl font-black text-white">{brewery.name}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{brewery.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2"><span className="tag">{brewery.food}</span>{brewery.outdoor && <span className="tag">Patio</span>}</div>
                <Link href={`/breweries?area=${encodeURIComponent(brewery.area)}`} className="mt-5 inline-block text-sm font-black text-zinc-300 hover:text-[var(--gold)]">View in directory →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121211]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-18 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="eyebrow">Help keep it current</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-white md:text-4xl">See something wrong? Tell us.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-zinc-500">Openings, closures, moved taprooms, food changes — corrections from brewery owners and local drinkers help keep the directory useful.</p>
          </div>
          <Link href="/submit" className="inline-flex w-fit rounded-md bg-white px-6 py-3.5 font-black text-black transition hover:bg-[var(--gold)]">Submit an Update</Link>
        </div>
      </section>

      <div className="bg-[#0b0b0a] px-5 pb-5 text-center text-[10px] text-zinc-700 md:px-8">
        East End Brewing photo: Drew from Zhrodague / CC BY 2.0 · <Link href="/credits" className="underline hover:text-zinc-400">image credits</Link>
      </div>
    </main>
  );
}
