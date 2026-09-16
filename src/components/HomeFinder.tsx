"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { areas } from "@/data/breweries";

const foodFilters = ["Any food", "Full kitchen", "Food trucks", "Light food"] as const;
const featureFilters = ["Any feature", "Outdoor seating", "Dog friendly"] as const;

export default function HomeFinder() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");
  const [food, setFood] = useState<(typeof foodFilters)[number]>("Any food");
  const [feature, setFeature] = useState<(typeof featureFilters)[number]>("Any feature");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (area !== "All") params.set("area", area);
    if (food !== "Any food") params.set("food", food);
    if (feature === "Outdoor seating") params.set("feature", "outdoor");
    if (feature === "Dog friendly") params.set("feature", "dog");
    const suffix = params.toString();
    router.push(`/breweries${suffix ? `?${suffix}` : ""}`);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#121211] p-4 sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_.8fr_.8fr_.8fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Brewery, neighborhood, or city"
          className="min-h-12 rounded-lg border border-white/10 bg-[#0b0b0a] px-4 text-base text-white outline-none placeholder:text-zinc-600 focus:border-[var(--gold)]"
        />
        <select value={area} onChange={(event) => setArea(event.target.value)} className="min-h-12 rounded-lg border border-white/10 bg-[#0b0b0a] px-4 text-base font-bold text-white outline-none focus:border-[var(--gold)]">
          {areas.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={food} onChange={(event) => setFood(event.target.value as (typeof foodFilters)[number])} className="min-h-12 rounded-lg border border-white/10 bg-[#0b0b0a] px-4 text-base font-bold text-white outline-none focus:border-[var(--gold)]">
          {foodFilters.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={feature} onChange={(event) => setFeature(event.target.value as (typeof featureFilters)[number])} className="min-h-12 rounded-lg border border-white/10 bg-[#0b0b0a] px-4 text-base font-bold text-white outline-none focus:border-[var(--gold)]">
          {featureFilters.map((item) => <option key={item}>{item}</option>)}
        </select>
        <button type="submit" className="min-h-12 rounded-lg bg-[var(--gold)] px-6 font-black text-black transition hover:bg-[#ffd94d]">Find breweries</button>
      </div>
    </form>
  );
}
