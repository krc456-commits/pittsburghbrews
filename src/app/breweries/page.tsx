import { Suspense } from "react";
import BreweryDirectory from "@/components/BreweryDirectory";

export default function BreweriesPage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-18">
          <div className="max-w-3xl">
            <div className="eyebrow">Pittsburgh brewery directory</div>
            <h1 className="mt-3 text-5xl font-black tracking-[-.045em] text-[#f5f3ec] md:text-7xl">Find your next stop.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">Search by brewery, neighborhood, area, food setup, patio, or dog-friendly space. The directory stays alphabetical unless you filter it.</p>
          </div>
          <Suspense fallback={<div className="mt-12 text-zinc-600">Loading directory…</div>}><BreweryDirectory /></Suspense>
        </div>
      </section>
    </main>
  );
}
