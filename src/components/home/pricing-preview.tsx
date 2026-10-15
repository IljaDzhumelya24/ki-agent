import { Check } from "lucide-react";

import { homeContent } from "@/content/home";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/section-label";

export function PricingPreview() {
  return (
    <section id="pricing" className="page-gutter bg-white py-[var(--section-space)]">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel>06 / Pakete</SectionLabel>
            <p className="mt-8 max-w-md text-sm leading-7 text-[var(--graphite)]">Der sinnvolle Einstieg hängt vom größten Engpass ab - nicht von der maximalen Zahl an Funktionen.</p>
          </div>
          <h2 className="display-type max-w-[11ch] text-[clamp(4rem,8vw,8.4rem)] leading-[0.84] font-medium">Ein Einstieg, der mitwächst.</h2>
        </div>

        <div className="mt-20 grid items-stretch gap-4 lg:grid-cols-3">
          {homeContent.packages.map((pack) => (
            <article
              key={pack.name}
              aria-label={`${pack.name} Paket`}
              data-scroll-reveal
              className={`flex min-h-[37rem] flex-col border p-6 md:p-8 ${pack.featured ? "border-black bg-black text-white lg:-translate-y-7" : "border-black/10 bg-[var(--paper)]"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] opacity-52">{pack.name}</span>
                {pack.featured && <span className="rounded-full bg-white px-3 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-black">Empfohlen</span>}
              </div>
              <div className="mt-16">
                <span className="display-type text-6xl leading-none md:text-7xl">{pack.price}</span>
                <span className="ml-2 text-xs opacity-45">/ Monat</span>
              </div>
              <p className="mt-5 text-sm font-semibold">{pack.setup} einmalig</p>
              <p className="mt-5 max-w-xs text-sm leading-6 opacity-58">{pack.summary}</p>
              <ul className="mt-10 space-y-4 border-t border-current/15 pt-7">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm"><Check className="size-4 opacity-55" aria-hidden="true" />{feature}</li>
                ))}
              </ul>
              <p className="mt-auto pt-10 text-[0.62rem] leading-5 opacity-45">{pack.qualifier}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <MagneticLink href="#contact" tone="ghost">Passendes Paket finden</MagneticLink>
        </div>
      </div>
    </section>
  );
}
