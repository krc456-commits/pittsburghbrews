import Link from "next/link";
import EventExplorer from "@/components/EventExplorer";
import { getCurrentEvents } from "@/data/eventDetails";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const beerEvents = await getCurrentEvents();

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
          <EventExplorer events={beerEvents} />

          <div className="mt-7 rounded-2xl border border-black/10 bg-[#eee8d9] p-5 text-sm leading-6 text-[#625c50]">
            Pittsburgh Brews focuses on events that give people a reason to get out and enjoy the local beer scene — not just a static brewery list. <Link href="/submit" className="font-black text-[#8d6b00] hover:text-black">Send us an event or correction →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
