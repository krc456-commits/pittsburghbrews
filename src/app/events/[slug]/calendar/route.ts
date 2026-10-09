import { NextResponse } from "next/server";
import { findEvent, getCurrentEvents, eventUrl } from "@/data/eventDetails";
function safe(value: string) { return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, " ").replace(/,/g, "\\,").replace(/;/g, "\\;"); }
function nextDay(date: string) {
  const d = new Date(date + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0,10).replace(/-/g, "");
}
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = findEvent(await getCurrentEvents(), slug);
  if (!event) return new NextResponse("Event not found", { status: 404 });
  // Use a date-only calendar reminder rather than inventing start/end times.
  const start = event.startDate.replace(/-/g, "");
  const end = nextDay(event.endDate);
  const origin = new URL(_request.url).origin;
  const description = safe(event.description + " | Event time may not be verified. Check the official listing: " + event.url);
  const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Pittsburgh Brews//Events//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:"+safe(slug)+"@pittsburghbrews.com","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),"DTSTART;VALUE=DATE:"+start,"DTEND;VALUE=DATE:"+end,"SUMMARY:"+safe(event.name),"LOCATION:"+safe(event.location),"DESCRIPTION:"+description,"URL:"+origin+eventUrl(event),"END:VEVENT","END:VCALENDAR",""].join("\r\n");
  return new NextResponse(ics, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": "attachment; filename=\"pittsburgh-brews-event.ics\"", "Cache-Control": "no-store" } });
}
