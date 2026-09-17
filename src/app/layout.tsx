import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
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
    <span className="flex items-center gap-3 sm:gap-4">
      <img
        src="/brand/yellow%20outline-bridge%20centered.png"
        alt=""
        className={
          footer
            ? "h-14 w-14 shrink-0 rounded-md object-cover sm:h-16 sm:w-16"
            : "h-11 w-11 shrink-0 rounded-md object-cover sm:h-13 sm:w-13 lg:h-14 lg:w-14"
        }
      />
      <span
        className={
          footer
            ? "whitespace-nowrap text-xl font-black tracking-[-0.03em] text-white sm:text-2xl"
            : "whitespace-nowrap text-lg font-black tracking-[-0.03em] text-white sm:text-2xl lg:text-[1.8rem]"
        }
      >
        PITTSBURGH BREWS
      </span>
    </span>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0b0a]/96 backdrop-blur-xl">
            <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-5 px-5 md:h-[90px] md:px-8">
              <Link href="/" aria-label="Pittsburgh Brews home" className="flex min-w-0 flex-1 items-center"><Brand /></Link>
              <nav className="hidden shrink-0 items-center gap-5 text-sm font-bold text-zinc-300 md:flex">
                {navItems.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-[var(--gold)]">{label}</Link>
                ))}
              </nav>
              <MobileNav />
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
