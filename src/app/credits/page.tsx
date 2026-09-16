export default function CreditsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
      <div className="eyebrow">Transparency</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Image credits</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
        Pittsburgh Brews only uses brewery photography when the source and reuse rights are documented. Cards without an approved storefront or taproom photo simply use the clean text layout.
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
        <Credit
          title="The Church Brew Works card photo"
          author="Olessi"
          license="Public domain"
          source="https://commons.wikimedia.org/wiki/File:The_Church_Brew_Works.jpg"
        />
      </div>

      <div className="mt-12 border border-[var(--border)] bg-[var(--panel)] p-6 text-sm leading-6 text-zinc-400">
        Storefront and taproom photos are added only when a reusable source is documented. No random logos, social-media images, or decorative initials are used as substitutes.
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
