import { NextResponse } from "next/server";
export const runtime="nodejs";

function get(data:FormData,key:string,max=3000){const v=data.get(key);return typeof v==="string"?v.trim().slice(0,max):""}
function html(s:string){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]||c))}
function isValidSource(value:string){try{const url=new URL(value);return (url.protocol==="https:"||url.protocol==="http:")&&!!url.hostname&&url.hostname.includes(".")&&!url.username&&!url.password}catch{return false}}

export async function POST(request:Request){
try{
const d=await request.formData();
if(get(d,"company"))return NextResponse.json({ok:true});

const name=get(d,"name",120),email=get(d,"email",200),event=get(d,"eventName",180),location=get(d,"location",240),address=get(d,"address",300),category=get(d,"category",60),description=get(d,"description"),sourceRaw=get(d,"sourceUrl",1000),source=/^https?:\/\//i.test(sourceRaw)?sourceRaw:"https://"+sourceRaw,schedule=get(d,"scheduleType",20);
const start=get(d,"startTime",10),end=get(d,"endTime",10);
let dates:unknown;try{dates=JSON.parse(get(d,"dates",5000))}catch{return NextResponse.json({error:"Invalid schedule"},{status:400})}
if(!name||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)||!event||!location||!address||!description||!isValidSource(source)||!Array.isArray(dates)||dates.length<1||dates.length>120||!dates.every(x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x))||!["Beer Event","Festival","Holiday themed","Food trucks","Live music","Trivia & games","Beer garden","Oktoberfest","Meetup / Social event"].includes(category))return NextResponse.json({error:"Please check the event details, street address, category, dates, and official link."},{status:400});

const supabaseUrl=process.env.SUPABASE_URL,gateway=process.env.EVENT_SUBMISSION_GATEWAY_SECRET;
if(!supabaseUrl||!gateway)return NextResponse.json({error:"Submission storage is not configured"},{status:503});

let image:undefined|{filename:string;mime:string;base64:string};
const flyer=d.get("flyer");
if(flyer instanceof File&&flyer.size>0){
 if(flyer.size>5*1024*1024||!["image/jpeg","image/png","image/webp"].includes(flyer.type))return NextResponse.json({error:"Your flyer must be a PNG, JPG, or WebP image no larger than 5 MB."},{status:400});
 const buf=Buffer.from(await flyer.arrayBuffer());
 const png=buf.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),jpeg=buf[0]===255&&buf[1]===216&&buf[2]===255,webp=buf.toString("ascii",0,4)==="RIFF"&&buf.toString("ascii",8,12)==="WEBP";
 if(!(flyer.type==="image/png"&&png||flyer.type==="image/jpeg"&&jpeg||flyer.type==="image/webp"&&webp))return NextResponse.json({error:"The attached image could not be verified. Try saving it as a new PNG or JPG."},{status:400});
 image={filename:flyer.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(0,100),mime:flyer.type,base64:buf.toString("base64")};
}

const stored=await fetch(`${supabaseUrl}/functions/v1/event-submit`,{
 method:"POST",
 headers:{"Content-Type":"application/json","x-pb-gateway":gateway},
 body:JSON.stringify({submitterName:name,submitterEmail:email,eventName:event,locationName:location,address,category,scheduleType:schedule,dates,startTime:start||null,endTime:end||null,description,sourceUrl:source,image})
});
const storedResult=await stored.json().catch(()=>({}));
if(!stored.ok)return NextResponse.json({error:typeof storedResult.error==="string"?storedResult.error:"The submission could not be saved."},{status:502});

const key=process.env.RESEND_API_KEY;
if(!key)return NextResponse.json({error:"Email not configured"},{status:503});
const fields=[["Event",event],["Submitted by",name+" ("+email+")"],["Venue",location],["Street address",address],["Category",category],["Schedule type",schedule],["Event dates",(dates as string[]).join(", ")],["Times",start+"–"+end],["Description",description],["Source",source]];
const actions=`<div style="margin:28px 0;display:flex;gap:12px;flex-wrap:wrap"><a href="${html(storedResult.approveUrl||"")}" style="background:#2e7d32;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">Approve event</a><a href="${html(storedResult.rejectUrl||"")}" style="background:#9f2d2d;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">Reject event</a></div>`;
const body="<h2>Pittsburgh Brews event submission</h2><p><b>Awaiting your review.</b> Approving publishes it automatically; no GitHub or Vercel step is needed.</p>"+actions+fields.map(([label,value])=>"<p><b>"+html(label)+":</b> "+html(value)+"</p>").join("");
const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.UPDATE_FROM_EMAIL||"Pittsburgh Brews <contact@3xnorth.com>",to:[process.env.UPDATE_SUBMISSION_EMAIL||"contact@3xnorth.com"],reply_to:email,subject:"[Event review] "+event,html:body})});
if(!response.ok){const reason=await response.text();console.error("Resend event notification failed",response.status,reason.slice(0,2000));return NextResponse.json({error:"The event was saved, but the review email could not be sent. Contact Pittsburgh Brews so it can be reviewed."},{status:502})}
const receiptBody=`<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;color:#20201d"><p style="font-weight:800;color:#8d6b00">Pittsburgh Brews</p><h1 style="font-size:25px">We received your event submission</h1><p>Hi ${html(name)},</p><p>Thanks for submitting <strong>${html(event)}</strong> to Pittsburgh Brews. Your event is <strong>pending review</strong> and is not published yet.</p><p><strong>Event:</strong> ${html(event)}<br><strong>Venue:</strong> ${html(location)}<br><strong>Date(s):</strong> ${html((dates as string[]).join(", "))}</p><p>We review submissions before adding them to the site. You don't need to do anything else right now.</p><p>— Pittsburgh Brews</p></div>`;
const receipt=await fetch("https://api.resend.com/emails",{
 method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},
 body:JSON.stringify({from:process.env.UPDATE_FROM_EMAIL||"Pittsburgh Brews <contact@3xnorth.com>",to:[email],subject:"We received your Pittsburgh Brews event submission",html:receiptBody})
});
if(!receipt.ok){const reason=await receipt.text();console.error("Submitter confirmation email failed",receipt.status,reason.slice(0,2000));return NextResponse.json({ok:true,confirmationSent:false})}
return NextResponse.json({ok:true,confirmationSent:true});
}catch(error){console.error("Event submission failed",error);return NextResponse.json({error:"The submission could not be processed. Please try again."},{status:500})}
}
