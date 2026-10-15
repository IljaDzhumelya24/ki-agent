import { ArrowDown } from "lucide-react";

import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

export function ProcessSection() {
  return (
    <section id="process" className="page-gutter bg-[var(--paper)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionLabel>05 / Einführung</SectionLabel>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--graphite)]">Der Agent startet nicht mit Technik, sondern mit den echten Abläufen, Grenzen und Systemen des Betriebs.</p>
          </div>
          <h2 className="display-type max-w-[11ch] text-[clamp(4rem,8vw,8.5rem)] leading-[0.84] font-medium">Von der ersten Frage bis zum Go-live.</h2>
        </div>

        <ol className="mt-20 border-t border-[var(--line)]">
          {homeContent.process.map((step) => (
            <li
              key={step.index}
              aria-label={`Prozessschritt ${step.index}: ${step.title}`}
              data-scroll-reveal
              className="group grid gap-5 border-b border-[var(--line)] py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
            >
              <span className="font-mono text-[0.65rem] text-black/42">{step.index}</span>
              <div className="grid gap-2 md:grid-cols-[0.7fr_1fr] md:items-center">
                <h3 className="display-type text-3xl md:text-4xl">{step.title}</h3>
                <p className="max-w-xl text-sm leading-6 text-[var(--graphite)]">{step.description}</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full border border-black/15 transition-colors group-hover:bg-black group-hover:text-white">
                <ArrowDown className="size-4" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
