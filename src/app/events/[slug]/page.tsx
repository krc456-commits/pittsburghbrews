import Link from "next/link";
import { notFound } from "next/navigation";
import { findEvent, getCurrentEvents, eventUrl } from "@/data/eventDetails";
import EventActions from "@/components/EventActions";

export const dynamic = "force-dynamic";
export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = findEvent(await getCurrentEvents(), slug);
  if (!event) notFound();
  const calendarUrl = eventUrl(event) + "/calendar";
  return <main className="min-h-[65vh] bg-[#f6f1e7] text-[#191815]">
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/events" className="text-sm font-black text-[#8d6b00] hover:underline">← All events</Link>
      <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="relative flex min-h-48 flex-col items-center justify-center gap-3 overflow-hidden bg-[#29271f] px-5 py-10 text-center text-white">
          {event.image && <img src={event.image.url} alt={event.image.alt} className="absolute inset-0 h-full w-full object-cover" />}
          {event.image && <div className="absolute inset-0 bg-black/60" />}
          <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#edcf78]">{event.category}</span>
          <div className="text-5xl" aria-hidden="true">✦</div>
          <div className="max-w-lg text-lg font-bold">{event.date}</div>
          </div>
        </div>
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">{event.name}</h1>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
            <div className="rounded-xl bg-[#f6f1e7] p-4"><div className="text-xs font-black uppercase text-[#8d6b00]">When</div><div className="mt-1 font-bold">{event.date}</div></div>
            <div className="rounded-xl bg-[#f6f1e7] p-4"><div className="text-xs font-black uppercase text-[#8d6b00]">Where</div><div className="mt-1 font-bold">{event.location}</div></div>
          </div>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#625c50]">{event.description}</p>
          <div className="mt-7"><EventActions title={event.name} url={eventUrl(event)} calendarUrl={calendarUrl}/></div>
          <div className="mt-6 border-t border-black/10 pt-5 text-sm text-[#625c50]">Event details can change. Confirm times and updates with the organizer before you go. <a href={event.url} target="_blank" rel="noopener noreferrer" className="font-black text-[#8d6b00] hover:underline">Official event source ↗</a></div>
        </div>
      </div>
    </div>
  </main>;
}
