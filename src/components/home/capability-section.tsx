import { ArrowDownRight } from "lucide-react";

import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function CapabilitySection() {
  return (
    <section id="capabilities" className="page-gutter bg-[var(--paper)] py-24 md:py-32">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <SectionLabel>02 / Der Unterschied</SectionLabel>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--graphite)]">
              Ein FAQ-Bot kann reden. Ein Agent wird erst wertvoll, wenn er kontrolliert etwas erledigen darf.
            </p>
          </div>
          <h2 className="display-type max-w-[11ch] text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.9] font-medium">
            Kein Bot. Ein System, das handelt.
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-3">
          {homeContent.capabilities.map((capability) => (
            <article key={capability.index} data-scroll-reveal className="group border-b border-[var(--line)] py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-black/45">{capability.index}</span>
                <ArrowDownRight className="size-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
              </div>
              <h3 className="display-type mt-10 text-3xl leading-none md:text-4xl">{capability.title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--graphite)]">{capability.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
