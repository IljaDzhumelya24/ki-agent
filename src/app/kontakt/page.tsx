import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontakt — PLACEHOLDER/AI",
  description: "Schreib uns, wo dein Betrieb Unterstützung braucht. Eine kurze Nachricht reicht für den ersten Schritt.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader initialTheme="light" currentPage="contact" />
      <main>
        <section id="contact" data-nav-theme="light" className="page-gutter relative isolate min-h-dvh overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
          <svg aria-hidden="true" className="pointer-events-none absolute -right-[22%] top-[-25%] -z-10 hidden h-[130%] w-[75%] text-black/15 lg:block" viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice" fill="none">
            <path className="contact-trace" d="M1030 -120C425 87 1024 290 508 470S310 739 975 1017" pathLength="1" stroke="currentColor" strokeWidth="1" />
            <path className="contact-trace contact-trace-delayed" d="M1090 -15C517 182 1108 375 574 555S365 832 1045 1090" pathLength="1" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="relative mx-auto grid min-h-dvh max-w-[96rem] grid-rows-[1fr_auto] gap-10 pb-7 pt-28 sm:pt-32 lg:gap-8 lg:pt-24">
            <div className="grid items-center gap-12 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-20 lg:py-8">
              <div className="contact-copy max-w-[54rem]">
                <h1 className="display-type max-w-[12ch] text-[clamp(3.5rem,6.4vw,8rem)] leading-[0.93] tracking-[-0.07em]">
                  Was soll in deinem Betrieb <span className="text-[#616767]">besser laufen?</span>
                </h1>
                <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-[var(--graphite)] sm:text-lg">
                  Erzähl uns, welche Anfragen oder Abläufe dich Zeit kosten. Wir schauen mit dir, wo ein Agent wirklich helfen kann.
                </p>
              </div>

              <div className="contact-form-intro w-full max-w-[42rem] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:justify-self-end lg:px-12 lg:py-12">
                <h2 className="display-type text-[clamp(2.5rem,3.1vw,4rem)] leading-[0.96] tracking-[-0.06em]">Schreib uns.</h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--graphite)]">Ein paar Sätze reichen für den Anfang.</p>
                <ContactForm />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/20 pt-5 text-sm">
              <Link href="/preise" className="text-[var(--graphite)] transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                ← Zurück zu den Preisen
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
