import type { Metadata } from "next";
import Link from "next/link";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-black/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
              <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
                <span className="inline-block h-3 w-3 rotate-45 bg-[var(--gold)]" />
                <span>PITTSBURGH BREWS</span>
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
                <div className="font-bold text-white">Pittsburgh Brews</div>
                <p className="mt-2 max-w-md">An independent guide to breweries across Pittsburgh and Western Pennsylvania.</p>
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
