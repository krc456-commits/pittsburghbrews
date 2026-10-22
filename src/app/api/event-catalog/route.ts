import {NextResponse} from "next/server";
import {getCurrentEvents,eventSlug} from "@/data/eventDetails";
export const dynamic="force-dynamic";
export async function GET(){
 const events=await getCurrentEvents(true);
 return NextResponse.json({events:events.map(e=>({key:eventSlug(e),name:e.name,date:e.startDate,location:e.location,category:e.category}))},{headers:{"Cache-Control":"no-store"}});
}