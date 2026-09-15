export default function CreditsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
      <div className="eyebrow">Transparency</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Image credits</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
        Pittsburgh Brews only uses imagery when the source and reuse rights are documented. Brewery-owned photos and logos are not copied from social media, Google, Yelp, or other third-party platforms unless reuse permission is clear.
      </p>

      <div className="mt-10 space-y-6">
        <Credit
          title="Homepage Pittsburgh skyline"
          author="Dough4872"
          license="CC BY-SA 4.0"
          source="https://commons.wikimedia.org/wiki/File:Pittsburgh_skyline_from_North_Shore_near_PNC_Park_August_2025.jpeg"
          licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/"
        />
        <Credit
          title="Penn Brewery card photo"
          author="Lee Paxton"
          license="CC BY-SA / GFDL"
          source="https://commons.wikimedia.org/wiki/File:PennBrewery.jpg"
          licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/"
        />
        <Credit
          title="East End Brewing Company card photo"
          author="Drew from Zhrodague"
          license="Creative Commons licensed"
          source="https://commons.wikimedia.org/wiki/File:East_End_Brewing_Company.jpg"
        />
      </div>

      <div className="mt-12 border border-[var(--border)] bg-[var(--panel)] p-6 text-sm leading-6 text-zinc-400">
        Brewery cards without a documented rights-cleared image intentionally show a branded placeholder. Those will be replaced as licensed storefront photos, approved media-kit images, or explicit brewery permissions are obtained.
      </div>
    </main>
  );
}

function Credit({ title, author, license, source, licenseUrl }: { title: string; author: string; license: string; source: string; licenseUrl?: string }) {
  return (
    <section className="border border-[var(--border)] bg-[var(--panel)] p-6">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-2 text-zinc-400">Photo by {author} · {license}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
        <a href={source} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">Source ↗</a>
        {licenseUrl && <a href={licenseUrl} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white">License ↗</a>}
      </div>
    </section>
  );
}
