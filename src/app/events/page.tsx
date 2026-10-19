import Link from "next/link";
import EventExplorer from "@/components/EventExplorer";
import { eventUrl, getCurrentEvents, getWeeklyFeaturedEvent } from "@/data/eventDetails";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const beerEvents = await getCurrentEvents();
  const weeklyFeature = getWeeklyFeaturedEvent(beerEvents);

  return (
    <main className="bg-[#f6f1e7] text-[#191815]">
      <section className="border-b border-black/10 bg-[#efe6d5]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[.16em] text-[#8d6b00]">Pittsburgh beer events</div>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] md:text-6xl">What’s happening next</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#625c50]">
                Festivals, Oktoberfests, brewery happenings, seasonal pop-ups, and other beer-focused events worth knowing about.
              </p>
            </div>
            <Link href="/submit" className="text-sm font-black text-[#8d6b00] hover:text-black">Know one we missed? →</Link>
          </div>
        </div>
      </section>

      {weeklyFeature && (
        <section className="border-b border-white/10 bg-[#1d1c18] text-white">
          <div className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[.14em] text-[var(--gold)]">Weekly event feature</div>
                <h2 className="mt-1 text-2xl font-black md:text-3xl">Put this one on your radar</h2>
              </div>
              <span className="hidden text-xs font-bold text-zinc-500 sm:block">Chosen by Pittsburgh Brews</span>
            </div>
            <Link href={eventUrl(weeklyFeature)} className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#27251f] transition hover:border-[var(--gold)]/40 md:grid-cols-[1.05fr_.95fr]">
              <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-[#22211d] md:min-h-72">
                {weeklyFeature.image ? <img src={weeklyFeature.image.url} alt={weeklyFeature.image.alt} className={`h-full w-full ${weeklyFeature.image.alt.startsWith("Official") ? "object-contain" : "object-cover"}`} /> : <div className="text-center"><div className="text-6xl text-[var(--gold)]">✦</div><div className="mt-2 text-xs font-black uppercase tracking-[.16em] text-zinc-400">Pittsburgh beer event</div></div>}
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]">{weeklyFeature.category}</div>
                <h3 className="mt-2 text-3xl font-black tracking-[-.03em]">{weeklyFeature.name}</h3>
                <p className="mt-3 text-sm font-bold text-zinc-300">{weeklyFeature.date}</p>
                <p className="mt-1 text-sm text-zinc-400">{weeklyFeature.location}</p>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-300">{weeklyFeature.description}</p>
                <div className="mt-6 text-sm font-black text-[var(--gold)]">See event details →</div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <EventExplorer events={beerEvents} />

          <div className="mt-7 rounded-2xl border border-black/10 bg-[#eee8d9] p-5 text-sm leading-6 text-[#625c50]">
            Pittsburgh Brews focuses on events that give people a reason to get out and enjoy the local beer scene — not just a static brewery list. <Link href="/submit" className="font-black text-[#8d6b00] hover:text-black">Send us an event or correction →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
