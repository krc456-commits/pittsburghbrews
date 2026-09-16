import Link from "next/link";
import { breweries } from "@/data/breweries";

const skylineImage = "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Pittsburgh_skyline_from_North_Shore_near_PNC_Park_August_2025.jpeg/1280px-Pittsburgh_skyline_from_North_Shore_near_PNC_Park_August_2025.jpeg";
const breweryImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/East_End_Brewing_Company.jpg";

const featured = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);

const browseOptions = [
  { label: "Patios", detail: "Outdoor seating", href: "/breweries?feature=outdoor", mark: "OUT" },
  { label: "Food", detail: "Full kitchens", href: "/breweries?food=Full%20kitchen", mark: "EAT" },
  { label: "Dog friendly", detail: "Bring the pup", href: "/breweries?feature=dog", mark: "DOG" },
  { label: "City taprooms", detail: "Pittsburgh proper", href: "/breweries?area=Pittsburgh", mark: "PGH" },
];

export default function Home() {
  return (
    <main>
      <section className="overflow-hidden border-b border-white/8 bg-[#0b0b0a]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 md:py-18 lg:min-h-[680px] lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <div className="flex items-center gap-3"><img src="/brand/pittsburgh-brews-icon.svg" alt="" className="h-11 w-11 opacity-90" /><div className="eyebrow">Independent Pittsburgh brewery guide</div></div>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.94] tracking-[-0.055em] text-[#f5f3ec] sm:text-6xl lg:text-7xl">
              Find a brewery <span className="text-[var(--gold)]">worth the trip.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Taprooms, patios, food, neighborhood spots, and local beer — organized so you can spend less time searching and more time drinking Pittsburgh.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/breweries" className="rounded-md bg-[var(--gold)] px-6 py-3.5 font-black text-[#111] transition hover:-translate-y-0.5 hover:bg-[#ffd94d]">Explore Breweries</Link>
              <Link href="/submit" className="rounded-md border border-white/15 bg-white/5 px-6 py-3.5 font-black text-white transition hover:bg-white/10">Submit an Update</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600">
              <span>{breweries.length} verified starters</span>
              <span>Updated Sep 2026</span>
              <span>No paid placement</span>
            </div>
          </div>

          <div className="relative min-h-[470px] lg:min-h-[560px]">
            <div className="absolute inset-x-0 top-0 h-[72%] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50 lg:left-8">
              <img src={skylineImage} alt="Pittsburgh skyline from the North Shore" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-4 left-5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-bold text-zinc-200 backdrop-blur">Pittsburgh first. Beer second.</div>
            </div>
            <div className="absolute bottom-0 left-5 right-8 h-[42%] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60 sm:left-16 lg:left-0 lg:right-24">
              <img src={breweryImage} alt="Inside East End Brewing Company in Pittsburgh" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="text-xs font-black uppercase tracking-[.15em] text-[var(--gold)]">Real local beer culture</div>
                <div className="mt-1 text-lg font-black text-white">East End Brewing · Pittsburgh</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#10100f]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Browse like a beer person</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#f5f3ec] md:text-5xl">What kind of stop are you looking for?</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)] hover:text-white">See every brewery →</Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {browseOptions.map((item) => (
              <Link key={item.label} href={item.href} className="group rounded-xl border border-white/8 bg-[#151514] p-5 transition hover:-translate-y-0.5 hover:border-[var(--gold)]/50 hover:bg-[#191917]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-black text-white">{item.label}</div>
                    <div className="mt-1 text-sm text-zinc-500">{item.detail}</div>
                  </div>
                  <div className="rounded-md border border-[var(--gold)]/25 bg-[var(--gold)]/8 px-2 py-1 text-[10px] font-black tracking-[.12em] text-[var(--gold)]">{item.mark}</div>
                </div>
                <div className="mt-8 text-sm font-black text-zinc-600 transition group-hover:text-[var(--gold)]">Browse →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <div className="eyebrow">Good places to start</div>
              <h2 className="mt-3 text-4xl font-black tracking-[-.04em] text-[#f5f3ec] md:text-6xl">A few verified stops.</h2>
              <p className="mt-4 max-w-lg leading-7 text-zinc-500">No rankings, no sponsored placement — just useful details to help you pick your next stop.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((brewery) => (
                <article key={brewery.slug} className="rounded-xl border border-white/8 bg-[#131312] p-5">
                  <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">{brewery.neighborhood}</div>
                  <h3 className="mt-3 text-xl font-black text-white">{brewery.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{brewery.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2"><span className="tag">{brewery.food}</span>{brewery.outdoor && <span className="tag">Patio</span>}</div>
                  <Link href={`/breweries?area=${encodeURIComponent(brewery.area)}`} className="mt-5 inline-block text-sm font-black text-zinc-300 hover:text-[var(--gold)]">View in directory →</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#121211]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="eyebrow">Built to stay useful</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-white md:text-5xl">See something wrong? Tell us.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-zinc-500">Openings, closures, moved taprooms, food changes — corrections from brewery owners and local drinkers help keep the directory current.</p>
          </div>
          <Link href="/submit" className="inline-flex w-fit rounded-md bg-white px-6 py-3.5 font-black text-black transition hover:bg-[var(--gold)]">Submit an Update</Link>
        </div>
      </section>

      <div className="bg-[#0b0b0a] px-5 pb-5 text-center text-[10px] text-zinc-700 md:px-8">
        Hero skyline: Dough4872 / Wikimedia Commons, CC BY-SA 4.0 · East End Brewing photo: Drew from Zhrodague / CC BY 2.0 · <Link href="/credits" className="underline hover:text-zinc-400">image credits</Link>
      </div>
    </main>
  );
}
