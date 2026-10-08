"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { areas, breweries } from "@/data/allBreweries";
import { breweryHours } from "@/data/breweryHours";
import { getBreweryProfileRoute } from "@/data/breweryProfiles";
import { breweryCoordinates } from "@/data/breweryCoordinates";

const foodFilters = ["All food", "Full kitchen", "Food trucks", "Light food"] as const;
const featureFilters = ["All features", "Outdoor seating", "Dog friendly"] as const;

type UserLocation = { lat: number; lng: number };
type SortMode = "alpha" | "distance";

function distanceMiles(from: UserLocation, to: UserLocation) {
  const earthRadiusMiles = 3958.8;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(a));
}

function formatDistance(miles: number) {
  return miles < 10 ? `${miles.toFixed(1)} mi away` : `${Math.round(miles)} mi away`;
}

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

function BreweryMark({ website, name, logo }: { website: string; name: string; logo?: { url: string; alt: string } }) {
  const [failed, setFailed] = useState(false);
  const icon = logo?.url || siteIconUrl(website);
  if (!icon || failed) return null;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden">
      <img
        src={icon}
        alt={logo?.alt || ""}
        aria-hidden={logo ? undefined : "true"}
        className="h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
      {!logo && <span className="sr-only">{name}</span>}
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
  const requestedNearby = searchParams.get("near") === "1";
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "locating" | "ready" | "error">("idle");
  const [locationMessage, setLocationMessage] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>(requestedNearby ? "distance" : "alpha");

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationMessage("Location is not available in this browser.");
      return;
    }

    setLocationStatus("locating");
    setLocationMessage("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(nextLocation);
        setSortMode("distance");
        setLocationStatus("ready");
        sessionStorage.setItem("pittsburgh-brews-location", JSON.stringify(nextLocation));
      },
      () => {
        setLocationStatus("error");
        setLocationMessage("We couldn't access your location. You can still browse the full brewery list.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("pittsburgh-brews-location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserLocation;
        if (Number.isFinite(parsed.lat) && Number.isFinite(parsed.lng)) {
          setUserLocation(parsed);
          setLocationStatus("ready");
          if (requestedNearby) setSortMode("distance");
          return;
        }
      } catch {
        sessionStorage.removeItem("pittsburgh-brews-location");
      }
    }

    if (requestedNearby) requestLocation();
  }, [requestedNearby]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return breweries
      .filter((brewery) => {
        const matchesQuery = !normalized || [brewery.name, brewery.city, brewery.neighborhood, brewery.type].join(" ").toLowerCase().includes(normalized);
        const matchesArea = area === "All" || brewery.area === area;
        const matchesFood = food === "All food" || brewery.food === food;
        const matchesFeature = feature === "All features" || (feature === "Outdoor seating" && brewery.outdoor) || (feature === "Dog friendly" && brewery.dogFriendly);
        return matchesQuery && matchesArea && matchesFood && matchesFeature;
      })
      .map((brewery) => {
        const coordinates = breweryCoordinates[brewery.slug];
        const distance = userLocation && coordinates ? distanceMiles(userLocation, coordinates) : null;
        return { ...brewery, distanceMiles: distance };
      })
      .sort((a, b) => {
        if (sortMode === "distance" && a.distanceMiles !== null && b.distanceMiles !== null) return a.distanceMiles - b.distanceMiles;
        return a.name.localeCompare(b.name);
      });
  }, [query, area, food, feature, userLocation, sortMode]);

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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          <span className="font-black text-white">{filtered.length}</span> breweries · {userLocation && sortMode === "distance" ? "nearest first" : "A–Z"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={requestLocation}
            disabled={locationStatus === "locating"}
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-xs font-black text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black disabled:cursor-wait disabled:opacity-60"
          >
            {locationStatus === "locating" ? "Finding your location…" : userLocation ? "Update my location" : "Find Breweries Near Me"}
          </button>
          {userLocation && (
            <button
              type="button"
              onClick={() => setSortMode((current) => current === "distance" ? "alpha" : "distance")}
              className="rounded-full border border-white/10 bg-[#141413] px-4 py-2 text-xs font-black text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              {sortMode === "distance" ? "Sort A–Z" : "Sort by distance"}
            </button>
          )}
        </div>
      </div>

      {locationStatus === "error" && <p className="mt-3 text-sm text-amber-300">{locationMessage}</p>}

      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((brewery) => {
          const hours = breweryHours[brewery.slug];
          const profileHref = getBreweryProfileRoute(brewery.slug) ?? "/breweries";

          return (
            <article
              key={brewery.slug}
              className="group cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-[#131312] transition hover:-translate-y-0.5 hover:border-white/20"
              role="link"
              tabIndex={0}
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("[data-card-action]")) return;
                window.location.assign(profileHref);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  window.location.assign(profileHref);
                }
              }}
            >
              {brewery.image && (
                <a href={profileHref} className="block h-52 overflow-hidden bg-[#191918]">
                  <img src={brewery.image.url} alt={brewery.image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" style={brewery.slug === "smiling-moose-grove-city" ? { objectPosition: "center 88%" } : undefined} />
                </a>
              )}

              <div className="p-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 text-xs font-black uppercase tracking-[.12em] text-zinc-500">
                      {brewery.neighborhood}
                      {brewery.distanceMiles !== null && <span className="ml-2 text-[var(--gold)]">· {formatDistance(brewery.distanceMiles)}</span>}
                    </div>
                    <div className="shrink-0 rounded-full border border-white/10 bg-[#0d0d0c] px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] text-[var(--gold)]">{brewery.area}</div>
                  </div>

                  <div className="mt-2 flex items-start gap-3">
                    <BreweryMark website={brewery.slug.startsWith("hitchhiker-") ? "" : brewery.website} name={brewery.name} logo={brewery.logo} />
                    <h2 className="min-w-0 flex-1 text-2xl font-black leading-[1.08]">
                      <a href={profileHref} className="text-white transition hover:text-[var(--gold)]">
                        {brewery.name}
                      </a>
                    </h2>
                  </div>
                </div>

                {brewery.pittsburghOriginal && <div className="mt-3"><span title="Founded in the greater Pittsburgh region" className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] text-amber-300"><span aria-hidden="true">★</span> PGH Original</span></div>}
                {brewery.originNote && <p className="mt-3 text-xs leading-relaxed text-zinc-400">{brewery.originNote}</p>}
                <div className="mt-5 flex flex-wrap gap-2"><span className="tag">{brewery.type}</span><span className="tag">{brewery.food}</span>{brewery.outdoor && <span className="tag">Patio</span>}{brewery.dogFriendly && <span className="tag">Dog friendly</span>}</div>

                <div className="mt-5 border-t border-white/8 pt-4">
                  <a
                    href={directionsUrl(brewery.address)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm leading-6 text-zinc-300 transition hover:text-[var(--gold)]"
                    aria-label={`Open ${brewery.address} in maps`}
                  >
                    <span>{brewery.address}</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <details data-card-action className="group/hours mt-4 border-y border-white/8 py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-black text-white marker:content-none">
                      <span className="flex items-center gap-2">
                        <span>Hours</span>
                        {!hours && <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[.08em] text-amber-300">Unverified</span>}
                      </span>
                      <span className="text-lg leading-none text-[var(--gold)] transition-transform group-open/hours:rotate-90" aria-hidden="true">›</span>
                    </summary>

                    {hours ? (
                      <div className="pb-3">
                        <div className="space-y-1.5">
                          {hours.hours.map((row) => (
                            <div key={row.day} className="flex items-center justify-between gap-4 text-sm">
                              <span className="text-zinc-500">{row.day}</span>
                              <span className="font-bold text-zinc-200">{row.hours}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[.08em] text-zinc-600">
                          <span>Checked {hours.lastChecked}</span>
                          <a href={hours.sourceUrl || brewery.website} target="_blank" rel="noreferrer" data-card-action className="text-zinc-500 hover:text-[var(--gold)]">Verify hours ↗</a>
                        </div>
                      </div>
                    ) : (
                      <div className="pb-3 text-sm leading-6 text-zinc-500">
                        <p>Hours are currently unverified.</p>
                        <a href={brewery.website} target="_blank" rel="noreferrer" data-card-action className="mt-1 inline-block font-black text-[var(--gold)] hover:text-white">Check the brewery website for current hours ↗</a>
                      </div>
                    )}
                  </details>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm font-black">
                    <a href={brewery.website} target="_blank" rel="noreferrer" data-card-action className="text-[var(--gold)] hover:text-white">Website ↗</a>
                    <a href={directionsUrl(brewery.address)} target="_blank" rel="noreferrer" data-card-action className="text-zinc-400 hover:text-white">Directions ↗</a>
                  </div>
                  <div className="mt-4 text-[10px] font-black uppercase tracking-[.12em] text-zinc-700">Verified {brewery.lastVerified}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="mt-6 rounded-xl border border-dashed border-zinc-700 p-10 text-center"><div className="text-xl font-black">No breweries match those filters.</div><p className="mt-2 text-zinc-500">Try another area or clear the filters.</p></div>}
    </div>
  );
}
