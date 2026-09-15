import Link from "next/link";

const areas = ["Pittsburgh", "North", "South", "East", "West", "Surrounding Counties"];

export default function Home() {
  return (
    <main>
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <div className="max-w-4xl">
            <div className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-[var(--gold)]">Independent brewery guide</div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl">Find your next brewery.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              Discover breweries across Pittsburgh and Western Pennsylvania without digging through outdated lists and scattered links.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/breweries" className="bg-[var(--gold)] px-6 py-3 font-bold text-black transition hover:brightness-110">Explore Breweries</Link>
              <Link href="/breweries#map" className="border border-zinc-700 px-6 py-3 font-bold transition hover:border-zinc-400">View Map</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--panel)]">
        <div className="mx-auto grid max-w-7xl divide-y divide-[var(--border)] px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
          {["Pittsburgh + region", "Independently maintained", "Built for quick discovery"].map((item) => (
            <div key={item} className="py-7 text-sm font-bold uppercase tracking-[0.12em] text-zinc-300 md:px-7 first:pl-0">{item}</div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Explore by area</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Pick a part of town.</h2>
          </div>
          <Link href="/breweries" className="hidden text-sm font-bold text-zinc-300 hover:text-white md:block">View all breweries →</Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link key={area} href={`/breweries?area=${encodeURIComponent(area)}`} className="group border border-[var(--border)] bg-[var(--panel)] p-6 transition hover:border-[var(--gold)]">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{area}</span>
                <span className="text-[var(--gold)] transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Help keep it current</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Opened, closed, or changed?</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">Send a quick correction and help keep the directory useful for everyone.</p>
            <Link href="/submit" className="mt-7 inline-block border border-zinc-600 px-6 py-3 font-bold hover:border-white">Submit an Update</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
