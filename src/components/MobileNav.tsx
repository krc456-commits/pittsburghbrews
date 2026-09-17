"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  ["Breweries", "/breweries"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Submit an update", "/submit"],
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-site-nav"
        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-black text-[var(--gold)] transition hover:bg-white/5"
      >
        <span>Menu</span>
        <span aria-hidden="true" className="text-base leading-none">{open ? "×" : "☰"}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[82px] z-40 bg-black/40"
          />
          <nav
            id="mobile-site-nav"
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#141413] shadow-2xl"
          >
            {navItems.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-5 py-4 text-sm font-black transition hover:bg-white/5 hover:text-[var(--gold)] ${
                  index === 0 ? "text-[var(--gold)]" : "text-zinc-200"
                } ${index > 0 ? "border-t border-white/8" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
