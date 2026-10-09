import Link from "next/link";
import { breweries } from "@/data/allBreweries";
import { breweryHours } from "@/data/breweryHours";
import type { BreweryProfileContent, ExtraProfileLocation } from "@/data/breweryProfileContent";

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/8 py-3 last:border-b-0">
      <div className="text-[10px] font-black uppercase tracking-[.13em] text-zinc-600">{label}</div>
      <div className="mt-1 text-sm font-bold text-zinc-200">{value}</div>
    </div>
  );
}

function ExtraLocation({ location }: { location: ExtraProfileLocation }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#151514]">
      <div className="border-b border-white/8 bg-[#1d1c18] p-5 sm:p-6">
        <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Location</div>
        <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-white">{location.name}</h3>
        <a href={directionsUrl(location.address)} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-bold text-zinc-400 hover:text-[var(--gold)]">{location.address} ↗</a>
      </div>
      <div className="grid lg:grid-cols-[1.25fr_.75fr]">
        <p className="p-5 text-[15px] leading-7 text-zinc-300 sm:p-6">{location.description}</p>
        <aside className="border-t border-white/8 bg-[#10100f] p-5 lg:border-l lg:border-t-0">
          {location.atmosphere && <Fact label="Atmosphere" value={location.atmosphere} />}
          {location.food && <Fact label="Food" value={location.food} />}
          {location.website && <a href={location.website} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black text-[var(--gold)] hover:text-white">Check current details ↗</a>}
        </aside>
      </div>
    </section>
  );
}

export default function BreweryProfilePage({ profile }: { profile: BreweryProfileContent }) {
  const locations = profile.locationSlugs.map((slug) => breweries.find((b) => b.slug === slug)).filter(Boolean);
  const hero = locations.find((b) => b?.image)?.image;

  return (
    <main className="bg-[#0b0b0a]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#171714]">
        {hero && (
          <div className="absolute inset-0 opacity-25">
            <img src={hero.url} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0a] via-[#0b0b0a]/90 to-[#0b0b0a]/55" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <Link href="/breweries" className="text-xs font-black uppercase tracking-[.12em] text-zinc-400 hover:text-[var(--gold)]">← Brewery directory</Link>
          <div className="mt-9 max-w-4xl">
            <div className="eyebrow">Brewery profile</div>
            {profile.locationSlugs.some((slug) => breweries.find((item) => item.slug === slug)?.pittsburghOriginal) && <div className="mt-3"><span title="Founded in the greater Pittsburgh region" className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-black uppercase tracking-[.08em] text-amber-300">★ PGH Original</span></div>}
    <h1 className="mt-3 text-5xl font-black tracking-[-.055em] text-white sm:text-6xl md:text-7xl">{profile.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">{profile.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.founded && <span className="tag">Founded {profile.founded}</span>}
              {profile.knownFor.map((item) => <span key={item} className="tag">{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#eee8d9] text-[#191815]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 md:grid-cols-[.75fr_1.25fr] md:px-8 md:py-11">
          <div>
            <div className="text-xs font-black uppercase tracking-[.13em] text-[#8d6b00]">What makes it special</div>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em]">{profile.specialTitle}</h2>
          </div>
          <div className="space-y-4 text-[15px] leading-7 text-[#5e594d]">
            {profile.specialBody.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <div className="eyebrow">The story</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white md:text-4xl">{profile.storyTitle}</h2>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-zinc-300">
            {profile.story.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-8 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/8 p-5 sm:p-6">
            <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">Pittsburgh Brews take</div>
            <p className="mt-2 text-xl font-black leading-8 text-white">{profile.take}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{profile.takeDetail}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#11110f]">
        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
          <div className="eyebrow">The beer</div>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white md:text-4xl">{profile.beerTitle}</h2>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-zinc-300">
            {profile.beer.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="eyebrow">Locations</div>
          <h2 className="mt-2 text-4xl font-black tracking-[-.045em] text-white">Where to visit</h2>
          <div className="mt-8 space-y-7">
            {locations.map((brewery) => {
              if (!brewery) return null;
              const hours = breweryHours[brewery.slug];
              return (
                <section key={brewery.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151514]">
                  <div className="border-b border-white/8 bg-[#1d1c18] p-5 sm:p-6">
                    <div className="text-xs font-black uppercase tracking-[.13em] text-[var(--gold)]">{brewery.neighborhood}</div>
                    <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-white">{brewery.name}</h3>
                    <a href={directionsUrl(brewery.address)} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-bold text-zinc-400 hover:text-[var(--gold)]">{brewery.address} ↗</a>
                  </div>
                  <div className="grid lg:grid-cols-[1.25fr_.75fr]">
                    <div className="p-5 sm:p-6">
                      <p className="text-[15px] leading-7 text-zinc-300">{brewery.blurb}</p>
                      {brewery.slug === "golden-age-bohemian" && (
                        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
                          <p className="text-xs font-black uppercase tracking-wider text-amber-300">Finding the entrance</p>
                          <p className="mt-2 text-sm leading-6 text-zinc-200">Look for The Bohemian’s green-trimmed storefront next to the historic Garden Theater marquee on W. North Avenue. Use the street-facing Bohemian entrance at 22 W. North Avenue—not the old theater doors under the marquee. Mayfly Market &amp; Deli is a separate neighboring storefront.</p>
                        </div>
                      )}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="tag">{brewery.food}</span>
                        {brewery.outdoor && <span className="tag">Outdoor seating</span>}
                        {brewery.dogFriendly && <span className="tag">Dog friendly</span>}
                        {brewery.glutenInfo && <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] text-emerald-300">GF options</span>}
                      </div>
                      {brewery.glutenInfo && (
                        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                          <div className="text-[10px] font-black uppercase tracking-[.13em] text-emerald-300">Gluten-aware options</div>
                          <div className="mt-2 space-y-2">
                            {brewery.glutenInfo.options.map((option) => (
                              <div key={option.label} className="text-sm leading-6 text-zinc-300">
                                <span className="mr-2 font-black text-white">
                                  {option.category === "gluten-reduced-beer" ? "Gluten-reduced" : option.category.includes("food") ? "Food" : "GF"}
                                </span>
                                {option.label}
                              </div>
                            ))}
                          </div>
                          {brewery.glutenInfo.note && <p className="mt-3 text-xs leading-5 text-zinc-500">{brewery.glutenInfo.note}</p>}
                          <p className="mt-3 text-xs leading-5 text-zinc-500">
                            Availability may depend on the current tap list or menu. Gluten-reduced beer is not the same as gluten-free, and this listing is not a celiac-safety guarantee.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-4 text-xs font-black">
                            <a href={brewery.glutenInfo.sourceUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-white">
                              Brewery source ↗
                            </a>
                            {brewery.untappd && (
                              <a href={brewery.untappd.url} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">
                                {brewery.untappd.liveMenu ? "Check current tap list ↗" : "View beer list on Untappd ↗"}
                              </a>
                            )}
                          </div>
                          <div className="mt-2 text-[10px] uppercase tracking-[.1em] text-zinc-600">Checked {brewery.glutenInfo.checked}</div>
                        </div>
                      )}
                      {brewery.image && (
                        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0c]">
                          <img
                            src={brewery.image.url}
                            alt={brewery.image.alt}
                            className="aspect-[16/9] w-full object-cover"
                            style={brewery.slug === "smiling-moose-grove-city" ? { objectPosition: "center 88%" } : brewery.slug === "golden-age-bohemian" ? { objectPosition: "center 85%" } : undefined}
                          />
                        </div>
                      )}
                    </div>
                    <aside className="border-t border-white/8 bg-[#10100f] p-5 lg:border-l lg:border-t-0">
                      <Fact label="Type" value={brewery.type} />
                      <Fact label="Food" value={brewery.food} />
                      {brewery.untappd && (
                        brewery.untappd.liveMenu ? (
                          <div className="mt-4 rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/7 p-4">
                            <div className="text-[10px] font-black uppercase tracking-[.13em] text-[var(--gold)]">What’s pouring</div>
                            <p className="mt-2 text-sm leading-6 text-zinc-400">See the current beer list maintained on Untappd.</p>
                            <a
                              href={brewery.untappd.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[var(--gold)] hover:text-white"
                            >
                              View current beer list <span aria-hidden="true">↗</span>
                            </a>
                          </div>
                        ) : (
                          <div className="mt-4 border-t border-white/8 pt-4">
                            <div className="text-[10px] font-black uppercase tracking-[.13em] text-zinc-600">Untappd</div>
                            <p className="mt-1 text-xs leading-5 text-zinc-500">Browse this brewery’s beers, ratings and recent activity.</p>
                            <a
                              href={brewery.untappd.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-black text-zinc-300 hover:text-[var(--gold)]"
                            >
                              View on Untappd <span aria-hidden="true">↗</span>
                            </a>
                          </div>
                        )
                      )}
                      {hours ? (
                        <div className="pt-4">
                          <div className="text-[10px] font-black uppercase tracking-[.13em] text-zinc-600">Current regular hours</div>
                          <div className="mt-2 space-y-1 text-sm font-bold text-zinc-300">{hours.hours.map((row) => <div key={row.day}>{row.day}: {row.hours}</div>)}</div>
                          <div className="mt-2 text-[10px] uppercase tracking-[.1em] text-zinc-600">Checked {hours.lastChecked}</div>
                        </div>
                      ) : (
                        <a href={brewery.website} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black text-[var(--gold)] hover:text-white">Check current hours ↗</a>
                      )}
                    </aside>
                  </div>
                </section>
              );
            })}
            {profile.extraLocations?.map((location) => <ExtraLocation key={location.name} location={location} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#080808]">
        <div className="mx-auto max-w-7xl px-5 py-9 md:px-8">
          <div className="text-xs font-black uppercase tracking-[.13em] text-zinc-600">Research & verification</div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">Brewery details change. Pittsburgh Brews uses brewery-published information and other local sources, but always check the brewery directly for current hours, events, food and location policies before making a special trip.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-black">
            {profile.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:text-white">{source.label} ↗</a>)}
          </div>
          <div className="mt-5 text-[10px] font-black uppercase tracking-[.12em] text-zinc-700">Last verified by Pittsburgh Brews · September 19, 2026</div>
        </div>
      </section>
    </main>
  );
}
