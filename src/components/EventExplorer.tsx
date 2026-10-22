"use client";

import { useMemo, useState } from "react";
import type { BeerEvent } from "@/data/events";
import Link from "next/link";
import { eventUrl, isRoutineEvent } from "@/data/eventDetails";
import EventActions from "@/components/EventActions";

type Period = "all" | "today" | "weekend" | "week" | "month";
type CalendarTab = "all" | "food" | "trivia" | "other";
const zones = ["All areas", "Pittsburgh", "North", "South", "East", "West", "Surrounding"] as const;

function dayKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const x = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return `${x.year}-${x.month}-${x.day}`;
}
function isoToDay(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
function eventRegion(location: string) {
  const l = location.toLowerCase();
  if (/downtown|strip district|lawrenceville|south side|north side|bloomfield|hazelwood|millvale|sharpsburg/.test(l)) return "Pittsburgh";
  if (/wexford|allison park|sevens? fields|cranberry|north hills|ross township|gibsonia/.test(l)) return "North";
  if (/finleyville|bethel park|mt lebanon|south hills|castle shannon/.test(l)) return "South";
  if (/homestead|monroeville|oakmont|braddock|aspinwall/.test(l)) return "East";
  if (/creighton|sewickley|coraopolis|imperial|robinson|carnegie/.test(l)) return "West";
  return "Surrounding";
}
function matchesPeriod(event: BeerEvent, period: Period, today: number): boolean {
  if (period === "all") return true;
  if (event.occurrences?.length) return event.occurrences.some(date => matchesPeriod({ ...event, occurrences: undefined, startDate: date, endDate: date }, period, today));
  if (period === "today") return isoToDay(event.startDate) <= today && isoToDay(event.endDate) >= today;
  const now = new Date(today);
  if (period === "weekend") {
    const weekDay = now.getUTCDay();
    const fridayOffset = weekDay === 6 ? -1 : weekDay === 0 ? -2 : (5 - weekDay + 7) % 7;
    const fri = today + fridayOffset * 86400000;
    const sun = fri + 2 * 86400000;
    return isoToDay(event.startDate) <= sun && isoToDay(event.endDate) >= fri;
  }
  const end = period === "week" ? today + 7 * 86400000 : Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0);
  return isoToDay(event.startDate) <= end && isoToDay(event.endDate) >= today;
}

export default function EventExplorer({ events }: { events: BeerEvent[] }) {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [category, setCategory] = useState("All types");
  const [area, setArea] = useState("All areas");
  const [calendarTab, setCalendarTab] = useState<CalendarTab>("all");
  const [showAllCalendar, setShowAllCalendar] = useState(false);
  const today = isoToDay(dayKey(new Date()));
  const categories = useMemo(() => ["All types", ...Array.from(new Set(events.map(event => event.category))).sort()], [events]);
  const filtered = useMemo(() => events.filter(event => {
    const term = query.trim().toLocaleLowerCase();
    return (!term || [event.name, event.location, event.description, event.category].some(text => text.toLocaleLowerCase().includes(term)))
      && (category === "All types" || event.category === category)
      && (area === "All areas" || eventRegion(event.location) === area)
      && matchesPeriod(event, period, today);
  }), [events, query, category, area, period, today]);
  const specialEvents = filtered.filter(event => !isRoutineEvent(event));
  const calendarEvents = filtered.filter(isRoutineEvent);
  const calendarGroups = [
    { id: "all" as const, label: "All happenings" },
    { id: "food" as const, label: "Food trucks" },
    { id: "trivia" as const, label: "Trivia & games" },
    { id: "other" as const, label: "Other weekly" },
  ];
  function calendarType(event: BeerEvent): Exclude<CalendarTab,"all"> {
    if (event.category === "Food trucks") return "food";
    if (event.category === "Trivia & games" || /\\btrivia\\b|\\bbingo\\b|\\bquiz\\b|\\bgame night\\b/i.test(event.name)) return "trivia";
    return "other";
  }
  const selectedCalendar = calendarEvents.filter(e => calendarTab === "all" || calendarType(e) === calendarTab)
    .sort((a,b) => a.startDate.localeCompare(b.startDate) || a.location.localeCompare(b.location) || a.name.localeCompare(b.name));
  const shownCalendar = showAllCalendar ? selectedCalendar : selectedCalendar.slice(0, 6);
  function calendarDay(date: string) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(date + "T12:00:00Z"));
  }

  function EventCard({ event }: { event: BeerEvent }) {
    return <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={eventUrl(event)} className="block">
        <div className="relative flex min-h-40 flex-col items-center justify-center gap-3 overflow-hidden bg-[#2a2924] p-6 text-center text-white">
          {event.image && <img src={event.image.url} alt={event.image.alt} className={`absolute inset-0 h-full w-full ${event.image.alt.startsWith("Official") ? "object-contain bg-[#282620]" : "object-cover"}`} loading="lazy" />}
          {event.image && !event.image.alt.startsWith("Official") && <div className="absolute inset-0 bg-black/60" />}
          {event.image?.alt.startsWith("Brewery venue photo:") && <div className="absolute bottom-2 right-2 z-20 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">Brewery photo · Not event flyer</div>}
          <div className={`relative z-10 flex flex-col items-center gap-3 ${event.image?.alt.startsWith("Official") ? "sr-only" : ""}`}><div className="rounded-full border border-[#edcf78]/50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#edcf78]">{event.category}</div><div className="text-xs font-black text-[#edcf78]">{event.date}</div></div>
        </div>
        <div className="px-5 pt-5"><h3 className="text-xl font-black leading-tight tracking-tight text-[#191815] hover:text-[#8d6b00]">{event.name}</h3><div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f4edda] px-3 py-2 text-sm font-black text-[#795b00]"><span aria-hidden="true">📅</span><span>Event date: {event.date}</span></div><div className="mt-2 text-sm font-bold text-[#625c50]">{event.location}</div><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#777064]">{event.description}</p><span className="mt-3 inline-block text-sm font-black text-[#8d6b00]">Explore event →</span></div>
      </Link>
      <div className="mt-auto px-5 pb-5 pt-4"><EventActions title={event.name} url={eventUrl(event)} calendarUrl={eventUrl(event) + "/calendar"}/></div>
    </article>;
  }

  return (
    <>
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">
            Search events
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Trivia, Oktoberfest, brewery..." className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-medium normal-case tracking-normal text-[#191815] outline-none focus:border-[#8d6b00]" />
          </label>
          <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">
            Event type
            <select value={category} onChange={e => setCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#191815]">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">
            Area
            <select value={area} onChange={e => setArea(e.target.value)} className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#191815]">
              {zones.map(z => <option key={z}>{z}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by date">
          {([["all", "Recent & upcoming"], ["today", "Today"], ["weekend", "This weekend"], ["week", "Next 7 days"], ["month", "This month"]] as const).map(([value, label]) => (
            <button key={value} type="button" onClick={() => setPeriod(value)} aria-pressed={period === value} className={`rounded-full border px-3.5 py-2 text-xs font-black transition ${period === value ? "border-[#8d6b00] bg-[#8d6b00] text-white" : "border-black/15 bg-[#f8f5ef] text-[#625c50] hover:border-[#8d6b00]"}`}>{label}</button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#625c50]">
          <span aria-live="polite"><strong className="text-[#191815]">{filtered.length}</strong> event{filtered.length === 1 ? "" : "s"} found</span>
          {(query || period !== "all" || category !== "All types" || area !== "All areas") && <button type="button" className="font-black text-[#8d6b00] hover:underline" onClick={() => { setQuery(""); setPeriod("all"); setCategory("All types"); setArea("All areas"); }}>Clear filters</button>}
        </div>
      </div>
      {specialEvents.length ? <><div className="mt-8"><div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">Featured & special events</div><h2 className="mt-1 text-2xl font-black">Events worth planning around</h2></div><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{specialEvents.map(event => <EventCard key={event.url + event.startDate + event.name} event={event} />)}</div></> : filtered.length ? null : <div className="mt-5 rounded-2xl border border-black/10 bg-white p-8 text-center"><h2 className="text-xl font-black">No events match those filters</h2><p className="mt-2 text-sm text-[#625c50]">Try a wider date range or another area.</p><a href="/submit" className="mt-4 inline-block font-black text-[#8d6b00] hover:underline">Suggest an event →</a></div>}

      {calendarEvents.length > 0 && (
        <section className="mt-10 border-t border-black/10 pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">Brewery calendars</div><h2 className="mt-1 text-2xl font-black">Food trucks, trivia & weekly happenings</h2></div>
            <p className="max-w-md text-sm leading-6 text-[#777064]">Find something happening at a brewery without scrolling through the entire calendar.</p>
          </div>
          <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Browse brewery calendar types">
              {calendarGroups.map(group => {
                const count = group.id === "all" ? calendarEvents.length : calendarEvents.filter(e => calendarType(e) === group.id).length;
                return <button type="button" key={group.id} aria-pressed={calendarTab === group.id} onClick={() => {setCalendarTab(group.id);setShowAllCalendar(false);}} className={`rounded-full border px-4 py-2 text-sm font-black transition ${calendarTab === group.id ? "border-[#8d6b00] bg-[#8d6b00] text-white" : "border-black/15 bg-[#f8f5ef] text-[#625c50] hover:border-[#8d6b00]"}`}>{group.label} <span className="ml-1 opacity-70">({count})</span></button>;
              })}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-b border-black/10 pb-3 text-sm text-[#625c50]">
              <span><strong className="text-[#191815]">{selectedCalendar.length}</strong> matching happenings · soonest first</span>
              <span className="text-xs">Showing {shownCalendar.length}</span>
            </div>
            {selectedCalendar.length === 0 ? <p className="py-8 text-center text-sm text-[#625c50]">No happenings in this category with the current filters.</p> :
              <div>
                {shownCalendar.map((event, index) => {
                  const newDay = index === 0 || shownCalendar[index-1].startDate !== event.startDate;
                  return <div key={event.url + event.startDate + event.name + event.location}>
                    {newDay && <div className="border-b border-black/10 bg-[#f6f1e7] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#795b00]">{calendarDay(event.startDate)}</div>}
                    <Link href={eventUrl(event)} className="grid gap-1 border-b border-black/10 px-3 py-3 transition hover:bg-[#f8f5ef] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
                      <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-[#191815]">{event.name}</h3><span className="rounded-full bg-[#f4edda] px-2 py-0.5 text-[10px] font-bold text-[#795b00]">{event.category}</span></div><p className="mt-1 text-sm text-[#777064]">{event.location}</p><p className="mt-1 text-xs font-semibold text-[#8d6b00]">{event.date}</p></div>
                      <span className="hidden text-sm font-black text-[#8d6b00] sm:inline">Details →</span>
                    </Link>
                  </div>;
                })}
              </div>
            }
            {selectedCalendar.length > 6 && <button type="button" onClick={() => setShowAllCalendar(v => !v)} className="mt-4 w-full rounded-xl border border-[#8d6b00]/30 bg-[#f8f5ef] px-4 py-3 text-sm font-black text-[#795b00] hover:bg-[#f4edda]">{showAllCalendar ? "Show fewer happenings ↑" : `Show all ${selectedCalendar.length} happenings ↓`}</button>}
          </div>
        </section>
      )}
    </>
  );
}
