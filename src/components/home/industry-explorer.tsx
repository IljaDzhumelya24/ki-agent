import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function IndustryExplorer() {
  const featured = homeContent.industries.slice(0, 4);
  const more = homeContent.industries.slice(4);

  return (
    <section id="industries" className="page-gutter bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionLabel>03 / Branchen</SectionLabel>
          <h2 className="display-type max-w-[13ch] text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.9] font-medium">
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

        <p className="mt-6 text-sm leading-6 text-[var(--graphite)]">
          Auch für {more.map((industry) => industry.name).join(", ")}.
        </p>
      </div>
    </section>
  );
}
