import type { Metadata } from "next";
import Link from "next/link";

import { HomeMotion } from "@/components/home/home-motion";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ChannelShowcase } from "@/components/solutions/channel-showcase";
import { WorkflowExplorer } from "@/components/solutions/workflow-explorer";

export const metadata: Metadata = {
  title: "Lösungen — KI-Agenten für deinen Betrieb",
  description: "Ein KI-Agent für Telefon, WhatsApp, Website und dein Team. Anfragen verstehen, Möglichkeiten prüfen und nächste Schritte erledigen.",
};

export default function SolutionsPage() {
  return (
    <>
      <HomeMotion />
      <SiteHeader initialTheme="light" currentPage="solutions" />
      <main>
        <section id="top" data-nav-theme="light" className="page-gutter relative isolate overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
          <div className="mx-auto grid max-w-[96rem] gap-12 pb-12 pt-32 md:gap-16 md:pb-20 md:pt-40 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:gap-[5vw]">
            <div className="flex flex-col items-start lg:pb-14">
              <div className="overflow-hidden pb-2">
                <h1 data-reveal-line className="display-type max-w-[11ch] text-[clamp(4rem,7.2vw,9rem)] font-medium leading-[0.89] tracking-[-0.075em]">
                  Nicht nur antworten.<br /><span className="text-[#929693]">Weiterbringen.</span>
                </h1>
              </div>
              <p data-scroll-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--graphite)] md:mt-14 md:text-xl">
                Eine Anfrage ist erst dann wirklich bearbeitet, wenn der nächste Schritt klar ist. Dein Agent hört zu, prüft Möglichkeiten und bringt Dinge in Bewegung – auf jedem Kanal.
              </p>
              <a href="#kanaele" className="mt-10 inline-flex h-12 items-center justify-center border border-black bg-black px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#303333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                Lösungen entdecken
              </a>
            </div>

            <div data-scroll-reveal className="solution-hero-board relative flex min-h-[30rem] flex-col overflow-hidden bg-[#101212] p-7 text-white sm:p-10 lg:min-h-[min(43rem,calc(100svh-11rem))] lg:p-12">
              <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/10" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
                <path className="solution-hero-path" d="M 580 -70 C 210 100 660 245 245 410 S 325 610 690 760" pathLength="1" stroke="currentColor" strokeWidth="1.4" />
                <path className="solution-hero-path solution-hero-path--late" d="M 650 10 C 280 170 650 330 360 480 S 370 650 720 800" pathLength="1" stroke="currentColor" strokeWidth="1" />
              </svg>
              <p className="relative max-w-[16ch] text-[clamp(1.7rem,2.4vw,3rem)] leading-[1.15] tracking-[-0.045em] text-white/80">
                „Kann ich morgen Vormittag vorbeikommen?“
              </p>
              <div className="relative mt-auto pt-20">
                <p className="display-type text-[clamp(2.2rem,3.5vw,4.3rem)] leading-none tracking-[-0.06em] text-white/45">Morgen.</p>
                <p className="display-type mt-1 text-[clamp(6rem,10vw,12rem)] leading-[0.85] tracking-[-0.1em]">10:30</p>
                <p className="mt-8 max-w-xs text-base leading-relaxed text-white/65">Ein freier Termin. Abgeglichen, bestätigt und für dein Team dokumentiert.</p>
              </div>
            </div>
          </div>
        </section>

        <ChannelShowcase />

        <WorkflowExplorer />

        <section id="contact" data-nav-theme="light" className="page-gutter bg-white py-28 text-[var(--ink)] md:py-40">
          <div className="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-end lg:gap-20">
            <h2 data-scroll-reveal className="display-type max-w-[14ch] text-[clamp(3.5rem,6.7vw,8rem)] font-medium leading-[0.9] tracking-[-0.07em]">
              Zeig uns den Moment, der heute liegen bleibt.
            </h2>
            <div data-scroll-reveal className="max-w-md lg:ml-auto">
              <p className="text-lg leading-relaxed text-[var(--graphite)]">In einer Demo zeigen wir dir, wie der Agent genau diesen Ablauf aufnehmen und weiterbringen kann.</p>
              <Link href="/kontakt" className="mt-9 inline-flex h-12 items-center justify-center border border-black bg-black px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-white transition-[background-color,color,transform] duration-300 hover:-translate-y-1 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
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
