"use client";

import { useEffect, useMemo, useState } from "react";

import { retailers } from "@/data/retailers";

type Location = {lat:number; lng:number};
function miles(a:Location,b:Location) {
  const rad=(x:number)=>x*Math.PI/180;
  const dLat=rad(b.lat-a.lat), dLng=rad(b.lng-a.lng);
  const v=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
  return 3958.8*2*Math.asin(Math.sqrt(v));
}
export default function RetailersPage() {
  const [location,setLocation]=useState<Location|null>(null);
  const [locationStatus,setLocationStatus]=useState<"idle"|"locating"|"ready"|"error">("idle");
  const [sort,setSort]=useState<"alpha"|"distance">("alpha");
  function locate(){
    if(!navigator.geolocation){setLocationStatus("error");return;}
    setLocationStatus("locating");
    navigator.geolocation.getCurrentPosition(position=>{
      const next={lat:position.coords.latitude,lng:position.coords.longitude};
      setLocation(next);setSort("distance");setLocationStatus("ready");
      sessionStorage.setItem("pittsburgh-brews-location",JSON.stringify(next));
    },()=>setLocationStatus("error"),{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
  }
  useEffect(()=>{
    try {
      const saved=sessionStorage.getItem("pittsburgh-brews-location");
      if(saved) {const loc=JSON.parse(saved) as Location;if(Number.isFinite(loc.lat)&&Number.isFinite(loc.lng)){setLocation(loc);setSort("distance");setLocationStatus("ready");}}
    }catch {/* Ignore unavailable session data */}
  },[]);
  const [query,setQuery] = useState("");
  const [filter,setFilter] = useState("All");
  const [open,setOpen] = useState<string | null>(null);
  useEffect(() => {
    const highlighted = new URLSearchParams(window.location.search).get("spotlight");
    if (highlighted && retailers.some(item => item.name === highlighted)) {
      setOpen(highlighted);
      setQuery(highlighted);
    }
  }, []);
  const results = useMemo(()=>retailers.filter(item =>
    (filter==="All" || item.kind===filter) &&
    [item.name,item.area,item.address,item.summary,...item.reasons,...(item.brands ?? [])].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a,b)=>{
    if(sort==="distance"&&location){
      const x=a.coordinates?miles(location,a.coordinates):null,y=b.coordinates?miles(location,b.coordinates):null;
      if(x===null&&y!==null)return 1;
      if(y===null&&x!==null)return -1;
      if(x!==null&&y!==null)return x-y;
    }
    return a.name.localeCompare(b.name);
  }),[query,filter,location,sort]);
  return <main className="min-h-screen bg-[#171714] text-white">
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <a href="/" className="text-sm font-bold text-[var(--gold)]">← Pittsburgh Brews</a>
      <div className="mt-8 text-xs font-black uppercase tracking-widest text-[var(--gold)]">Find your brew in Pittsburgh</div>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Craft Beer Retailers</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">A simple, alphabetical list of places to explore craft beer. Browse bottle shops, distributors, and places offering craft beer to go. Listings do not represent live inventory.</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1"><span className="sr-only">Search places and beer brands</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search shops, areas or beer brands" className="w-full rounded-xl border border-white/20 bg-[#282720] px-4 py-3 text-white placeholder:text-zinc-400"/></label>
        <label><span className="sr-only">Type of retailer</span><select value={filter} onChange={e=>setFilter(e.target.value)} className="w-full rounded-xl border border-white/20 bg-[#282720] px-4 py-3 text-white sm:w-auto"><option>All</option><option>Bottle shop</option><option>Beer distributor</option><option>Bottle shop &amp; taproom</option><option>Restaurant &amp; beer to go</option></select></label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={locate} disabled={locationStatus==="locating"} className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-sm font-black text-[var(--gold)] disabled:opacity-60">{locationStatus==="locating"?"Finding your location…":location?"Update my location":"Find Craft Beer Retailers Near Me"}</button>
        {location&&<button onClick={()=>setSort(sort==="alpha"?"distance":"alpha")} className="rounded-full border border-white/20 px-4 py-2 text-sm">{sort==="alpha"?"Sort by distance":"Sort A–Z"}</button>}
      </div>
      {locationStatus==="error"&&<p role="alert" className="mt-3 text-sm text-amber-300">Location is unavailable or permission was denied. You can still search all bottle shops and distributors.</p>}
      <p aria-live="polite" className="mt-4 text-sm text-zinc-400">{results.length} {results.length===1?"place":"places"} · {location&&sort==="distance"?"Nearest first (where location verified)":"A–Z"}</p>
      <div className="mt-4 space-y-3">
        {results.map(item=><article key={item.name} className="overflow-hidden rounded-2xl border border-white/15 bg-[#26251f]">
          <button type="button" aria-expanded={open===item.name} onClick={()=>setOpen(open===item.name?null:item.name)} className="flex w-full items-center justify-between gap-3 p-5 text-left hover:bg-white/5">
            <span><span className="block text-lg font-black">{item.name}</span><span className="mt-1 block text-sm text-zinc-400">{item.kind} · {item.area}{location&&item.coordinates?` · ${miles(location,item.coordinates).toFixed(1)} mi away`:location?" · Distance unavailable":""}</span><span className="mt-2 block text-sm text-zinc-300">{item.reasons[0]}</span></span>
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
              {item.phone && <a className="rounded-lg bg-[var(--gold)] px-4 py-2 text-black" href={`tel:${item.phone}`}>Call shop ↗</a>}
              {item.website && <a className="rounded-lg border border-white/25 px-4 py-2" href={item.website} target="_blank" rel="noopener noreferrer">Shop website ↗</a>}
              <a className="rounded-lg border border-white/25 px-4 py-2" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`} target="_blank" rel="noopener noreferrer">Directions ↗</a>
              <a className="rounded-lg border border-white/25 px-4 py-2" href={item.source} target="_blank" rel="noopener noreferrer">Source ↗</a>
            </div>
          </div>}
        </article>)}
        {results.length===0 && <p className="rounded-xl border border-white/15 p-5 text-zinc-300">No matching retailers in this initial collection.</p>}
      </div>
      <p className="mt-8 text-sm text-zinc-400">This is an expanding research-backed list, not an exhaustive directory. Verify current hours, inventory and business details with the retailer before visiting. Event listings and brewery profiles remain available separately.</p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-[var(--gold)]"><a href="/breweries">Browse breweries →</a><a href="/events">Explore beer events →</a></div>
    </div>
  </main>;
}
