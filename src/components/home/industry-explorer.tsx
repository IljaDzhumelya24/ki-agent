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

        <div className="mt-16 border-t border-black/15 md:mt-24">
          {featured.map((industry) => (
            <article
              key={industry.slug}
              data-scroll-reveal
              className="group grid gap-7 border-b border-black/15 px-1 py-9 transition-[background-color,color,padding] duration-500 ease-out hover:bg-[#111313] hover:px-6 hover:text-white md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-12 md:px-6 md:py-12 md:hover:px-9"
            >
              <h3 className="display-type text-[clamp(2.75rem,5.2vw,6.25rem)] leading-[0.92] tracking-[-0.055em]">
                {industry.name}
              </h3>
              <div className="max-w-xl md:ml-auto md:w-full">
                <p className="text-lg leading-snug tracking-[-0.025em] md:text-xl">
                  {industry.problem}
                </p>
                <p className="mt-5 border-t border-black/15 pt-4 text-sm leading-relaxed text-[var(--graphite)] transition-colors duration-500 group-hover:border-white/25 group-hover:text-white/70 md:mt-7 md:pt-5 md:text-base">
                  {industry.workflow}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
