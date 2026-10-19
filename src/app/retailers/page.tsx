"use client";

import { useEffect, useMemo, useState } from "react";

import { retailers, retailerRegion } from "@/data/retailers";

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
  const [region,setRegion] = useState("All");
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
    (region==="All" || retailerRegion(item)===region) &&
    [item.name,item.area,item.address,item.summary,...item.reasons,...(item.brands ?? [])].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a,b)=>{
    if(sort==="distance"&&location){
      const x=a.coordinates?miles(location,a.coordinates):null,y=b.coordinates?miles(location,b.coordinates):null;
      if(x===null&&y!==null)return 1;
      if(y===null&&x!==null)return -1;
      if(x!==null&&y!==null)return x-y;
    }
    return a.name.localeCompare(b.name);
  }),[query,filter,region,location,sort]);
  return <main className="min-h-screen bg-[#f6f1e7] text-[#191815]">
    <section className="border-b border-black/10 bg-[#efe6d5]">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[.16em] text-[#8d6b00]">Find your brew in Pittsburgh</div>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] md:text-6xl">Craft beer retailers</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#625c50]">Browse bottle shops, beer distributors, taprooms, and restaurants offering craft beer to go. Search by area, retailer type, or brewery brand.</p>
          </div>
          <a href="/submit" className="text-sm font-black text-[#8d6b00] hover:text-black">Know one we missed? →</a>
        </div>
      </div>
    </section>

    <section>
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
            <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">Search retailers
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Shop, area or brewery brand..." className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-medium normal-case tracking-normal text-[#191815] outline-none focus:border-[#8d6b00]"/>
            </label>
            <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">Retailer type
              <select value={filter} onChange={e=>setFilter(e.target.value)} className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#191815]">
                <option>All</option><option>Bottle shop</option><option>Beer distributor</option><option>Bottle shop &amp; taproom</option><option>Restaurant &amp; beer to go</option>
              </select>
            </label>
            <label className="block text-xs font-black uppercase tracking-wide text-[#625c50]">Area
              <select value={region} onChange={e=>setRegion(e.target.value)} className="mt-2 w-full rounded-xl border border-black/15 bg-[#f8f5ef] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-[#191815]">
                <option>All</option><option>Pittsburgh</option><option>North</option><option>South</option><option>East</option><option>West</option><option>Surrounding Counties</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={locate} disabled={locationStatus==="locating"} className="rounded-full border border-[#8d6b00] bg-[#8d6b00] px-3.5 py-2 text-xs font-black text-white transition hover:bg-[#735800] disabled:opacity-60">{locationStatus==="locating"?"Finding your location…":location?"Update my location":"Find retailers near me"}</button>
            {location&&<button onClick={()=>setSort(sort==="alpha"?"distance":"alpha")} className="rounded-full border border-black/15 bg-[#f8f5ef] px-3.5 py-2 text-xs font-black text-[#625c50] transition hover:border-[#8d6b00]">{sort==="alpha"?"Sort by distance":"Sort A–Z"}</button>}
            {(query || filter!=="All" || region!=="All")&&<button onClick={()=>{setQuery("");setFilter("All");setRegion("All");}} className="rounded-full border border-black/15 bg-white px-3.5 py-2 text-xs font-black text-[#625c50] transition hover:border-[#8d6b00]">Clear filters</button>}
          </div>
          {locationStatus==="error"&&<p role="alert" className="mt-3 text-sm font-semibold text-[#8d5d00]">Location is unavailable or permission was denied. You can still search every retailer.</p>}
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#625c50]">
            <p aria-live="polite"><strong className="text-[#191815]">{results.length}</strong> {results.length===1?"place":"places"} found</p>
            <span className="text-xs font-bold">{location&&sort==="distance"?"Nearest first where distance is verified":"Sorted A–Z"}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs font-black uppercase tracking-[.14em] text-[#8d6b00]">Retailer directory</div>
          <h2 className="mt-1 text-2xl font-black">Places to find craft beer</h2>
        </div>

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-2">
          {results.map(item=><article key={item.name} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
            <button type="button" aria-expanded={open===item.name} onClick={()=>setOpen(open===item.name?null:item.name)} className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#f8f5ef]">
              <span>
                <span className="block text-xs font-black uppercase tracking-wide text-[#8d6b00]">{item.kind}</span>
                <span className="mt-1 block text-xl font-black tracking-tight">{item.name}</span>
                <span className="mt-1 block text-sm font-bold text-[#625c50]">{item.area}{location&&item.coordinates?` · ${miles(location,item.coordinates).toFixed(1)} mi away`:location?" · Distance unavailable":""}</span>
                <span className="mt-3 block text-sm leading-6 text-[#777064]">{item.reasons[0]}</span>
              </span>
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#8d6b00]/30 text-xl font-black text-[#8d6b00]">{open===item.name?"−":"+"}</span>
            </button>
            {open===item.name && <div className="border-t border-black/10 bg-[#fcfaf6] p-5">
              <p className="text-sm leading-6 text-[#625c50]">{item.summary}</p>
              <h3 className="mt-5 font-black">What makes this place worth knowing?</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-[#625c50]">{item.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul>
              <details className="mt-5 text-sm">
                <summary className="cursor-pointer font-black text-[#191815]">Hours</summary>
                {item.hours?.length ? <div className="mt-2 space-y-1 text-[#625c50]">{item.hours.map(line => <p key={line}>{line}</p>)}<a href={item.hoursSource ?? item.source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-black text-[#8d6b00]">Verify current hours ↗</a></div> : <p className="mt-2 text-[#777064]">Hours not verified yet. Contact the retailer before visiting.</p>}
              </details>
              {item.brands && <><h3 className="mt-5 font-black">Brewery brands you may find</h3><div className="mt-2 flex flex-wrap gap-2">{item.brands.map(brand=><span key={brand} className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-bold text-[#625c50]">{brand}</span>)}</div>{item.brandListUrl && <a href={item.brandListUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-black text-[#8d6b00]">View published craft beer list ↗</a>}</>}
              <p className="mt-5 rounded-xl border border-black/10 bg-[#eee8d9] p-3 text-xs leading-5 text-[#625c50]"><strong>Selection &amp; availability:</strong> Brands and features come from retailer-published information, not live inventory. Call ahead to confirm a particular beer, brand, or club benefit.</p>
              <p className="mt-4 text-sm font-bold text-[#625c50]">{item.address}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-black">
                {item.phone && <a className="rounded-lg bg-[#8d6b00] px-4 py-2 text-white" href={`tel:${item.phone}`}>Call shop</a>}
                {item.website && <a className="rounded-lg border border-black/15 bg-white px-4 py-2 text-[#191815]" href={item.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
                <a className="rounded-lg border border-black/15 bg-white px-4 py-2 text-[#191815]" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`} target="_blank" rel="noopener noreferrer">Directions ↗</a>
                <a className="rounded-lg border border-black/15 bg-white px-4 py-2 text-[#191815]" href={item.source} target="_blank" rel="noopener noreferrer">Source ↗</a>
              </div>
            </div>}
          </article>)}
          {results.length===0 && <div className="rounded-2xl border border-black/10 bg-white p-8 text-center lg:col-span-2"><h2 className="text-xl font-black">No retailers match those filters</h2><p className="mt-2 text-sm text-[#625c50]">Try another area, retailer type, or a broader search.</p></div>}
        </div>

        <div className="mt-8 rounded-2xl border border-black/10 bg-[#eee8d9] p-5 text-sm leading-6 text-[#625c50]">
          This is an expanding, research-backed directory rather than live inventory. Verify current hours, selection, and business details before visiting. <a href="/submit" className="font-black text-[#8d6b00] hover:text-black">Send us a retailer or correction →</a>
        </div>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-black text-[#8d6b00]"><a href="/breweries">Browse breweries →</a><a href="/events">Explore beer events →</a></div>
      </div>
    </section>
  </main>;
}
