"use client";

import { useState } from "react";

const stages = [
  {
    title: "Verstehen.",
    description: "Aus einer freien Anfrage wird ein konkretes Anliegen – inklusive der Details, die für den nächsten Schritt zählen.",
    input: "„Morgen Vormittag wäre gut.“",
    result: "Ein Terminwunsch.",
    detail: "Der Agent erkennt Anliegen und Zeitfenster und fragt nach, wenn etwas fehlt.",
  },
  {
    title: "Abgleichen.",
    description: "Der Agent berücksichtigt dein Wissen, deine Regeln und – wo angebunden – die Verfügbarkeit in deinen Systemen.",
    input: "Morgen Vormittag.",
    result: "10:30 ist frei.",
    detail: "Ein möglicher Zeitpunkt, geprüft gegen den Kalender deines Betriebs.",
  },
  {
    title: "Erledigen.",
    description: "Freigegebene Schritte führt er aus. Alles andere gibt er mit dem bisherigen Kontext an dein Team weiter.",
    input: "10:30 passt.",
    result: "Termin bestätigt.",
    detail: "Der Kunde erhält die Antwort. Dein Team weiß, was passiert ist.",
  },
] as const;

export function WorkflowExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <section id="ablauf" data-nav-theme="light" className="page-gutter bg-[var(--paper)] py-24 text-[var(--ink)] md:py-36">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <h2 data-scroll-reveal className="display-type max-w-[13ch] text-[clamp(3.5rem,6.8vw,8rem)] font-medium leading-[0.9] tracking-[-0.07em]">
            Die Antwort ist erst der Anfang.
          </h2>
          <p data-scroll-reveal className="max-w-md text-lg leading-relaxed text-[var(--graphite)] lg:ml-auto lg:pb-2">
            Entscheidend ist, was danach passiert. Wähle einen Schritt und sieh, wie aus einer Anfrage eine Handlung wird.
          </p>
        </div>

        <div className="relative mt-16 lg:hidden">
          <span aria-hidden="true" className="absolute bottom-10 left-0 top-2 w-px bg-black/20" />
          {stages.map((stage) => (
            <article key={stage.title} data-scroll-reveal className="relative pb-20 pl-6 last:pb-0">
              <span aria-hidden="true" className="absolute left-0 top-5 h-px w-4 bg-black" />
              <h3 className="display-type text-[clamp(3rem,11vw,4.7rem)] leading-[0.92] tracking-[-0.065em]">{stage.title}</h3>
              <div className="mt-7 bg-[#111313] p-6 text-white">
                <p className="text-base leading-snug tracking-[-0.03em] text-white/60">{stage.input}</p>
                <strong className="display-type mt-8 block text-[clamp(2.6rem,10vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.065em]">{stage.result}</strong>
                <p className="mt-5 text-sm leading-relaxed text-white/65">{stage.detail}</p>
              </div>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--graphite)]">{stage.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-24 hidden gap-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="border-t border-black/20">
            {stages.map((stage, index) => (
              <button
                key={stage.title}
                type="button"
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="group block w-full border-b border-black/20 py-7 text-left transition-[padding] duration-500 hover:pl-3 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black md:py-9"
              >
                <span className={`display-type block text-[clamp(2.8rem,4.8vw,5.8rem)] leading-[0.95] tracking-[-0.06em] transition-[color,transform] duration-500 ${activeIndex === index ? "text-black" : "text-black/35 group-hover:text-black/80"}`}>
                  {stage.title}
                </span>
                <span className={`block max-w-lg overflow-hidden text-base leading-relaxed text-[var(--graphite)] transition-[max-height,margin,opacity] duration-500 md:text-lg ${activeIndex === index ? "mt-5 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
                  {stage.description}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div key={active.title} className="solution-panel-enter relative flex min-h-[25rem] flex-col justify-between overflow-hidden bg-[#111313] p-7 text-white sm:p-10 lg:min-h-[35rem] lg:p-12">
              <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/10" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
                <path d="M 660 -60 C 180 130 630 245 260 395 S 270 620 650 690" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <p className="relative max-w-[18ch] text-[clamp(1.45rem,2vw,2.4rem)] leading-snug tracking-[-0.035em] text-white/55">{active.input}</p>
              <div className="relative mt-16">
                <strong className="display-type block max-w-[12ch] text-[clamp(3.3rem,5vw,6.5rem)] font-medium leading-[0.93] tracking-[-0.065em]">{active.result}</strong>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-white/65 md:text-lg">{active.detail}</p>
              </div>
            </div>
          </div>
        </div>

        <div data-scroll-reveal className="mt-24 grid gap-7 border-t border-black/20 pt-10 md:mt-36 md:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] md:items-end md:gap-16 md:pt-14">
          <p className="display-type max-w-[13ch] text-[clamp(2.9rem,4.6vw,5.7rem)] leading-[0.94] tracking-[-0.06em]">Dein Betrieb bleibt das System.</p>
          <p className="max-w-md text-base leading-relaxed text-[var(--graphite)] md:ml-auto md:text-lg">
            Kalender, Kasse oder CRM bleiben führend. Der Agent nutzt nur die Informationen und Werkzeuge, die du freigibst – und übergibt, wenn ein Mensch übernehmen soll.
          </p>
        </div>
      </div>
    </section>
  );
}
