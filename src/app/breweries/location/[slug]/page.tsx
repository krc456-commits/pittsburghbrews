import Link from "next/link";
import { notFound } from "next/navigation";
import { breweries } from "@/data/allBreweries";

type Props = { params: Promise<{ slug: string }> };

export default async function BreweryLocationPage({ params }: Props) {
  const { slug } = await params;
  const brewery = breweries.find((item) => item.slug === slug);
  if (!brewery) notFound();
  const otherAlteredGenius = slug === "altered-genius-ambridge" ? breweries.find((item) => item.slug === "altered-genius-imperial") : slug === "altered-genius-imperial" ? breweries.find((item) => item.slug === "altered-genius-ambridge") : null;
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(brewery.address);
  return (
    <main className="min-h-screen bg-[#0b0b0a] text-white">
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <Link href="/breweries" className="text-sm font-semibold text-[#e8b44b] hover:underline">← Back to all breweries</Link>
        <p className="mt-10 text-sm font-bold uppercase tracking-widest text-[#e8b44b]">{brewery.neighborhood} · {brewery.city}</p>
        {brewery.pittsburghOriginal && <div className="mt-3"><span title="Founded in the greater Pittsburgh region" className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-300">★ PGH Original</span></div>}
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{brewery.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300">{brewery.blurb}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#171716] p-6">
            <h2 className="text-xl font-bold">Visit this location</h2>
            <p className="mt-3 text-zinc-300">{brewery.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e8b44b] px-5 py-3 font-bold text-black">Get directions ↗</a>
              <a href={brewery.website} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/20 px-5 py-3 font-bold">Official website ↗</a>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#171716] p-6">
            <h2 className="text-xl font-bold">About the brewery</h2>
            <p className="mt-3 text-zinc-300">{brewery.type}</p>
            <p className="mt-2 text-zinc-400">Food: {brewery.food}</p>
            <p className="mt-5 text-sm text-zinc-500">Verify opening hours and current offerings directly with the brewery before visiting.</p>
          </div>
        </div>
        {otherAlteredGenius && <div className="mt-6 rounded-xl border border-white/10 bg-[#171716] p-5"><p className="text-xs font-bold uppercase tracking-wider text-amber-300">Another Altered Genius location</p><Link className="mt-2 block font-semibold text-white hover:underline" href={`/breweries/location/${otherAlteredGenius.slug}`}>{otherAlteredGenius.name} ↗</Link><p className="mt-1 text-sm text-zinc-400">{otherAlteredGenius.address}</p></div>}
        <p className="mt-10 text-sm text-zinc-500">This listing is newly added. More photographs and profile details are coming soon.</p>
      </section>
    </main>
  );
}
