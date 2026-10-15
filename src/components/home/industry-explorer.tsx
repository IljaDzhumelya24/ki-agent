"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";
import { SectionLabel } from "@/components/ui/section-label";

export function IndustryExplorer() {
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);

  return (
    <section id="industries" className="page-gutter bg-white py-[var(--section-space)]">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionLabel>03 / Branchen</SectionLabel>
          <h2 className="display-type max-w-[11ch] text-[clamp(4.2rem,8vw,8.6rem)] leading-[0.84] font-medium">
            Gebaut für den echten Betrieb.
          </h2>
        </div>

        <div className="mt-20 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {homeContent.industries.map((industry) => (
            <button
              type="button"
              key={industry.slug}
              onClick={() => setPlannedLabel(industry.name)}
              aria-label={`${industry.name}: Branchen-Seite in Vorbereitung`}
              data-scroll-reveal
              className="industry-card group flex min-h-[24rem] flex-col rounded-[1.6rem] border border-black/10 bg-[var(--paper)] p-5 text-left transition-[transform,background-color,color] duration-500 hover:-translate-y-2 hover:bg-black hover:text-white focus-visible:-translate-y-2 focus-visible:bg-black focus-visible:text-white md:min-h-[28rem]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] text-current opacity-45">{industry.index}</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
              </div>
              <div className="mt-auto">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] opacity-45">{industry.eyebrow}</p>
                <h3 className="display-type mt-4 text-[2.7rem] leading-[0.9]">{industry.name}</h3>
                <p className="mt-7 text-sm leading-6 opacity-72">{industry.problem}</p>
                <div className="mt-6 border-t border-current/15 pt-5 text-xs leading-5 opacity-55">{industry.workflow}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {plannedLabel && <PreparationNotice label={plannedLabel} onClose={() => setPlannedLabel(null)} />}
    </section>
  );
}
