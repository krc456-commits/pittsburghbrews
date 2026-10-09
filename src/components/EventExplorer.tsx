"use client";

import { useMemo, useState } from "react";
import type { BeerEvent } from "@/data/events";

type Period = "all" | "today" | "weekend" | "week" | "month";
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
  const today = isoToDay(dayKey(new Date()));
  const categories = useMemo(() => ["All types", ...Array.from(new Set(events.map(event => event.category))).sort()], [events]);
  const filtered = useMemo(() => events.filter(event => {
    const term = query.trim().toLocaleLowerCase();
    return (!term || [event.name, event.location, event.description, event.category].some(text => text.toLocaleLowerCase().includes(term)))
      && (category === "All types" || event.category === category)
      && (area === "All areas" || eventRegion(event.location) === area)
      && matchesPeriod(event, period, today);
  }), [events, query, category, area, period, today]);

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
          {([["all", "All upcoming"], ["today", "Today"], ["weekend", "This weekend"], ["week", "Next 7 days"], ["month", "This month"]] as const).map(([value, label]) => (
            <button key={value} type="button" onClick={() => setPeriod(value)} aria-pressed={period === value} className={`rounded-full border px-3.5 py-2 text-xs font-black transition ${period === value ? "border-[#8d6b00] bg-[#8d6b00] text-white" : "border-black/15 bg-[#f8f5ef] text-[#625c50] hover:border-[#8d6b00]"}`}>{label}</button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#625c50]">
          <span aria-live="polite"><strong className="text-[#191815]">{filtered.length}</strong> event{filtered.length === 1 ? "" : "s"} found</span>
          {(query || period !== "all" || category !== "All types" || area !== "All areas") && <button type="button" className="font-black text-[#8d6b00] hover:underline" onClick={() => { setQuery(""); setPeriod("all"); setCategory("All types"); setArea("All areas"); }}>Clear filters</button>}
        </div>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/60">
        {filtered.length ? filtered.map((event, index) => (
          <a key={event.url + event.startDate + event.name} href={event.url} target="_blank" rel="noopener noreferrer" className={`group grid gap-3 px-5 py-5 transition hover:bg-white md:grid-cols-[190px_1fr_auto] md:items-center md:gap-6 ${index !== filtered.length - 1 ? "border-b border-black/10" : ""}`}>
            <div>
              <div className="text-xs font-black uppercase tracking-[.08em] text-[#8d6b00]">{event.date}</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[.1em] text-[#9a9386]">{event.category}</div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-black group-hover:text-[#8d6b00]">{event.name}</h2>{event.featured && <span className="rounded-full bg-[#f2ead8] px-2 py-1 text-[9px] font-black uppercase text-[#8d6b00]">Featured</span>}</div>
              <div className="mt-1 text-sm font-bold text-[#625c50]">{event.location}</div>
              <p className="mt-2 text-sm leading-6 text-[#777064]">{event.description}</p>
              <span className="mt-2 inline-block text-xs font-black text-[#8d6b00]">Event details ↗</span>
            </div>
            <span aria-hidden="true" className="hidden text-lg text-[#aaa294] md:block">→</span>
          </a>
        )) : <div className="p-8 text-center"><h2 className="text-xl font-black">No events match those filters</h2><p className="mt-2 text-sm text-[#625c50]">Try a wider date range or another area. Know of an event that should be here?</p><a href="/submit" className="mt-4 inline-block font-black text-[#8d6b00] hover:underline">Suggest an event →</a></div>}
      </div>
    </>
  );
}
