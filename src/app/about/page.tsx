import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <div className="eyebrow">About Pittsburgh Brews</div>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">A local brewery guide built to stay useful.</h1>
          <div className="mt-8 grid gap-8 text-zinc-400 md:grid-cols-2 md:text-lg md:leading-8">
            <div className="space-y-5">
              <p>Pittsburgh Brews started as a simple place to keep Pittsburgh-area brewery information together instead of forcing people to bounce between stale lists, social pages, and scattered links.</p>
              <p>The goal is still simple: help local beer drinkers find breweries, taprooms, patios, food, and useful details quickly.</p>
            </div>
            <div className="space-y-5">
              <p>The directory is independently maintained. There is no paid placement, and breweries are not ranked or pushed ahead of one another.</p>
              <p>Openings, closures, address changes, food changes, and other corrections can be submitted so the site stays current without turning into a constant content feed.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-[#131312] p-5"><div className="text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]">Local first</div><div className="mt-2 font-black text-white">Built for Pittsburgh beer drinkers.</div></div>
            <div className="rounded-xl border border-white/8 bg-[#131312] p-5"><div className="text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]">Independent</div><div className="mt-2 font-black text-white">No paid brewery placement.</div></div>
            <div className="rounded-xl border border-white/8 bg-[#131312] p-5"><div className="text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]">Current</div><div className="mt-2 font-black text-white">Community corrections welcome.</div></div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/breweries" className="rounded-md bg-[var(--gold)] px-6 py-3.5 font-black text-black">Browse breweries</Link>
            <Link href="/submit" className="rounded-md border border-white/15 px-6 py-3.5 font-black text-white">Submit an update</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
