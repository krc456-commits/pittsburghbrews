import type { BeerEvent } from "@/data/events";

type Row = {
  id:string; name:string; location_name:string; address:string; category:BeerEvent["category"];
  schedule_type:"single"|"range"|"weekly"|"specific"; dates:string[]; start_time:string|null; end_time:string|null;
  description:string; source_url:string; image_url:string|null;
};

function fmtTime(value:string|null){
  if(!value)return "";
  const [h,m]=value.split(":").map(Number);
  const d=new Date(Date.UTC(2000,0,1,h,m));
  return new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",timeZone:"UTC"}).format(d);
}
function prettyDate(row:Row){
  const dates=[...(row.dates||[])].sort();
  if(!dates.length)return "";
  const dateFmt=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"});
  const a=dateFmt.format(new Date(dates[0]+"T12:00:00Z"));
  const b=dateFmt.format(new Date(dates[dates.length-1]+"T12:00:00Z"));
  const times=[fmtTime(row.start_time),fmtTime(row.end_time)].filter(Boolean).join("–");
  const datePart=dates.length===1?a:(row.schedule_type==="specific"||row.schedule_type==="weekly"?dates.map(d=>dateFmt.format(new Date(d+"T12:00:00Z"))).join(", "):a+" – "+b);
  return times?datePart+" · "+times:datePart;
}
export async function getApprovedSubmittedEvents():Promise<BeerEvent[]>{
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return [];
  try{
    const response=await fetch(`${url}/rest/v1/published_events?select=id,name,location_name,address,category,schedule_type,dates,start_time,end_time,description,source_url,image_url&order=published_at.desc`,{headers:{apikey:key},cache:"no-store"});
    if(!response.ok){console.error("Approved event fetch failed",response.status,await response.text());return []}
    const rows=await response.json() as Row[];
    return rows.map(row=>({
      name:row.name,
      date:prettyDate(row),
      startDate:[...(row.dates||[])].sort()[0],
      endDate:[...(row.dates||[])].sort().at(-1)!,
      occurrences:(row.schedule_type==="specific"||row.schedule_type==="weekly")&&row.dates.length>1?[...row.dates].sort():undefined,
      location:`${row.location_name} · ${row.address}`,
      category:row.category,
      description:row.description,
      url:row.source_url,
      image:row.image_url?{url:row.image_url,alt:`Official submitted event artwork for ${row.name}`}:undefined,
    }));
  }catch(error){console.error("Approved event fetch failed",error);return []}
}
