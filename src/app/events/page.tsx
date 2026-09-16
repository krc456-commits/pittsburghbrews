import { beerEvents } from "@/data/events";

export default function EventsPage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Beer events</div>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-white md:text-6xl">What&apos;s happening now</h1>
            </div>
            <div className="text-sm font-bold text-zinc-500">Fall 2026 · Pittsburgh area</div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {beerEvents.map((event) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/8 bg-[#141413] p-5 transition hover:border-[var(--gold)]/40 hover:bg-[#181817]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--gold)]">{event.category}</div>
                  {event.featured && <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-zinc-500">Featured</span>}
                </div>
                <h2 className="mt-3 text-xl font-black text-white">{event.name}</h2>
                <div className="mt-3 text-sm font-black text-zinc-300">{event.date}</div>
                <div className="mt-1 text-sm text-zinc-500">{event.location}</div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{event.description}</p>
                <div className="mt-5 text-sm font-black text-[var(--gold)]">Event details ↗</div>
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/8 bg-[#111110] p-5 text-sm text-zinc-500">
            Know about a beer fest, brewery pop-up, Oktoberfest, or Halloween event we missed? <a href="/submit" className="font-black text-white hover:text-[var(--gold)]">Send it in →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
