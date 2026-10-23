import type { Metadata } from "next";
import Link from "next/link";

import { HomeMotion } from "@/components/home/home-motion";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: "Branchen — KI-Agenten für deinen Alltag",
  description:
    "Wie ein KI-Agent Gastronomie, Beauty, Gesundheit, Handwerk und weitere lokale Betriebe bei Anfragen und Abläufen entlasten kann.",
};

export default function IndustriesPage() {
  return (
    <>
      <HomeMotion />
      <SiteHeader currentPage="industries" />
      <main>
        <section
          id="top"
          className="page-gutter relative overflow-hidden bg-[#0b0d0d] text-white"
        >
          <svg
            aria-hidden="true"
            className="industry-hero-lines"
            viewBox="0 0 900 750"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <path id="industry-flow-one" d="M 1020 -85 C 690 95 870 195 620 310 S 370 575 850 820" />
            <path id="industry-flow-two" d="M 1130 -55 C 760 120 960 240 700 355 S 440 630 930 850" />
            <path id="industry-flow-three" d="M 1240 -10 C 850 160 1050 280 780 405 S 530 680 1010 890" />
            <use href="#industry-flow-one" className="industry-hero-trace industry-hero-trace--one" />
            <use href="#industry-flow-two" className="industry-hero-trace industry-hero-trace--two" />
            <use href="#industry-flow-three" className="industry-hero-trace industry-hero-trace--three" />
          </svg>
          <div className="relative z-10 mx-auto flex max-w-[96rem] flex-col justify-between pb-10 pt-32 sm:pt-40 lg:min-h-[82svh] lg:pb-12 lg:pt-44">
            <div className="overflow-hidden pb-5">
              <h1
                data-reveal-line
                className="display-type max-w-[15ch] text-[clamp(3.7rem,8vw,10rem)] font-medium leading-[0.86] tracking-[-0.075em]"
              >
                Voller Betrieb.<br />
                <span className="text-white/60">Keine Anfrage verpasst.</span>
              </h1>
            </div>

            <div className="mt-16 grid gap-8 border-t border-white/30 pt-7 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
              <p
                data-scroll-reveal
                className="max-w-[37rem] text-lg leading-relaxed text-white/75 sm:text-xl"
              >
                Wenn dein Team mitten in der Arbeit ist, übernimmt der Agent die Anfrage – vom ersten Kontakt bis zum nächsten sinnvollen Schritt.
              </p>
              <a
                href="#bereiche"
                data-smooth-section-link
                data-scroll-reveal
                className="group inline-flex w-fit items-center gap-5 text-base text-white transition-colors duration-300 hover:text-white/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:justify-self-end"
              >
                Branchen entdecken
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-xl leading-none transition-[transform,border-color] duration-300 group-hover:translate-y-1 group-hover:border-white">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="bereiche"
          data-nav-theme="light"
          className="page-gutter bg-[var(--paper)] py-20 text-[var(--ink)] sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-[96rem]">
            <div className="grid gap-5 pb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] md:items-end md:gap-16 md:pb-16">
              <h2
                data-scroll-reveal
                className="display-type max-w-[13ch] text-[clamp(2.9rem,5.2vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.06em]"
              >
                Acht Branchen. Acht echte Engpässe.
              </h2>
              <p
                data-scroll-reveal
                className="max-w-md text-base leading-relaxed text-[var(--graphite)] md:ml-auto md:text-lg"
              >
                Finde deinen Betrieb: der Moment, in dem etwas liegen bleibt, und was der Agent daraus machen kann.
              </p>
            </div>

            <div className="grid border-l border-t border-black/15 md:grid-cols-2">
              {homeContent.industries.map((industry) => (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  data-scroll-reveal
                  className="group flex min-h-[22rem] scroll-mt-24 flex-col border-b border-r border-black/15 bg-white/45 px-6 py-7 transition-colors duration-500 hover:bg-[#111313] hover:text-white sm:min-h-[24rem] sm:px-9 sm:py-9 lg:px-11 lg:py-10"
                >
                  <h3 className="display-type max-w-[14ch] text-[clamp(2.4rem,3.25vw,4rem)] font-medium leading-[0.96] tracking-[-0.055em]">
                    {industry.name}
                  </h3>

                  <p className="mt-8 max-w-[31rem] text-[clamp(1.15rem,1.45vw,1.55rem)] leading-snug tracking-[-0.025em] sm:mt-10">
                    {industry.problem}
                  </p>

                  <p className="mt-auto max-w-[32rem] border-t border-black/15 pt-5 text-base leading-relaxed text-[var(--graphite)] transition-colors duration-500 group-hover:border-white/25 group-hover:text-white/70 sm:pt-6">
                    {industry.workflow}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="page-gutter bg-[#0b0d0d] py-24 text-white sm:py-28 lg:py-36"
        >
          <div className="mx-auto grid max-w-[96rem] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:items-end lg:gap-20">
            <h2
              data-scroll-reveal
              className="display-type max-w-[14ch] text-[clamp(3.1rem,5.7vw,6.8rem)] font-medium leading-[0.94] tracking-[-0.065em]"
            >
              Dein Betrieb ist der Maßstab.
            </h2>
            <div data-scroll-reveal className="max-w-lg lg:ml-auto">
              <p className="text-base leading-relaxed text-white/65 sm:text-lg">
                Zeig uns, wo Anfragen heute liegen bleiben. In der Demo schauen wir uns einen Ablauf für deinen Betrieb an.
              </p>
              <Link
                href="/kontakt"
                className="mt-8 inline-flex h-12 items-center justify-center border border-white bg-white px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-black transition-[background-color,color,transform] duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
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
