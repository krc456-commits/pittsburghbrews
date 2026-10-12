import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-[#f5efe3] text-[#191815]">
      <section className="border-b border-black/10 bg-[#efe6d5]">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <div className="text-xs font-black uppercase tracking-[.16em] text-[#8d6b00]">About Pittsburgh Brews</div>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Find your next Pittsburgh brewery.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#625c50] md:text-lg">
            Pittsburgh Brews is my independent, personally maintained running list of breweries I find interesting around Pittsburgh, with a searchable directory to make visiting them easier. It is not affiliated with the Pittsburgh Brewers Guild or any brewery association.
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
                <p>Events are part of it too — festivals, Oktoberfests, brewery happenings, seasonal events, and other reasons to get out and try somewhere new.</p>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">What it is not</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">No homework required.</h2>
              <div className="mt-5 space-y-4 text-[#625c50] md:text-lg md:leading-8">
                <p>This is not a brewery passport, trail builder, ranking system, or a list you are supposed to complete.</p>
                <p>The goal is simpler: keep a useful, evolving list of places worth knowing about, along with the practical details that help you decide where to go.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-black/10 bg-white/60 p-6 md:p-8">
            <h2 className="text-2xl font-black">What counts as Pittsburgh here?</h2>
            <p className="mt-3 leading-7 text-[#625c50]">To me, Pittsburgh is more than the Allegheny County line. This list starts with the city and close-in communities, then follows the places people around Pittsburgh actually go for a brewery visit — including nearby towns across county lines. It is not intended to cover all of Western Pennsylvania, and there is no membership requirement or official boundary. It is simply my evolving Pittsburgh-area brewery list.</p>
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
            <Link href="/events" className="rounded-full bg-[#191815] px-6 py-3.5 font-black text-white transition hover:bg-[#8d6b00]">See beer events</Link>
            <Link href="/submit" className="rounded-full bg-[#191815] px-6 py-3.5 font-black text-white transition hover:bg-[#8d6b00]">Submit an update</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
