"use client";

import { useEffect, useRef, useState } from "react";

export const capabilityStages = [
  {
    title: "Verstehen.",
    detail: "Aus einer freien Nachricht werden Anliegen, Zeitwunsch und die Details, die wirklich zählen.",
    phoneLabel: "ANLIEGEN ERKANNT",
    phoneExample: "Termin morgen · vormittags",
    phoneStatus: "KONTEXT ERFASST",
  },
  {
    title: "Abgleichen.",
    detail: "Der Agent berücksichtigt dein Wissen, deine Regeln und die Verfügbarkeit in bestehenden Systemen.",
    phoneLabel: "MIT DEM BETRIEB ABGEGLICHEN",
    phoneExample: "Freier Slot · 10:30 Uhr",
    phoneStatus: "KALENDER GEPRÜFT",
  },
  {
    title: "Handeln.",
    detail: "Er bestätigt einen Schritt, dokumentiert ihn oder übergibt mit dem gesamten Kontext an dein Team.",
    phoneLabel: "SCHRITT AUSGEFÜHRT",
    phoneExample: "Termin bestätigt · Team informiert",
    phoneStatus: "ERLEDIGT UND ÜBERGEBEN",
  },
];

type CapabilitySectionProps = {
  onStageChange?: (stage: number) => void;
  onVisibilityChange?: (visible: boolean) => void;
};

export function CapabilitySection({ onStageChange, onVisibilityChange }: CapabilitySectionProps = {}) {
  const [activeStage, setActiveStage] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px", threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onStageChange?.(activeStage);
  }, [activeStage, onStageChange]);
  useEffect(() => {
    onVisibilityChange?.(isInView);
  }, [isInView, onVisibilityChange]);

  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveStage((current) => (current + 1) % capabilityStages.length), 4600);
    return () => window.clearTimeout(timer);
  }, [activeStage, isInView]);

  return (
    <section ref={sectionRef} id="capabilities" className="page-gutter relative bg-[var(--paper)] py-24 text-[var(--ink)] lg:min-h-[105svh] lg:py-[14svh]">
      <div className="mx-auto grid max-w-[96rem] lg:grid-cols-[minmax(0,52%)_minmax(0,48%)]">
        <div className="lg:pr-[clamp(3rem,6vw,8rem)]">
          <h2 className="display-type max-w-[11ch] text-[clamp(3.2rem,4.8vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.065em]">
            Die Antwort war erst der Anfang.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-[var(--graphite)] lg:mt-10">
            Dein Agent hört nicht bei einer Nachricht auf. Er versteht das Anliegen, gleicht es mit deinem Betrieb ab und führt freigegebene Schritte aus. Wenn etwas unklar ist, übernimmt dein Team mit dem gesamten Kontext.
          </p>
          <div className="mt-14 border-t border-black/20 pt-6 lg:mt-20" aria-label="Schritte des Agenten">
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {capabilityStages.map((stage, index) => (
                <button
                  key={stage.title}
                  type="button"
                  onClick={() => setActiveStage(index)}
                  aria-pressed={activeStage === index}
                  className={`relative min-h-14 pb-4 text-left text-[clamp(0.88rem,1.2vw,1.1rem)] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${activeStage === index ? "text-black" : "text-black/40 hover:text-black/75"}`}
                >
                  {stage.title}
                  <span className="absolute inset-x-0 bottom-0 h-px bg-black/15" aria-hidden="true" />
                  {isInView && activeStage === index && <span key={`progress-${activeStage}`} className="capability-step-progress absolute inset-x-0 bottom-0 h-px bg-black" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <p key={activeStage} className="capability-active-content mt-10 max-w-xl min-h-32 text-[clamp(1.35rem,1.8vw,1.8rem)] leading-[1.35] tracking-[-0.025em] lg:mt-14">
              {capabilityStages[activeStage].detail}
            </p>
          </div>
        </div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
