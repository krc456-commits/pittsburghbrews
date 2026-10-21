import Link from "next/link";

export default async function EventReviewResult({searchParams}:{searchParams:Promise<{status?:string}>}){
 const {status}=await searchParams;
 const cases:Record<string,{title:string,message:string}> = {
  approved:{title:"Event approved",message:"The event has been published on PittsburghBrews.com. No additional deployment is needed."},
  rejected:{title:"Event rejected",message:"The submission was rejected and will not appear on PittsburghBrews.com."},
  already:{title:"Already reviewed",message:"This submission has already been reviewed. No additional changes were made."},
  invalid:{title:"Invalid review link",message:"This review link is invalid or incomplete."},
  missing:{title:"Submission not found",message:"The event submission could not be found."},
  error:{title:"Review failed",message:"An error occurred while processing this request. Check the event's review status before trying again."}
 };
 const result=cases[status||""]||cases.invalid;
 return <main className="min-h-[65vh] bg-[#0b0b0a] px-5 py-16 text-white"><section className="mx-auto max-w-xl rounded-2xl border border-white/15 bg-[#171714] p-8"><p className="font-bold text-[#edcf78]">Pittsburgh Brews</p><h1 className="mt-3 text-3xl font-black">{result.title}</h1><p className="mt-4 leading-7 text-zinc-300">{result.message}</p><Link href="/events" className="mt-7 inline-block rounded-full bg-[#edcf78] px-6 py-3 font-black text-black">View Events →</Link></section></main>;
}