"use client";

import { useMemo, useState } from "react";

type Retailer = {
  name: string; kind: "Bottle shop" | "Beer distributor"; area: string;
  address: string; phone: string; website: string; source: string;
  reasons: string[]; brands?: string[];
  summary: string;
};

const retailers: Retailer[] = [
  { name:"Hal’s Bottle Shop",kind:"Bottle shop",area:"North Hills",address:"3225 Babcock Blvd, Pittsburgh, PA 15237",phone:"4123643230",website:"https://www.halsbar.com/bottle-shop",source:"https://www.halsbar.com/bottle-shop",summary:"Build-your-own six-packs, local craft selections, and beers that can be harder to find.",reasons:["Build your own six-pack","Rare Beer Club — ask the shop about current rules","Current selection linked through Untappd"],brands:["Abjuration","Cinderlands","Coven","Dancing Gnome","Helltown","Hitchhiker","Lolev","Old Thunder"] },
  { name:"Beer Towne",kind:"Beer distributor",area:"Gibsonia",address:"619 Warrendale Rd Suite 2, Gibsonia, PA 15044",phone:"7246877837",website:"https://beertowne.com/",source:"https://beertowne.com/breweries/",summary:"Local craft beer selection, new arrivals and a published list of represented breweries.",reasons:["Local brewery selection","Untappd beer menu","Curbside pickup and keg requests"],brands:["Brew Gentlemen","Cinderlands","Dancing Gnome","Eleventh Hour","Four Points"] },
  { name:"Creekside Beer",kind:"Beer distributor",area:"Sewickley",address:"2175 Big Sewickley Creek Rd, Sewickley, PA 15143",phone:"7242660700",website:"https://www.creeksidebeer.com/",source:"https://www.creeksidebeer.com/about-us",summary:"Local and wider craft selections with a searchable online catalog.",reasons:["Local and specialty craft beer","Online beer catalog","Drive-up lane and pickup"] },
  { name:"Babcock Beer",kind:"Beer distributor",area:"North Hills",address:"2199 Babcock Blvd, Pittsburgh, PA",phone:"4128215009",website:"https://babcockbeer.com/",source:"https://babcockbeer.com/",summary:"North Hills beer distributor advertising a broad selection of craft beer.",reasons:["Craft beer selection","Singles, four-packs, six-packs and cases"] },
  { name:"Bethel Beer and More",kind:"Beer distributor",area:"Bethel Park",address:"441 McMurray Rd, Bethel Park, PA 15102",phone:"4128352255",website:"https://www.bethelbeer.com/",source:"https://www.bethelbeer.com/",summary:"Pittsburgh craft favorites alongside other beer, cider and specialty selections.",reasons:["Local craft beer","Singles and kegs","Call-ahead and curbside pickup"] }
];

export default function RetailersPage() {
  const [query,setQuery] = useState("");
  const [filter,setFilter] = useState("All");
  const [open,setOpen] = useState<string | null>(null);
  const results = useMemo(()=>retailers.filter(item =>
    (filter==="All" || item.kind===filter) &&
    [item.name,item.area,item.address,item.summary,...item.reasons,...(item.brands ?? [])].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a,b)=>a.name.localeCompare(b.name)),[query,filter]);
  return <main className="min-h-screen bg-[#171714] text-white">
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <a href="/" className="text-sm font-bold text-[var(--gold)]">← Pittsburgh Brews</a>
      <div className="mt-8 text-xs font-black uppercase tracking-widest text-[var(--gold)]">Find your brew in Pittsburgh</div>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Bottle Shops & Beer Distributors</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">A simple, alphabetical list of places to explore craft beer. No rankings, no paid placements, and no claims of live inventory.</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1"><span className="sr-only">Search places and beer brands</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search shops, areas or beer brands" className="w-full rounded-xl border border-white/20 bg-[#282720] px-4 py-3 text-white placeholder:text-zinc-400"/></label>
        <label><span className="sr-only">Type of retailer</span><select value={filter} onChange={e=>setFilter(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#282720] px-4 py-3 text-white sm:w-auto"><option>All</option><option>Bottle shop</option><option>Beer distributor</option></select></label>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-zinc-400">{results.length} {results.length===1?"place":"places"} · Alphabetical, not ranked</p>
      <div className="mt-4 space-y-3">
        {results.map(item=><article key={item.name} className="overflow-hidden rounded-2xl border border-white/15 bg-[#26251f]">
          <button type="button" aria-expanded={open===item.name} onClick={()=>setOpen(open===item.name?null:item.name)} className="flex w-full items-center justify-between gap-3 p-5 text-left hover:bg-white/5">
            <span><span className="block text-lg font-black">{item.name}</span><span className="mt-1 block text-sm text-zinc-400">{item.kind} · {item.area}</span><span className="mt-2 block text-sm text-zinc-300">{item.reasons[0]}</span></span>
            <span aria-hidden="true" className="text-[var(--gold)]">{open===item.name?"−":"+"}</span>
          </button>
          {open===item.name && <div className="border-t border-white/10 p-5">
            <p className="text-sm leading-6 text-zinc-200">{item.summary}</p>
            <h2 className="mt-5 font-black">What makes this place worth knowing?</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-300">{item.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul>
            {item.brands && <><h2 className="mt-5 font-black">Brewery brands you may find</h2><div className="mt-2 flex flex-wrap gap-2">{item.brands.map(brand=><span key={brand} className="rounded-full border border-white/20 px-3 py-1 text-xs">{brand}</span>)}</div></>}
            <p className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-zinc-300"><strong>Selection & availability:</strong> Brands and features are based on retailer-published information, not live inventory. Selection can change. Call the shop to confirm a particular beer, brand or club benefit before visiting.</p>
            <p className="mt-4 text-sm text-zinc-300">{item.address}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
              <a className="rounded-lg bg-[var(--gold)] px-4 py-2 text-black" href={`tel:${item.phone}`}>Call shop ↗</a>
              <a className="rounded-lg border border-white/25 px-4 py-2" href={item.website} target="_blank" rel="noopener noreferrer">Shop website ↗</a>
              <a className="rounded-lg border border-white/25 px-4 py-2" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`} target="_blank" rel="noopener noreferrer">Directions ↗</a>
              <a className="rounded-lg border border-white/25 px-4 py-2" href={item.source} target="_blank" rel="noopener noreferrer">Source ↗</a>
            </div>
          </div>}
        </article>)}
        {results.length===0 && <p className="rounded-xl border border-white/15 p-5 text-zinc-300">No matching retailers in this initial collection.</p>}
      </div>
      <p className="mt-8 text-sm text-zinc-400">This is an initial, curated list of independently verified retail locations, not an exhaustive directory. Event listings and brewery profiles remain available separately.</p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-[var(--gold)]"><a href="/breweries">Browse breweries →</a><a href="/events">Explore beer events →</a></div>
    </div>
  </main>;
}
