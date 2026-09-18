type SubmitPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = params.error === "1";

  return (
    <main className="bg-[#0b0b0a]">
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="eyebrow">Keep it current</div>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
              Submit an Update
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
              Found a new brewery, closure, event, address change, bad link, or something else we should fix? Send it over.
            </p>
          </div>

          <form
            action="/api/submit-update"
            method="POST"
            className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-[#141413] p-5 sm:p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-white">Your name</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
                  placeholder="Name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-white">Email <span className="font-normal text-zinc-500">(optional)</span></span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-white">What are you updating?</span>
                <select
                  name="type"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none focus:border-[var(--gold)]"
                >
                  <option value="" disabled>Select one</option>
                  <option>New brewery or taproom</option>
                  <option>Brewery information correction</option>
                  <option>Closure</option>
                  <option>Beer event</option>
                  <option>Hours change</option>
                  <option>Website or link correction</option>
                  <option>Photo or logo update</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-black text-white">Brewery / event name</span>
                <input
                  name="subject"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
                  placeholder="Example: Balance Brewing"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-white">What should we know?</span>
              <textarea
                name="details"
                required
                rows={6}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
                placeholder="Include the correction, new information, event details, address, dates, etc."
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-white">Source link <span className="font-normal text-zinc-500">(optional)</span></span>
              <input
                name="sourceUrl"
                type="url"
                inputMode="url"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d0d0c] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--gold)]"
                placeholder="https://brewerysite.com/event"
              />
            </label>

            <div className="hidden" aria-hidden="true">
              <label>
                Leave this blank
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-full bg-[var(--gold)] px-6 py-3.5 font-black text-black transition hover:brightness-105"
              >
                Send update
              </button>

              <div
                aria-live="polite"
                className={sent ? "text-sm font-bold text-emerald-400" : error ? "text-sm font-bold text-red-400" : "text-sm text-zinc-500"}
              >
                {sent
                  ? "Thanks — your update was sent to Pittsburgh Brews."
                  : error
                    ? "We couldn't send that update. Please try again."
                    : "Submissions are reviewed before anything is changed on the site."}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
