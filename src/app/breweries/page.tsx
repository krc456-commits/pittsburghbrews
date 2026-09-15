import { Suspense } from "react";
import BreweryDirectory from "@/components/BreweryDirectory";

export default function BreweriesPage() {
  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#111_0%,#0a0a0a_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <div className="eyebrow">Directory</div>
            <h1 className="mt-3 text-5xl font-black tracking-[-0.045em] md:text-7xl">Find a brewery.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Search a starter set of verified Pittsburgh-area breweries by name, neighborhood, region, or food setup. We&apos;ll keep expanding this list as the rebuild continues.
            </p>
          </div>

          <Suspense fallback={<div className="mt-12 text-zinc-500">Loading directory…</div>}>
            <BreweryDirectory />
          </Suspense>
        </div>
      </section>

      <section id="map" className="border-b border-[var(--border)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div>
              <div className="eyebrow">Next up</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Map view is the next functional layer.</h2>
              <p className="mt-4 text-zinc-400">The directory is live first. Interactive map pins, list/map toggle, and richer brewery detail pages can layer on without blocking the useful part.</p>
            </div>
            <div className="relative min-h-72 overflow-hidden border border-[var(--border)] bg-[#111]">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#2a2a2a_1px,transparent_1px),linear-gradient(90deg,#2a2a2a_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-[var(--gold)] bg-black/80 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--gold)]">Interactive map coming next</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
