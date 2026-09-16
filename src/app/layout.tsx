import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pittsburgh Brews | Pittsburgh Brewery Guide",
  description: "A local guide to breweries, taprooms, patios, food, and beer across Pittsburgh and Western Pennsylvania.",
};

const navItems = [
  ["Breweries", "/breweries"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Submit Update", "/submit"],
] as const;

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <img
      src="/brand/pittsburgh-brews-header.svg"
      alt="Pittsburgh Brews"
      className={
        footer
          ? "h-16 w-auto max-w-[440px] object-contain sm:h-20 sm:max-w-[520px]"
          : "h-14 w-auto max-w-[300px] object-contain sm:h-16 sm:max-w-[380px] lg:h-[72px] lg:max-w-[430px]"
      }
    />
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0b0a]/96 backdrop-blur-xl">
            <div className="mx-auto flex h-[92px] max-w-7xl items-center justify-between gap-5 px-5 md:h-[104px] md:px-8">
              <Link href="/" aria-label="Pittsburgh Brews home" className="flex min-w-0 items-center"><Brand /></Link>
              <nav className="hidden shrink-0 items-center gap-6 text-sm font-bold text-zinc-300 md:flex">
                {navItems.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-[var(--gold)]">{label}</Link>
                ))}
              </nav>
              <Link href="/breweries" className="shrink-0 text-sm font-black text-[var(--gold)] md:hidden">Breweries</Link>
            </div>
          </header>
          {children}
          <footer className="border-t border-white/8 bg-[#080808]">
            <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
              <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-end">
                <div>
                  <Brand footer />
                  <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">A local, independent guide to Pittsburgh breweries — useful whether you are trying somewhere new or checking in on an old favorite.</p>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-zinc-400 md:justify-end">
                  <Link href="/breweries" className="hover:text-white">Breweries</Link>
                  <Link href="/events" className="hover:text-white">Events</Link>
                  <Link href="/about" className="hover:text-white">About</Link>
                  <Link href="/submit" className="hover:text-white">Submit an update</Link>
                </div>
              </div>
              <div className="mt-9 border-t border-white/8 pt-5 text-xs text-zinc-600">Pittsburgh Brews · Independently maintained · No paid placement · <Link href="/credits" className="hover:text-zinc-300">Image credits</Link></div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
