"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { areas, breweries } from "@/data/breweries";

const foodFilters = ["All food", "Full kitchen", "Food trucks", "Light food"] as const;

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function initials(name: string) {
  return name
    .replace(/\b(Brewing|Brewery|Company|Co\.|Craft|Beer)\b/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function BreweryDirectory() {
  const searchParams = useSearchParams();
  const requestedArea = searchParams.get("area");
  const initialArea = areas.includes(requestedArea as (typeof areas)[number])
    ? (requestedArea as (typeof areas)[number])
    : "All";

  const [query, setQuery] = useState("");
  const [area, setArea] = useState<(typeof areas)[number]>(initialArea);
  const [food, setFood] = useState<(typeof foodFilters)[number]>("All food");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return breweries
      .filter((brewery) => {
        const matchesQuery =
          !normalized ||
          [brewery.name, brewery.city, brewery.neighborhood, brewery.type]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        const matchesArea = area === "All" || brewery.area === area;
        const matchesFood = food === "All food" || brewery.food === food;
        return matchesQuery && matchesArea && matchesFood;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, area, food]);

  return (
    <div className="mt-12">
      <div className="sticky top-[73px] z-20 -mx-5 border-y border-[var(--border)] bg-[rgba(10,10,10,0.94)] px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search brewery, neighborhood, or city"
              className="w-full border border-[var(--border)] bg-[#111] py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
            />
          </div>
          <select
            value={area}
            onChange={(event) => setArea(event.target.value as (typeof areas)[number])}
            className="border border-[var(--border)] bg-[#111] px-4 py-3 text-sm font-semibold outline-none focus:border-[var(--gold)]"
          >
            {areas.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select
            value={food}
            onChange={(event) => setFood(event.target.value as (typeof foodFilters)[number])}
            className="border border-[var(--border)] bg-[#111] px-4 py-3 text-sm font-semibold outline-none focus:border-[var(--gold)]"
          >
            {foodFilters.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-400"><span className="font-bold text-white">{filtered.length}</span> breweries · default order A–Z</p>
        {(query || area !== "All" || food !== "All food") && (
          <button
            onClick={() => { setQuery(""); setArea("All"); setFood("All food"); }}
            className="text-sm font-bold text-[var(--gold)] hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((brewery) => (
          <article key={brewery.slug} className="group overflow-hidden border border-[var(--border)] bg-[var(--panel)] transition hover:-translate-y-1 hover:border-zinc-600">
            <div className="relative h-44 overflow-hidden border-b border-[var(--border)] bg-[#161616]">
              {brewery.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${brewery.image.url}')` }}
                  role="img"
                  aria-label={brewery.image.alt}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_70%_20%,rgba(255,207,36,.18),transparent_35%),#151515]">
                  <div className="text-5xl font-black tracking-[-0.08em] text-zinc-700">{initials(brewery.name)}</div>
                  <div className="absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">Rights-cleared photo pending</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/65 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--gold)] backdrop-blur">
                {brewery.area}
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-300">{brewery.neighborhood}</div>
                <h2 className="mt-1 text-2xl font-black tracking-tight">{brewery.name}</h2>
              </div>
            </div>

            <div className="p-5">
              <p className="min-h-16 text-sm leading-6 text-zinc-400">{brewery.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="tag">{brewery.type}</span>
                <span className="tag">{brewery.food}</span>
                {brewery.outdoor && <span className="tag">Outdoor seating</span>}
                {brewery.dogFriendly && <span className="tag">Dog friendly</span>}
              </div>
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-sm leading-6 text-zinc-300">{brewery.address}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
                  <a href={brewery.website} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">Website ↗</a>
                  <a href={directionsUrl(brewery.address)} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white">Directions ↗</a>
                  {brewery.image && <a href={brewery.image.sourceUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white">Photo source ↗</a>}
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-600">Verified {brewery.lastVerified}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 border border-dashed border-zinc-700 p-10 text-center">
          <div className="text-xl font-black">No breweries match those filters.</div>
          <p className="mt-2 text-zinc-400">Try another neighborhood, area, or food option.</p>
        </div>
      )}
    </div>
  );
}
