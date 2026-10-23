import type { Metadata } from "next";
import Link from "next/link";

import { HomeMotion } from "@/components/home/home-motion";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ValueCalculator } from "@/components/pricing/value-calculator";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: "Preise — KI-Agenten für deinen Betrieb",
  description:
    "Beispielpakete für den KI-Agenten und ein interaktiver Rechner für den möglichen Wert liegengebliebener Anfragen.",
};

export default function PricingPage() {
  return (
    <>
      <HomeMotion />
      <SiteHeader initialTheme="light" currentPage="pricing" />
      <main>
        <section id="top" data-nav-theme="light" className="page-gutter relative overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
          <svg aria-hidden="true" className="pricing-hero-lines pointer-events-none absolute -right-[16%] top-0 h-full w-[78%] text-black/15" viewBox="0 0 1000 820" preserveAspectRatio="xMidYMid slice" fill="none">
            <path d="M 1120 -110 C 640 90 1110 230 650 420 S 510 650 970 890" stroke="currentColor" strokeWidth="1" />
            <path d="M 1240 -60 C 750 120 1200 270 760 470 S 610 700 1060 930" stroke="currentColor" strokeWidth="1" />
            <path className="pricing-hero-trace" d="M 1120 -110 C 640 90 1110 230 650 420 S 510 650 970 890" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="relative mx-auto flex max-w-[96rem] flex-col justify-between pb-12 pt-36 sm:pt-40 lg:min-h-[88svh] lg:pb-16 lg:pt-44">
            <div className="overflow-hidden pb-5">
              <h1 data-reveal-line className="display-type max-w-[13ch] text-[clamp(3.6rem,7.7vw,9.6rem)] font-medium leading-[0.88] tracking-[-0.075em]">
                Die teuerste Anfrage ist die, <span className="text-[#929693]">die niemand annimmt.</span>
              </h1>
            </div>
            <div className="mt-16 border-t border-black/25 pt-7 sm:mt-20">
              <p data-scroll-reveal className="max-w-[36rem] text-lg leading-relaxed text-[var(--graphite)] sm:text-xl">
                Ein Agent kostet Geld. Eine Anfrage, die liegen bleibt, möglicherweise auch. Rechne mit deinen Zahlen und finde danach den passenden Einstieg.
              </p>
              <Link
                href="/kontakt"
                className="mt-8 inline-flex h-12 items-center justify-center border border-black bg-black px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-white transition-[background-color,color] duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>

        <section id="rechner" data-nav-theme="light" className="page-gutter bg-white py-16 text-[var(--ink)] sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[96rem]">
            <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end">
              <h2 data-scroll-reveal className="display-type max-w-[13ch] text-[clamp(2.7rem,6vw,7rem)] leading-[0.95] tracking-[-0.065em] sm:leading-[0.92]">
                Mach den Wert sichtbar.
              </h2>
              <p data-scroll-reveal className="max-w-md text-base leading-relaxed text-[var(--graphite)] lg:ml-auto lg:text-lg">
                Keine Fantasiezahlen von uns: Gib ein, wie viele Anfragen du heute nicht erreichst und was ein Auftrag bei dir wert ist.
              </p>
            </div>
            <div data-scroll-reveal>
              <ValueCalculator />
            </div>
          </div>
        </section>

        <section className="page-gutter overflow-hidden bg-[#0b0d0d] py-24 text-white sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[96rem]">
            <h2 data-scroll-reveal className="display-type max-w-[15ch] text-[clamp(3.3rem,6.6vw,8rem)] leading-[0.92] tracking-[-0.07em]">
              Erreichbar sein ist gut. <span className="text-white/45">Etwas daraus machen ist besser.</span>
            </h2>
            <div className="mt-16 grid gap-8 border-t border-white/25 pt-7 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)]">
              <p data-scroll-reveal className="max-w-xl text-xl leading-relaxed text-white/75 sm:text-2xl">
                Der Agent soll nicht einfach Gespräche sammeln. Er soll Anliegen verstehen, Möglichkeiten prüfen und einen nächsten Schritt erledigen.
              </p>
              <p data-scroll-reveal className="max-w-md text-base leading-relaxed text-white/50 lg:justify-self-end lg:text-lg">
                Ob daraus mehr Buchungen oder Entlastung entstehen, misst du an deinen echten Abläufen – nicht an einer versprochenen Zahl auf dieser Seite.
              </p>
            </div>
          </div>
        </section>

        <section id="pakete" data-nav-theme="light" className="page-gutter bg-[var(--paper)] py-20 text-[var(--ink)] sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[96rem]">
            <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end">
              <h2 data-scroll-reveal className="display-type max-w-[13ch] text-[clamp(3.2rem,6vw,7rem)] leading-[0.92] tracking-[-0.065em]">
                Starte dort, wo es zählt.
              </h2>
              <p data-scroll-reveal className="max-w-md text-base leading-relaxed text-[var(--graphite)] lg:ml-auto lg:text-lg">
                Ein Kanal, das gesamte Kundengespräch oder individuelle Abläufe. Der Einstieg richtet sich nach deinem Engpass.
              </p>
            </div>

            <div className="space-y-3">
              {homeContent.packages.map((pack) => (
                <article key={pack.name} data-scroll-reveal className={`pricing-package group grid gap-8 border px-6 py-9 transition-[background-color,transform] duration-500 hover:-translate-y-1 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-12 lg:px-12 ${pack.featured ? "border-[#101212] bg-[#101212] text-white" : "border-black/15 bg-white text-[var(--ink)]"}`}>
                  <div>
                    <h3 className="display-type text-[clamp(2.8rem,4vw,5rem)] leading-[0.9] tracking-[-0.06em]">{pack.name}</h3>
                    <p className={`mt-5 max-w-xs text-base leading-relaxed ${pack.featured ? "text-white/65" : "text-[var(--graphite)]"}`}>{pack.summary}</p>
                  </div>
                  <div>
                    <p className="display-type text-[clamp(3.6rem,5vw,6rem)] leading-none tracking-[-0.065em]">{pack.price}</p>
                    <p className={`mt-2 text-sm ${pack.featured ? "text-white/65" : "text-[var(--graphite)]"}`}>pro Monat</p>
                    <p className="mt-7 text-sm">{pack.setup}</p>
                  </div>
                  <div className="flex flex-col">
                    <ul className={`space-y-3 border-t pt-5 text-sm leading-relaxed sm:text-base ${pack.featured ? "border-white/25" : "border-black/20"}`}>
                      {pack.features.map((feature) => (
                        <li key={feature} className="flex gap-4"><span aria-hidden="true">↗</span><span>{feature}</span></li>
                      ))}
                    </ul>
                    <a href={`mailto:demo@placeholder.ai?subject=${encodeURIComponent(`Paket ${pack.name} besprechen`)}`} className={`mt-9 inline-flex min-h-12 w-fit items-center justify-center border px-6 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${pack.featured ? "border-white bg-white text-black hover:bg-transparent hover:text-white focus-visible:outline-white" : "border-black bg-black text-white hover:bg-white hover:text-black focus-visible:outline-black"}`}>
                      Paket besprechen
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-3xl text-sm leading-relaxed text-[var(--graphite)]">
              Die genannten Preise sind unverbindliche Beispiele aus der bestehenden Paketübersicht. Endgültiger Leistungsumfang, Nutzung und Einrichtung werden im individuellen Angebot geklärt.
            </p>
          </div>
        </section>

        <section id="contact" className="page-gutter bg-[#0b0d0d] py-24 text-white sm:py-32 lg:py-40">
          <div className="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-20">
            <h2 data-scroll-reveal className="display-type max-w-[13ch] text-[clamp(3.4rem,6.5vw,8rem)] leading-[0.9] tracking-[-0.07em]">
              Lass uns über deinen Betrieb sprechen. Nicht über eine Preisliste.
            </h2>
            <div data-scroll-reveal className="max-w-md lg:ml-auto">
              <p className="text-lg leading-relaxed text-white/65">Wir schauen uns deinen größten Engpass an und zeigen dir, welches Paket und welcher Ablauf sinnvoll sein könnten.</p>
              <Link href="/kontakt" className="mt-9 inline-flex h-12 items-center justify-center border border-white bg-white px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-black transition-[background-color,color,transform] duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
