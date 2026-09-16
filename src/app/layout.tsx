import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pittsburgh Brews | Independent Pittsburgh Brewery Guide",
  description: "Find breweries, taprooms, patios, food, and local beer across Pittsburgh and Western Pennsylvania.",
};

const navItems = [
  ["Breweries", "/breweries"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Submit Update", "/submit"],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0b0a]/95 backdrop-blur-xl">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-5 md:px-8">
              <Link href="/" className="block shrink-0" aria-label="Pittsburgh Brews home">
                <img src="/brand/pittsburgh-brews-horizontal.svg" alt="Pittsburgh Brews" className="h-11 w-auto sm:h-12" />
              </Link>
              <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-300 md:flex">
                {navItems.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-[var(--gold)]">{label}</Link>
                ))}
              </nav>
              <Link href="/breweries" className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white md:hidden">
                Browse
              </Link>
            </div>
          </header>
          {children}
          <footer className="border-t border-white/8 bg-[#080808]">
            <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
              <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-end">
                <div>
                  <img src="/brand/pittsburgh-brews-horizontal.svg" alt="Pittsburgh Brews" className="h-16 w-auto max-w-full" />
                  <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">An independent guide for finding breweries, taprooms, patios, food, and good beer across Pittsburgh and Western Pennsylvania.</p>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-zinc-400 md:justify-end">
                  <Link href="/breweries" className="hover:text-white">Breweries</Link>
                  <Link href="/about" className="hover:text-white">About</Link>
                  <Link href="/submit" className="hover:text-white">Submit an update</Link>
                  <Link href="/credits" className="hover:text-white">Image credits</Link>
                </div>
              </div>
              <div className="mt-10 border-t border-white/8 pt-5 text-xs text-zinc-600">Pittsburgh Brews · Independently maintained · No paid placement</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
