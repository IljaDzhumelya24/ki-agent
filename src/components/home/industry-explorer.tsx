import { homeContent } from "@/content/home";

export function IndustryExplorer() {
  const featured = homeContent.industries.slice(0, 4);

  return (
    <section id="industries" className="page-gutter relative z-20 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <h2 className="display-type max-w-[13ch] text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.9] font-medium lg:col-start-2">
            Für Menschen im Betrieb. Nicht für Folien.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((industry) => (
            <article key={industry.slug} data-scroll-reveal className="flex min-h-64 flex-col bg-[var(--paper)] p-6 md:min-h-72">
              <span className="font-mono text-[0.6rem] text-black/45">{industry.index}</span>
              <div className="mt-auto">
                <h3 className="display-type text-[clamp(2rem,2.5vw,3rem)] leading-none">{industry.name}</h3>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--graphite)]">{industry.problem}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
