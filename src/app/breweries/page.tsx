export default function BreweriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-3xl">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Directory</div>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Breweries</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">The new brewery directory is next: searchable, filterable, grouped by area, and easy to maintain.</p>
      </div>
      <div id="map" className="mt-12 border border-[var(--border)] bg-[var(--panel)] p-8 text-zinc-400">Directory and map coming next.</div>
    </main>
  );
}
