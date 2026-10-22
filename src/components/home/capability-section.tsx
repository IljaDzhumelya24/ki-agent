"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    title: "Verstehen.",
    detail: "Aus einer freien Nachricht werden Anliegen, Zeitwunsch und die Details, die wirklich zählen.",
  },
  {
    title: "Abgleichen.",
    detail: "Der Agent berücksichtigt dein Wissen, deine Regeln und die Verfügbarkeit in bestehenden Systemen.",
  },
  {
    title: "Handeln.",
    detail: "Er bestätigt einen Schritt, dokumentiert ihn oder übergibt mit dem gesamten Kontext an dein Team.",
  },
];

export function CapabilitySection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveStage((current) => (current + 1) % stages.length), 4600);
    return () => window.clearTimeout(timer);
  }, [activeStage, isInView]);

  return (
    <section ref={sectionRef} id="capabilities" className="page-gutter bg-[var(--paper)] pb-24 pt-12 text-[var(--ink)] md:pb-32 md:pt-20">
      <div className="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-0">
        <div className="flex flex-col justify-between lg:pr-20 lg:py-10">
          <h2 className="display-type max-w-[10ch] text-[clamp(3.7rem,6vw,7rem)] leading-[0.93] font-medium tracking-[-0.07em]">
            Die Antwort war erst der Anfang.
          </h2>
          <p className="mt-10 max-w-md border-t border-black/20 pt-6 text-base leading-8 text-[var(--graphite)] lg:mt-16">
            Dein Agent hört nicht bei einer Nachricht auf. Er versteht das Anliegen, gleicht es mit deinem Betrieb ab und führt freigegebene Schritte aus. Wenn etwas unklar ist, übernimmt dein Team mit dem gesamten Kontext.
          </p>
        </div>

        <div className="flex min-h-[35rem] flex-col justify-between overflow-hidden bg-[#101111] px-7 py-9 text-[#f4f3ef] md:px-12 md:py-12 lg:px-14">
          <div className="flex items-center justify-between border-b border-white/20 pb-6">
            <span className="display-type text-xl tracking-[-0.04em]">So wird aus Kontakt Handlung.</span>
            <span className="size-2 rounded-full bg-white/85" aria-hidden="true" />
          </div>

          <div key={activeStage} className="capability-active-content py-14">
            <h3 className="display-type text-[clamp(3rem,6.4vw,7.5rem)] leading-[0.85] tracking-[-0.075em]">
              {stages[activeStage].title}
            </h3>
            <p className="mt-10 max-w-md text-base leading-7 text-white/65">
              {stages[activeStage].detail}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6" aria-label="Schritte des Agenten">
            {stages.map((stage, index) => (
              <button
                key={stage.title}
                type="button"
                onClick={() => setActiveStage(index)}
                aria-pressed={activeStage === index}
                className={`group relative min-h-12 pb-3 text-left text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${activeStage === index ? "text-white" : "text-white/40 hover:text-white/80"}`}
              >
                {stage.title}
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/20" aria-hidden="true" />
                {isInView && activeStage === index && <span key={`progress-${activeStage}`} className="capability-step-progress absolute inset-x-0 bottom-0 h-px bg-white" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
