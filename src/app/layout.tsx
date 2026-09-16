import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pittsburgh Brews",
  description: "An independent guide to breweries across Pittsburgh and Western Pennsylvania.",
};

const navItems = [
  ["Breweries", "/breweries"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Submit Update", "/submit"],
] as const;

const logoBase64 = readFileSync(
  join(process.cwd(), "public", "brand", "pittsburgh-brews-horizontal.webp"),
  "utf8",
).trim();

const logoSrc = `data:image/webp;base64,${logoBase64}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-black/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-8">
              <Link href="/" aria-label="Pittsburgh Brews home" className="shrink-0">
                <span className="flex items-center rounded-md bg-white px-2.5 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt="Pittsburgh Brews"
                    className="h-9 w-auto object-contain sm:h-10"
                  />
                </span>
              </Link>
              <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
                {navItems.map(([label, href]) => (
                  <Link key={href} href={href} className="transition hover:text-[var(--gold)]">{label}</Link>
                ))}
              </nav>
            </div>
          </header>
          {children}
          <footer className="border-t border-[var(--border)] bg-black">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-zinc-400 md:grid-cols-2 md:px-8">
              <div>
                <Link href="/" aria-label="Pittsburgh Brews home" className="inline-flex rounded-md bg-white px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt="Pittsburgh Brews"
                    className="h-12 w-auto object-contain"
                  />
                </Link>
                <p className="mt-4 max-w-md">An independent guide to breweries across Pittsburgh and Western Pennsylvania.</p>
                <Link href="/credits" className="mt-3 inline-block text-xs font-bold text-zinc-500 hover:text-[var(--gold)]">Image credits & licensing</Link>
              </div>
              <div className="md:text-right">
                <Link href="/submit" className="text-white hover:text-[var(--gold)]">Know something changed? Submit an update.</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
