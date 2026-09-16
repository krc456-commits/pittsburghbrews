import { Suspense } from "react";
import BreweryDirectory from "@/components/BreweryDirectory";

export default function BreweriesPage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow">Brewery directory</div>
              <h1 className="mt-2 text-4xl font-black tracking-[-.045em] text-white md:text-5xl">Find a brewery</h1>
            </div>
          </div>
          <Suspense fallback={<div className="mt-8 text-zinc-600">Loading directory…</div>}><BreweryDirectory /></Suspense>
        </div>
      </section>
    </main>
  );
}
