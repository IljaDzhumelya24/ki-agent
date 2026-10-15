import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function RoiSection() {
  return (
    <section id="roi" className="page-gutter relative overflow-hidden bg-[#dfe0dc] py-[var(--section-space)]">
      <div className="pointer-events-none absolute -right-44 top-0 size-[38rem] rounded-full border border-black/10 bg-[radial-gradient(circle_at_34%_28%,white,rgba(255,255,255,0.1)_38%,transparent_68%)]" />
      <div className="relative mx-auto max-w-[96rem]">
        <SectionLabel>04 / Wirkung</SectionLabel>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="display-type max-w-[10ch] text-[clamp(4.3rem,8.5vw,9rem)] leading-[0.82] font-medium">
            Wert, der sich messen lässt.
          </h2>
          <p className="max-w-lg text-base leading-8 text-[var(--graphite)] lg:justify-self-end">
            Nicht mehr KI um der KI willen. Gemessen werden angenommene Anfragen, abgeschlossene Buchungen, Übergaben und gesparte Zeit.
          </p>
        </div>

        <div className="mt-20 grid border-t border-black/20 md:grid-cols-3">
          {homeContent.roi.map((metric) => (
            <article key={metric.label} data-scroll-reveal className="border-b border-black/20 py-9 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <div className="display-type text-[clamp(5rem,11vw,10rem)] leading-none">{metric.value}</div>
              <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.09em]">{metric.label}</h3>
              <p className="mt-7 max-w-xs text-xs leading-6 text-black/52">{metric.qualifier}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
