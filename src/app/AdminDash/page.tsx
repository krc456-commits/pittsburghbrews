"use client";
import {useEffect,useState,type FormEvent} from "react";
type EventRow={id:string;name:string;location_name:string;address:string;category:string;description:string;source_url:string;dates:string[];image_url?:string|null;start_time?:string|null;end_time?:string|null;submission_id?:string|null};
type Submission={id:string;event_name:string;location_name:string;status:string;dates:string[]};
type Catalog={key:string;name:string;date:string;location:string;category:string};
const url="https://rajdxrqhmwuoallewumr.supabase.co";
const key="sb_publishable_R9zbJwKqzIYJIY-O6HgKWg_xcXTXUJc";
const categories=["Beer Event","Festival","Holiday themed","Food trucks","Live music","Trivia & games","Beer garden","Oktoberfest","Meetup / Social event"];
const box="w-full rounded-lg border border-white/20 bg-[#242421] px-3 py-2 text-white";
const empty:EventRow={id:"",name:"",location_name:"",address:"",category:"Beer Event",description:"",source_url:"",dates:[]};
export default function AdminDash(){
 const [email,setEmail]=useState("contact@pittsburghbrews.com"),[password,setPassword]=useState("");
 const [token,setToken]=useState(""),[message,setMessage]=useState(""),[busy,setBusy]=useState(false);
 const [rows,setRows]=useState<EventRow[]>([]),[submissions,setSubmissions]=useState<Submission[]>([]),[catalog,setCatalog]=useState<Catalog[]>([]),[hidden,setHidden]=useState<string[]>([]);
 const [tab,setTab]=useState<"published"|"submissions"|"sources">("published");
 const [selected,setSelected]=useState<EventRow|null>(null),[datesText,setDatesText]=useState(""),[filter,setFilter]=useState("");
 useEffect(()=>{const t=sessionStorage.getItem("pb-admin-token");if(t)setToken(t)},[]);
 async function action(tokenValue:string,body:Record<string,unknown>){
   const response=await fetch(url+"/functions/v1/event-admin",{method:"POST",headers:{"apikey":key,"Authorization":"Bearer "+tokenValue,"Content-Type":"application/json"},body:JSON.stringify(body),cache:"no-store"});
   const json=await response.json().catch(()=>({error:"Unexpected server response"}));
   if(!response.ok)throw Error(json.error||"Operation failed");
   return json;
 }
 async function load(t=token){
   if(!t)return;
   try{
     const [result,source]=await Promise.all([action(t,{action:"list"}),fetch("/api/event-catalog",{cache:"no-store"}).then(r=>r.json())]);
     setRows(result.published||[]);setSubmissions(result.submissions||[]);setHidden((result.hidden||[]).map((h:{event_key:string})=>h.event_key));
     setCatalog(source.events||[]);setMessage("");
   }catch(e){setMessage(e instanceof Error?e.message:"Could not load events")}
 }
 useEffect(()=>{if(token)void load(token)},[token]);
 async function register(){
  if(!email||password.length<12){setMessage("Choose an admin email and a password of at least 12 characters.");return}
  setBusy(true);setMessage("");
  try{
   const res=await fetch(url+"/auth/v1/signup",{method:"POST",headers:{"apikey":key,"Content-Type":"application/json"},body:JSON.stringify({email,password})});
   const data=await res.json();
   if(!res.ok)throw Error(data.msg||data.error_description||"Could not create login");
   setMessage("Check your inbox to confirm your email, then sign in. Only the authorized Pittsburgh Brews address can access this dashboard.");
  }catch(e){setMessage(e instanceof Error?e.message:"Signup failed")}finally{setBusy(false)}
 }
 async function login(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");
  try{
   const response=await fetch(url+"/auth/v1/token?grant_type=password",{method:"POST",headers:{"apikey":key,"Content-Type":"application/json"},body:JSON.stringify({email,password})});
   const result=await response.json();
   if(!response.ok)throw Error(result.msg||result.error_description||"Sign-in unsuccessful");
   await action(result.access_token,{action:"list"});
   sessionStorage.setItem("pb-admin-token",result.access_token);setToken(result.access_token);setPassword("");
  }catch(e){setMessage(e instanceof Error?e.message:"Sign-in unsuccessful")}finally{setBusy(false)}
 }
 async function mutate(body:Record<string,unknown>,success:string){
  if(!token)return;setBusy(true);setMessage("");
  try{await action(token,body);setMessage(success);await load(token);setMessage(success);if(body.action==="save"||body.action==="unpublish")setSelected(null)}
  catch(e){setMessage(e instanceof Error?e.message:"Action failed")}finally{setBusy(false)}
 }
 function edit(row:EventRow){setSelected({...row});setDatesText(row.dates.join(", "))}
 async function save(e:FormEvent){e.preventDefault();if(!selected)return;const dates=datesText.split(/[\s,]+/).filter(Boolean);await mutate({...selected,dates,action:"save"},"Event saved to the live site")}
 async function upload(file:File){if(!token||!selected?.id)return;if(file.size>5242880){setMessage("Maximum image size is 5 MB");return}
  setBusy(true);try{const buffer=await file.arrayBuffer();const bytes=new Uint8Array(buffer);let binary="";for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
   await action(token,{action:"image",id:selected.id,mime:file.type,base64:btoa(binary)});await load(token);setMessage("Flyer updated on the live site")}
   catch(e){setMessage(e instanceof Error?e.message:"Upload failed")}finally{setBusy(false)}
 }
 const filtered=rows.filter(r=>(r.name+" "+r.location_name).toLowerCase().includes(filter.toLowerCase()));
 return <main className="min-h-screen bg-[#0e0e0c] px-4 py-10 text-white"><div className="mx-auto max-w-5xl">
 <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold text-[#edcf78]">Pittsburgh Brews</p><h1 className="mt-1 text-3xl font-black">Admin Dashboard</h1><p className="mt-2 text-sm text-zinc-400">Private event management · changes go live without a redeploy</p></div>{token&&<button className="rounded-lg border border-white/20 px-4 py-2" onClick={()=>{sessionStorage.removeItem("pb-admin-token");setToken("");setRows([]);}}>Sign out</button>}</div>
 {!token?<form onSubmit={login} className="mt-8 max-w-md space-y-4 rounded-2xl border border-white/15 bg-[#1b1b18] p-6"><h2 className="text-lg font-bold">Administrator sign in</h2><label className="block text-sm">Admin email<input className={box+" mt-2"} type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="block text-sm">Password<input className={box+" mt-2"} type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><div className="flex flex-wrap items-center gap-3"><button disabled={busy} className="rounded-full bg-[#edcf78] px-6 py-3 font-black text-black">Sign in</button><button type="button" disabled={busy} onClick={register} className="rounded-full border border-white/30 px-5 py-3 font-bold">Create admin login</button></div><p className="text-xs text-zinc-400">Access is restricted to authorized accounts in the Pittsburgh Brews Supabase project. New admin accounts are created privately by the site owner.</p></form>:
 <div className="mt-7"><div className="flex flex-wrap gap-2">
 {([["published","Published events"],["submissions","Submissions"],["sources","Imported & curated"]] as const).map(([value,label])=><button key={value} onClick={()=>{setTab(value);setSelected(null)}} className={"rounded-full px-4 py-2 text-sm font-bold "+(tab===value?"bg-[#edcf78] text-black":"border border-white/20")}>{label}</button>)}
 </div>
 {tab==="published"&&<div className="mt-6">
 <div className="mb-4 flex flex-wrap gap-3"><input className={box+" max-w-xs"} value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search published events"/><button onClick={()=>edit(empty)} className="rounded-lg bg-[#edcf78] px-4 py-2 font-black text-black">+ New event</button><button onClick={()=>load()} className="rounded-lg border border-white/20 px-4 py-2">Refresh</button></div>
 {!selected?<div className="space-y-2">{filtered.map(row=><div key={row.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#1b1b18] p-4"><div><strong>{row.name}</strong><p className="text-sm text-zinc-400">{row.dates?.join(", ")} · {row.location_name}</p></div><div className="flex gap-2"><button className="rounded-lg border border-white/20 px-3 py-2" onClick={()=>edit(row)}>Edit</button><button className="rounded-lg border border-red-500/40 px-3 py-2 text-red-200" onClick={()=>{if(confirm("Unpublish this event?"))mutate({action:"unpublish",id:row.id},"Event unpublished")}}>Unpublish</button></div></div>)}{!filtered.length&&<p className="text-zinc-400">No published database events match.</p>}</div>:
 <form onSubmit={save} className="space-y-4 rounded-2xl border border-white/15 bg-[#1b1b18] p-5"><h2 className="text-xl font-bold">{selected.id?"Edit event":"Create event"}</h2>
 {([["name","Event name"],["location_name","Brewery / venue"],["address","Street address"],["source_url","Official URL"]] as const).map(([field,label])=><label key={field} className="block text-sm">{label}<input required className={box+" mt-1"} value={selected[field]||""} onChange={e=>setSelected({...selected,[field]:e.target.value})}/></label>)}
 <label className="block text-sm">Category<select className={box+" mt-1"} value={selected.category} onChange={e=>setSelected({...selected,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
 <label className="block text-sm">Dates (YYYY-MM-DD, separated by commas)<input required className={box+" mt-1"} value={datesText} onChange={e=>setDatesText(e.target.value)}/></label>
 <div className="grid gap-3 sm:grid-cols-2"><label>Start time (optional)<input className={box} type="time" value={selected.start_time?.slice(0,5)||""} onChange={e=>setSelected({...selected,start_time:e.target.value})}/></label><label>End time (optional)<input className={box} type="time" value={selected.end_time?.slice(0,5)||""} onChange={e=>setSelected({...selected,end_time:e.target.value})}/></label></div>
 <label className="block text-sm">Description<textarea required rows={4} className={box+" mt-1"} value={selected.description} onChange={e=>setSelected({...selected,description:e.target.value})}/></label>
 {selected.id&&<label className="block text-sm">Replace flyer (JPG / PNG / WebP, max 5 MB)<input type="file" accept="image/png,image/jpeg,image/webp" className={box+" mt-1"} onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file)}}/></label>}
 <div className="flex gap-3"><button disabled={busy} className="rounded-full bg-[#edcf78] px-5 py-2 font-bold text-black">Save & publish</button><button type="button" className="rounded-lg border border-white/20 px-4 py-2" onClick={()=>setSelected(null)}>Cancel</button></div></form>}
 </div>}
 {tab==="submissions"&&<div className="mt-6 space-y-2">{submissions.map(sub=><div key={sub.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#1b1b18] p-4"><div><strong>{sub.event_name}</strong><p className="text-sm text-zinc-400">{sub.location_name} · {sub.dates?.join(", ")} · {sub.status}</p></div>{sub.status==="pending"&&<div className="flex gap-2"><button className="rounded-lg bg-green-800 px-4 py-2" onClick={()=>mutate({action:"approve",id:sub.id},"Event approved")}>Approve</button><button className="rounded-lg bg-red-900 px-4 py-2" onClick={()=>mutate({action:"reject",id:sub.id},"Event rejected")}>Reject</button></div>}</div>)}</div>}
 {tab==="sources"&&<div className="mt-6"><p className="mb-4 text-sm text-zinc-400">Hide or restore imported and manually curated events without changing GitHub. Hidden listings remain suppressed after the next automatic refresh.</p><div className="space-y-2">{catalog.filter(e=>!rows.some(r=>r.name===e.name&&r.dates?.[0]===e.date)).map(e=><div key={e.key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#1b1b18] p-4"><div><strong>{e.name}</strong><p className="text-sm text-zinc-400">{e.date} · {e.location}</p></div><button className="rounded-lg border border-white/20 px-4 py-2" onClick={()=>mutate({action:hidden.includes(e.key)?"show":"hide",key:e.key},hidden.includes(e.key)?"Listing restored":"Listing hidden")}>{hidden.includes(e.key)?"Restore":"Hide"}</button></div>)}</div></div>}
 </div>}
 {message&&<p role="status" className="mt-5 rounded-xl border border-[#edcf78]/30 bg-[#292518] p-3 text-sm text-[#edcf78]">{message}</p>}
 </div></main>;
}