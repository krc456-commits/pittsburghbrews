import Link from "next/link";
import { breweries } from "@/data/breweries";

const primaryActions = [
  {
    label: "Find a brewery",
    detail: "Browse the full Pittsburgh-area brewery directory.",
    href: "/breweries",
    icon: "↗",
  },
  {
    label: "Browse by area",
    detail: "Start with Pittsburgh, North, East, South, West, or beyond.",
    href: "/breweries",
    icon: "◎",
  },
  {
    label: "Beer events",
    detail: "See local festivals and beer-focused events.",
    href: "/events",
    icon: "◫",
  },
  {
    label: "Patios & food",
    detail: "Find breweries with outdoor seating or a full kitchen.",
    href: "/breweries?feature=outdoor",
    icon: "☀",
  },
] as const;

const quickLinks = [
  ["Pittsburgh", "/breweries?area=Pittsburgh"],
  ["North", "/breweries?area=North"],
  ["East", "/breweries?area=East"],
  ["Full kitchen", "/breweries?food=Full%20kitchen"],
  ["Dog friendly", "/breweries?feature=dog"],
] as const;

const featured = [...breweries].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);

export default function Home() {
  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8 bg-[radial-gradient(circle_at_80%_10%,rgba(255,207,36,.08),transparent_28rem),#0b0b0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <div className="eyebrow">Pittsburgh Brews</div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
              Pittsburgh beer, made easier.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Find breweries, taprooms, food, patios, and local beer events around Pittsburgh and Western Pennsylvania.
            </p>
          </div>

          <div className="mt-10">
            <div className="text-sm font-black uppercase tracking-[0.12em] text-zinc-500">What are you looking for?</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {primaryActions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-xl border border-white/10 bg-[#141413] p-5 transition hover:border-[var(--gold)]/50 hover:bg-[#181817]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xl font-black text-white">{item.label}</div>
                    <div className="text-xl text-[var(--gold)]">{item.icon}</div>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-zinc-500">{item.detail}</div>
                  <div className="mt-6 text-sm font-black text-zinc-300 transition group-hover:text-[var(--gold)]">Open →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#10100f]">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-600">Quick browse</span>
            {quickLinks.map(([label, href]) => (
              <Link key={label} href={href} className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-sm font-black text-zinc-300 transition hover:border-[var(--gold)]/40 hover:text-[var(--gold)]">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.12em] text-zinc-600">Recently verified</div>
              <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">A few places to start</h2>
            </div>
            <Link href="/breweries" className="text-sm font-black text-[var(--gold)]">View all →</Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {featured.map((brewery) => (
              <Link key={brewery.slug} href={`/breweries?q=${encodeURIComponent(brewery.name)}`} className="rounded-xl border border-white/8 bg-[#131312] p-5 transition hover:border-white/20">
                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--gold)]">{brewery.neighborhood}</div>
                <div className="mt-2 text-xl font-black text-white">{brewery.name}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag">{brewery.food}</span>
                  {brewery.outdoor && <span className="tag">Patio</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111110]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-sm font-bold text-white">Pittsburgh Brews is independently maintained.</div>
            <div className="mt-1 text-sm text-zinc-600">Details, background, and how the guide stays current live on the About page.</div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/about" className="text-white hover:text-[var(--gold)]">About →</Link>
            <Link href="/submit" className="text-zinc-400 hover:text-white">Submit an update →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
