"use client";

import { useEffect, useState } from "react";

export default function EventFlyer({ src, alt }: { src: string; alt: string }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  return (
    <>
      <button type="button" onClick={() => setExpanded(true)} aria-label="Enlarge event flyer" className="group block w-full cursor-zoom-in rounded-xl border border-black/10 bg-[#282620] p-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d6b00]">
        <img src={src} alt={alt} className="mx-auto max-h-[680px] w-auto max-w-full object-contain" />
        <span className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-sm font-black text-[#191815] group-hover:bg-[#edcf78]">Tap to enlarge flyer ↗</span>
      </button>
      {expanded && (
        <div role="dialog" aria-modal="true" aria-label="Enlarged event flyer" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-3 sm:p-6" onClick={() => setExpanded(false)}>
          <button type="button" autoFocus onClick={() => setExpanded(false)} className="mb-3 self-end rounded-full bg-white px-4 py-2 text-sm font-black text-black">Close ✕</button>
          <img src={src} alt={alt} onClick={event => event.stopPropagation()} className="max-h-[85vh] max-w-full object-contain" />
          <a href={src} target="_blank" rel="noopener noreferrer" onClick={event => event.stopPropagation()} className="mt-3 rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white">Open full-size image ↗</a>
        </div>
      )}
    </>
  );
}
