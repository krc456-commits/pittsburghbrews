"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { areas, breweries } from "@/data/allBreweries";

const foodFilters = ["All food", "Full kitchen", "Food trucks", "Light food"] as const;
const featureFilters = ["All features", "Outdoor seating", "Dog friendly"] as const;

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function siteIconUrl(website: string) {
  try {
    return `${new URL(website).origin}/favicon.ico`;
  } catch {
    return "";
  }
}

function BreweryMark({ website, name }: { website: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const icon = siteIconUrl(website);
  if (!icon || failed) return null;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[.04] p-2">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="max-h-7 max-w-7 object-contain"
        onError={() => setFailed(true)}
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default function BreweryDirectory() {
  const searchParams = useSearchParams();
  const requestedQuery = searchParams.get("q") ?? "";
  const requestedArea = searchParams.get("area");
  const requestedFood = searchParams.get("food");
  const requestedFeature = searchParams.get("feature");

  const initialArea = areas.includes(requestedArea as (typeof areas)[number]) ? (requestedArea as (typeof areas)[number]) : "All";
  const initialFood = foodFilters.includes(requestedFood as (typeof foodFilters)[number]) ? (requestedFood as (typeof foodFilters)[number]) : "All food";
  const initialFeature = requestedFeature === "outdoor" ? "Outdoor seating" : requestedFeature === "dog" ? "Dog friendly" : "All features";

  const [query, setQuery] = useState(requestedQuery);
  const [area, setArea] = useState<(typeof areas)[number]>(initialArea);
  const [food, setFood] = useState<(typeof foodFilters)[number]>(initialFood);
  const [feature, setFeature] = useState<(typeof featureFilters)[number]>(initialFeature);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return breweries.filter((brewery) => {
      const matchesQuery = !normalized || [brewery.name, brewery.city, brewery.neighborhood, brewery.type].join(" ").toLowerCase().includes(normalized);
      const matchesArea = area === "All" || brewery.area === area;
      const matchesFood = food === "All food" || brewery.food === food;
      const matchesFeature = feature === "All features" || (feature === "Outdoor seating" && brewery.outdoor) || (feature === "Dog friendly" && brewery.dogFriendly);
      return matchesQuery && matchesArea && matchesFood && matchesFeature;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, area, food, feature]);

  const hasActiveFilters = Boolean(query || area !== "All" || food !== "All food" || feature !== "All features");
  const activeFilterCount = [Boolean(query), area !== "All", food !== "All food", feature !== "All features"].filter(Boolean).length;
  const reset = () => { setQuery(""); setArea("All"); setFood("All food"); setFeature("All features"); };

  return (
    <div className="mt-6">
      <div className="sticky top-[72px] z-20 -mx-5 border-y border-white/8 bg-[#0b0b0a]/95 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} className="flex w-full items-center justify-between rounded-md border border-white/10 bg-[#141413] px-4 py-3 text-left text-sm font-black text-white">
            <span>{filtersOpen ? "Hide search & filters" : "Search & filters"}</span>
            <span className="flex items-center gap-2 text-zinc-500">
              {activeFilterCount > 0 && <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-black text-black">{activeFilterCount}</span>}
              <span aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
            </span>
          </button>

          {filtersOpen && (
            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search brewery, neighborhood, or city" className="w-full rounded-md border border-white/10 bg-[#141413] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[var(--gold)]" />
              <select value={area} onChange={(e) => setArea(e.target.value as (typeof areas)[number])} className="rounded-md border border-white/10 bg-[#141413] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--gold)]">{areas.map((item) => <option key={item}>{item}</option>)}</select>
              <select value={food} onChange={(e) => setFood(e.target.value as (typeof foodFilters)[number])} className="rounded-md border border-white/10 bg-[#141413] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--gold)]">{foodFilters.map((item) => <option key={item}>{item}</option>)}</select>
              <select value={feature} onChange={(e) => setFeature(e.target.value as (typeof featureFilters)[number])} className="rounded-md border border-white/10 bg-[#141413] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--gold)]">{featureFilters.map((item) => <option key={item}>{item}</option>)}</select>
              <div className="flex items-center justify-between pt-1 lg:col-span-4">
                <span className="text-xs text-zinc-600">{filtered.length} matching breweries</span>
                {hasActiveFilters && <button type="button" onClick={reset} className="text-xs font-black text-[var(--gold)]">Clear filters</button>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-500"><span className="font-black text-white">{filtered.length}</span> breweries · A–Z</p>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((brewery) => (
          <article key={brewery.slug} className="group overflow-hidden rounded-xl border border-white/8 bg-[#131312] transition hover:-translate-y-0.5 hover:border-white/20">
            {brewery.image && (
              <div className="h-52 overflow-hidden bg-[#191918]">
                <img src={brewery.image.url} alt={brewery.image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black uppercase tracking-[.12em] text-zinc-500">{brewery.neighborhood}</div>
                  <div className="mt-2 flex items-start gap-3">
                    {!brewery.image && <BreweryMark website={brewery.website} name={brewery.name} />}
                    <h2 className="min-w-0 flex-1 text-2xl font-black leading-tight text-white">{brewery.name}</h2>
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-[#0d0d0c] px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] text-[var(--gold)]">{brewery.area}</div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2"><span className="tag">{brewery.type}</span><span className="tag">{brewery.food}</span>{brewery.outdoor && <span className="tag">Patio</span>}{brewery.dogFriendly && <span className="tag">Dog friendly</span>}</div>
              <div className="mt-5 border-t border-white/8 pt-4">
                <p className="text-sm leading-6 text-zinc-300">{brewery.address}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-black"><a href={brewery.website} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">Website ↗</a><a href={directionsUrl(brewery.address)} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">Directions ↗</a></div>
                <div className="mt-4 text-[10px] font-black uppercase tracking-[.12em] text-zinc-700">Verified {brewery.lastVerified}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && <div className="mt-6 rounded-xl border border-dashed border-zinc-700 p-10 text-center"><div className="text-xl font-black">No breweries match those filters.</div><p className="mt-2 text-zinc-500">Try another area or clear the filters.</p></div>}
    </div>
  );
}
