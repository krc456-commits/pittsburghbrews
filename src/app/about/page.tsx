import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-[#f5efe3] text-[#191815]">
      <section className="border-b border-black/10 bg-[#efe6d5]">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <div className="text-xs font-black uppercase tracking-[.16em] text-[#8d6b00]">About Pittsburgh Brews</div>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Less planning. More enjoying Pittsburgh beer.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#625c50] md:text-lg">
            Pittsburgh Brews is an independent guide built to help locals and visitors find breweries, see what’s happening, and decide where to go next without digging through scattered sites and social feeds.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">What makes it useful</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">Built around decisions, not checklists.</h2>
              <div className="mt-5 space-y-4 text-[#625c50] md:text-lg md:leading-8">
                <p>Search breweries quickly, browse by area, check hours, food, patios, dog-friendly spots, directions, and useful links in one place.</p>
                <p>Events are a major part of the guide too — festivals, Oktoberfests, brewery happenings, seasonal events, and other reasons to get out and try somewhere new.</p>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">What it is not</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">No homework required.</h2>
              <div className="mt-5 space-y-4 text-[#625c50] md:text-lg md:leading-8">
                <p>This is not a brewery passport, trail builder, ranking system, or a list you are supposed to complete.</p>
                <p>The goal is simpler: make it easier to enjoy Pittsburgh beer at your own pace and give you a reason to come back when you want a new place or a new event.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 border-y border-black/10 py-8 sm:grid-cols-3">
            <div>
              <div className="text-xs font-black uppercase tracking-[.12em] text-[#8d6b00]">Independent</div>
              <div className="mt-2 font-black">No paid brewery placement.</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[.12em] text-[#8d6b00]">Local</div>
              <div className="mt-2 font-black">Built specifically for Pittsburgh beer drinkers.</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[.12em] text-[#8d6b00]">Practical</div>
              <div className="mt-2 font-black">Useful details first, fluff second.</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/breweries" className="rounded-full bg-[#191815] px-6 py-3.5 font-black text-white transition hover:bg-[#8d6b00]">Find a brewery</Link>
            <Link href="/events" className="rounded-full border border-black/15 bg-white/50 px-6 py-3.5 font-black transition hover:border-[#8d6b00] hover:text-[#8d6b00]">See beer events</Link>
            <Link href="/submit" className="rounded-full border border-black/15 px-6 py-3.5 font-black text-[#625c50] hover:text-black">Submit an update</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
