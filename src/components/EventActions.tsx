"use client";
import { useState } from "react";
export default function EventActions({ title, url, calendarUrl }: { title: string; url: string; calendarUrl: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const absolute = new URL(url, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url: absolute });
        return;
      }
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
    } catch { /* User cancelled or clipboard unavailable. */ }
  }
  return <div className="flex flex-wrap gap-2">
    <a href={calendarUrl} className="inline-flex items-center justify-center rounded-xl bg-[#8d6b00] px-4 py-2.5 text-sm font-black text-white hover:bg-[#6f5500]">＋ Add to calendar</a>
    <button type="button" onClick={share} className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-black text-[#191815] hover:bg-[#f4ebd8]">{copied ? "✓ Link copied" : "↗ Share"}</button>
  </div>;
}
