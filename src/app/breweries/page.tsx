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
          <div className="mt-6">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-600">Quick picks</div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <a href="/breweries?feature=outdoor" className="rounded-full border border-white/10 bg-[#151514] px-4 py-2.5 text-sm font-black text-zinc-200 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">☀ Patio beers</a>
              <a href="/breweries?food=Full%20kitchen" className="rounded-full border border-white/10 bg-[#151514] px-4 py-2.5 text-sm font-black text-zinc-200 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">🍔 Full kitchen</a>
              <a href="/breweries?food=Food%20trucks" className="rounded-full border border-white/10 bg-[#151514] px-4 py-2.5 text-sm font-black text-zinc-200 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">🚚 Food trucks</a>
              <a href="/breweries?feature=dog" className="rounded-full border border-white/10 bg-[#151514] px-4 py-2.5 text-sm font-black text-zinc-200 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">🐾 Dog friendly</a>
              <a href="/breweries?area=Pittsburgh" className="rounded-full border border-white/10 bg-[#151514] px-4 py-2.5 text-sm font-black text-zinc-200 transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">📍 Pittsburgh proper</a>
            </div>
          </div>
          <Suspense fallback={<div className="mt-8 text-zinc-600">Loading directory…</div>}><BreweryDirectory /></Suspense>
        </div>
      </section>
    </main>
  );
}
