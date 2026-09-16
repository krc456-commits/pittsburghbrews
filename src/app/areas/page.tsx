import Link from "next/link";
import { breweries } from "@/data/allBreweries";

const areaNames = ["Pittsburgh", "North", "South", "East", "West", "Surrounding Counties"] as const;

export default function AreasPage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="eyebrow">Browse by area</div>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-white md:text-6xl">Pick a part of town.</h1>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areaNames.map((area) => {
            const count = breweries.filter((brewery) => brewery.area === area).length;
            return (
              <Link key={area} href={`/breweries?area=${encodeURIComponent(area)}`} className="group rounded-xl border border-white/8 bg-[#141413] p-6 transition hover:border-[var(--gold)]/40 hover:bg-[#181817]">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-2xl font-black text-white">{area}</div>
                  <div className="text-xl text-[var(--gold)]">→</div>
                </div>
                <div className="mt-2 text-sm text-zinc-500">{count} {count === 1 ? "brewery" : "breweries"}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
