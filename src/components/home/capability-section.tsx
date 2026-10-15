import { ArrowDownRight, Check, X } from "lucide-react";

import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function CapabilitySection() {
  return (
    <section id="capabilities" className="page-gutter bg-[var(--paper)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 border-b border-[var(--line)] pb-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <SectionLabel>02 / Der Unterschied</SectionLabel>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--graphite)]">
              Ein FAQ-Bot kann reden. Ein Agent wird erst wertvoll, wenn er kontrolliert etwas erledigen darf.
            </p>
          </div>
          <h2 className="display-type max-w-[11ch] text-[clamp(4rem,8vw,8.6rem)] leading-[0.84] font-medium">
            Kein Bot. Ein System, das handelt.
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-black/10 bg-black/10 lg:grid-cols-2">
          <div className="bg-[#e6e6e1] p-7 md:p-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-black/45">FAQ-Bot</span>
              <X className="size-5 text-black/35" aria-hidden="true" />
            </div>
            <p className="display-type mt-24 max-w-[10ch] text-4xl leading-[0.95] text-black/45 md:text-6xl">Antwortet auf Fragen.</p>
          </div>
          <div className="bg-white p-7 md:p-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em]">Operational Agent</span>
              <Check className="size-5" aria-hidden="true" />
            </div>
            <p className="display-type mt-24 max-w-[11ch] text-4xl leading-[0.95] md:text-6xl">Bucht. Ändert. Sammelt. Übergibt.</p>
          </div>
        </div>

        <div className="mt-20 grid border-t border-[var(--line)] lg:grid-cols-3">
          {homeContent.capabilities.map((capability) => (
            <article key={capability.index} data-scroll-reveal className="group border-b border-[var(--line)] py-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-black/45">{capability.index}</span>
                <ArrowDownRight className="size-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
              </div>
              <h3 className="display-type mt-16 text-3xl leading-none md:text-4xl">{capability.title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--graphite)]">{capability.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
