import Link from "next/link";
import { beerEvents } from "@/data/events";

export default function EventsPage() {
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

      <section>
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/55">
            {beerEvents.map((event, index) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className={`group grid gap-3 px-5 py-5 transition hover:bg-white md:grid-cols-[190px_1fr_auto] md:items-center md:gap-6 ${index !== beerEvents.length - 1 ? "border-b border-black/10" : ""}`}
              >
                <div>
                  <div className="text-xs font-black uppercase tracking-[.1em] text-[#8d6b00]">{event.date}</div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-[.12em] text-[#9a9386]">{event.category}</div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black group-hover:text-[#8d6b00]">{event.name}</h2>
                    {event.featured && (
                      <span className="rounded-full border border-black/10 bg-[#f2ead8] px-2 py-1 text-[9px] font-black uppercase tracking-[.08em] text-[#8d6b00]">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm font-bold text-[#625c50]">{event.location}</div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#777064]">{event.description}</p>
                </div>

                <div className="hidden text-lg text-[#aaa294] transition group-hover:translate-x-0.5 group-hover:text-[#8d6b00] md:block">→</div>
              </a>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-black/10 bg-[#eee8d9] p-5 text-sm leading-6 text-[#625c50]">
            Pittsburgh Brews focuses on events that give people a reason to get out and enjoy the local beer scene — not just a static brewery list. <Link href="/submit" className="font-black text-[#8d6b00] hover:text-black">Send us an event or correction →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
