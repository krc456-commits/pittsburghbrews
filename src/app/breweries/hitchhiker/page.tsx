import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hitchhiker Brewing Co. | Pittsburgh Brews",
  description:
    "A Pittsburgh Brews guide to Hitchhiker Brewing Co., including its history, beer, Sharpsburg brewery, Mt. Lebanon taproom, food, parking, transit, and what makes each location different.",
};

const hitchhikerSite = "https://hitchhiker.beer/";
const taproomsUrl = "https://hitchhiker.beer/tap-rooms/";
const breweryUrl = "https://hitchhiker.beer/the-brewery/";
const sharpsburgMaps =
  "https://www.google.com/maps/search/?api=1&query=1500%20S.%20Canal%20Street%2C%20Sharpsburg%2C%20PA%2015215";
const mtLebanonMaps =
  "https://www.google.com/maps/search/?api=1&query=190%20Castle%20Shannon%20Boulevard%2C%20Pittsburgh%2C%20PA%2015228";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/8 py-3 last:border-b-0">
      <div className="text-[10px] font-black uppercase tracking-[.13em] text-zinc-600">{label}</div>
      <div className="mt-1 text-sm font-bold text-zinc-200">{value}</div>
    </div>
  );
}

function LocationCard({
  title,
  address,
  mapsUrl,
  bestFeature,
  atmosphere,
  food,
  dogs,
  parking,
  hours,
  children,
}: {
  title: string;
  address: string;
  mapsUrl: string;
  bestFeature: string;
  atmosphere: string;
  food: string;
  dogs: string;
  parking: string;
  hours: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#151514]">
      <div className="border-b border-white/8 bg-[#1d1c18] p-5 sm:p-6">
        <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Hitchhiker location</div>
        <h2 className="mt-2 text-3xl font-black tracking-[-.035em] text-white">{title}</h2>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-sm font-bold text-zinc-400 transition hover:text-[var(--gold)]"
        >
          {address} ↗
        </a>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.25fr_.75fr]">
        <div className="p-5 sm:p-7">
          <div className="space-y-5 text-[15px] leading-7 text-zinc-300">{children}</div>
        </div>
        <aside className="border-t border-white/8 bg-[#10100f] p-5 lg:border-l lg:border-t-0 sm:p-6">
          <Fact label="Best feature" value={bestFeature} />
          <Fact label="Atmosphere" value={atmosphere} />
          <Fact label="Food" value={food} />
          <Fact label="Dogs" value={dogs} />
          <Fact label="Parking / transit" value={parking} />
          <div className="pt-4">
            <div className="text-[10px] font-black uppercase tracking-[.13em] text-zinc-600">Regular hours</div>
            <div className="mt-2 space-y-1 text-sm font-bold text-zinc-300">
              {hours.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <a href={taproomsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-black text-[var(--gold)] hover:text-white">
              Verify current hours ↗
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function HitchhikerProfilePage() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#171714]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Hitchhiker_brewpub%2C_Pittsburgh.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0a] via-[#0b0b0a]/85 to-[#0b0b0a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <Link href="/breweries" className="text-xs font-black uppercase tracking-[.12em] text-zinc-400 transition hover:text-[var(--gold)]">
            ← Brewery directory
          </Link>

          <div className="mt-9 max-w-4xl">
            <div className="eyebrow">Brewery profile</div>
            <h1 className="mt-3 text-5xl font-black tracking-[-.055em] text-white sm:text-6xl md:text-7xl">
              Hitchhiker Brewing Co.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
              Two very different Pittsburgh-area taprooms, one adventurous beer program, and a Sharpsburg brewery that puts modern craft beer back inside a piece of the region&apos;s brewing history.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag">Founded 2014</span>
              <span className="tag">Sharpsburg + Mt. Lebanon</span>
              <span className="tag">IPA · Lager · Sour · Stout</span>
              <span className="tag">Outdoor space</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={hitchhikerSite} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:brightness-95">
                Visit Hitchhiker ↗
              </a>
              <a href="#locations" className="rounded-full border border-white/15 bg-black/25 px-5 py-3 text-sm font-black text-white transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]">
                Compare locations ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#eee8d9] text-[#191815]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 md:grid-cols-[.75fr_1.25fr] md:px-8 md:py-11">
          <div>
            <div className="text-xs font-black uppercase tracking-[.13em] text-[#8d6b00]">What makes it special</div>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em]">One brewery. Two chapters.</h2>
          </div>
          <div className="space-y-4 text-[15px] leading-7 text-[#5e594d]">
            <p>
              Hitchhiker began small in Mt. Lebanon and later grew into a much larger production brewery in Sharpsburg. The two locations still feel meaningfully different: Mt. Lebanon is the intimate neighborhood original, while Sharpsburg is the bigger brewery experience.
            </p>
            <p>
              The Sharpsburg building adds another layer. Hitchhiker brews inside part of the former Fort Pitt Brewing Company complex, returning active beer production to a property tied to Pittsburgh&apos;s earlier brewing era.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <div className="eyebrow">The Hitchhiker story</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white md:text-4xl">From a three-barrel system to Sharpsburg</h2>

          <div className="mt-6 space-y-5 text-[15px] leading-7 text-zinc-300">
            <p>
              Hitchhiker Brewing began brewing in <strong className="text-white">May 2014</strong> on a small three-barrel electric system beneath its Mt. Lebanon taproom. Founder Gary Olden launched the brewery with Andy Kwiatkowski leading the brewing program as the operation grew.
            </p>
            <p>
              By 2017, Hitchhiker needed significantly more room. Production moved to <strong className="text-white">1500 S. Canal Street in Sharpsburg</strong>, where the brewery installed a larger 15-barrel steam brewhouse and expanded its cellar and barrel-aging capabilities.
            </p>
            <p>
              The move also connected Hitchhiker to a much older Pittsburgh beer story. The Sharpsburg facility occupies part of the former Fort Pitt Brewing Company complex, where brewing had taken place generations before the modern craft-beer boom.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/8 p-5 sm:p-6">
            <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Pittsburgh Brews take</div>
            <p className="mt-2 text-xl font-black leading-8 text-white">Go to Hitchhiker when everyone in your group wants something different.</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              The tap list often stretches from clean lagers to hop-forward IPAs, rich stouts and fruit-heavy sour releases, which makes it a useful choice for a group with very different beer tastes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#11110f]">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <div className="eyebrow">The beer</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white md:text-4xl">Traditional when it wants to be. Weird when it wants to be.</h2>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-zinc-300">
            <p>
              Hitchhiker describes its approach as embracing both progressive and traditional styles. That is a good shorthand for a brewery that can put a straightforward pilsner or lager on the board beside a hazy IPA, pastry stout or smoothie sour.
            </p>
            <p>
              <strong className="text-white">Bane of Existence IPA</strong> has become one of the brewery&apos;s recognizable names, but the rotating releases are a major part of Hitchhiker&apos;s identity. Fruit, coffee, vanilla, dessert-inspired ingredients, oak and barrel aging all show up in the wider program.
            </p>
          </div>
        </div>
      </section>

      <section id="locations" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <div className="eyebrow">Locations</div>
            <h2 className="mt-2 text-4xl font-black tracking-[-.045em] text-white">Which Hitchhiker should you visit?</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Same brewery, different experience. Pick the location that fits the kind of stop you want.
            </p>
          </div>

          <div className="mt-8 space-y-7">
            <LocationCard
              title="Sharpsburg — Brewery & Taproom"
              address="1500 S. Canal Street, Sharpsburg, PA 15215"
              mapsUrl={sharpsburgMaps}
              bestFeature="Historic brewery building + beer garden"
              atmosphere="Industrial · spacious · casual · group-friendly"
              food="Taproom snacks + rotating food trucks"
              dogs="Well-behaved dogs on the patio when open"
              parking="Street parking + nearby municipal lots"
              hours={["Mon: Closed", "Tue–Fri: 4–10 PM", "Sat: 12–10 PM", "Sun: 12–8 PM"]}
            >
              <p>
                This is the heart of Hitchhiker&apos;s brewing operation. Production moved here in 2017, and the scale is completely different from the original Mt. Lebanon location.
              </p>
              <p>
                The taproom sits inside part of the old Fort Pitt Brewing property, so the industrial feel is real rather than decorative. Tall ceilings, the production environment and the size of the space make this feel like a destination brewery.
              </p>
              <p>
                Outside, the beer garden adds communal seating and gives Sharpsburg an especially strong warm-weather advantage. If someone were visiting Hitchhiker for the first time and wanted the full brewery experience, this is the location I&apos;d point them toward.
              </p>
            </LocationCard>

            <LocationCard
              title="Mt. Lebanon — Taproom"
              address="190 Castle Shannon Boulevard, Pittsburgh, PA 15228"
              mapsUrl={mtLebanonMaps}
              bestFeature="Original neighborhood taproom"
              atmosphere="Neighborhood · relaxed · smaller · walkable"
              food="Light food and taproom snacks"
              dogs="Well-behaved dogs in outdoor areas"
              parking="Free nearby parking + Red Line T access"
              hours={["Mon–Fri: 4–10 PM", "Sat: 12–10 PM", "Sun: 12–8 PM"]}
            >
              <p>
                This is where Hitchhiker started. Before the Sharpsburg production brewery existed, beer was brewed downstairs here on the brewery&apos;s original three-barrel electric system.
              </p>
              <p>
                Production has since moved, but keeping Mt. Lebanon open gives Hitchhiker a completely different second personality. It feels more like a neighborhood pub than a production brewery.
              </p>
              <p>
                It is also unusually transit-friendly for a Pittsburgh-area brewery. Two Red Line T stations sit within roughly a block, making this one of the easier local taprooms to visit without driving.
              </p>
            </LocationCard>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#1d1c18]">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-2 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#25231e] p-6">
            <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Choose Sharpsburg if...</div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              You want the full brewery experience, a bigger group-friendly space, the beer garden, Pittsburgh brewing history, or a good anchor for exploring nearby breweries.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#25231e] p-6">
            <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Choose Mt. Lebanon if...</div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              You want a smaller neighborhood taproom, you are already in the South Hills, you want easy T access, or you want to visit the place where Hitchhiker began.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#141413] md:grid-cols-[1fr_auto] md:items-center">
            <div className="p-6 md:p-8">
              <div className="eyebrow">Build around it</div>
              <h2 className="mt-2 text-2xl font-black tracking-[-.035em] text-white">Make Hitchhiker part of a brewery crawl.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Sharpsburg is especially useful as a starting point for a brewery crawl. Our crawl builder is planned as a future Pittsburgh Brews feature.
              </p>
            </div>
            <div className="border-t border-white/8 p-6 md:border-l md:border-t-0 md:p-8">
              <Link href="/breweries?area=East" className="inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">
                Explore nearby breweries →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080808]">
        <div className="mx-auto max-w-7xl px-5 py-9 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_.8fr]">
            <div>
              <div className="text-xs font-black uppercase tracking-[.13em] text-zinc-600">Before you go</div>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
                <Fact label="Brewery" value="Hitchhiker Brewing Co." />
                <Fact label="Founded" value="2014" />
                <Fact label="Production brewery" value="Sharpsburg" />
                <Fact label="Taprooms" value="Sharpsburg + Mt. Lebanon" />
                <Fact label="Food" value="Light food; food trucks in Sharpsburg" />
                <Fact label="Outdoor space" value="Available at both locations" />
              </div>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[.13em] text-zinc-600">Research & verification</div>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Brewery details change. Check Hitchhiker directly for current beer availability, events, food trucks, hours and location policies before making a special trip.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-black">
                <a href={breweryUrl} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">Brewery history ↗</a>
                <a href={taproomsUrl} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">Taproom details ↗</a>
              </div>
              <div className="mt-5 text-[10px] font-black uppercase tracking-[.12em] text-zinc-700">Last verified by Pittsburgh Brews · September 19, 2026</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
