"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";

const channels = [
  {
    id: "telefon",
    name: "Telefon",
    title: "Jemand geht ran. Auch wenn gerade niemand kann.",
    description: "Der Agent nimmt den Anruf an, klärt das Anliegen und findet heraus, ob er direkt helfen oder an dein Team übergeben soll.",
    question: "Ich würde meinen Termin gern auf morgen verschieben.",
    result: "Termin geändert.",
    detail: "Der neue Zeitpunkt ist abgestimmt und im Kalender hinterlegt.",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    title: "Aus einer Nachricht wird ein klarer nächster Schritt.",
    description: "Keine endlosen Chats: Der Agent fragt gezielt nach, prüft Möglichkeiten und hält den Verlauf für dein Team nachvollziehbar.",
    question: "Habt ihr morgen Vormittag noch etwas frei?",
    result: "10:30 Uhr passt.",
    detail: "Der freie Termin ist gefunden und kann direkt bestätigt werden.",
  },
  {
    id: "website",
    name: "Website",
    title: "Interesse endet nicht beim Kontaktformular.",
    description: "Besucher bekommen eine konkrete Antwort. Der Agent erfasst, was sie brauchen, und bringt die Anfrage dorthin, wo sie bearbeitet wird.",
    question: "Kann ich ein Angebot für nächste Woche bekommen?",
    result: "Anfrage vorbereitet.",
    detail: "Bedarf und Kontaktdaten liegen für die weitere Bearbeitung bereit.",
  },
  {
    id: "team",
    name: "Dein Team",
    title: "Übergaben, mit denen man weiterarbeiten kann.",
    description: "Wenn ein Mensch entscheiden muss, kommt nicht nur eine Benachrichtigung an. Dein Team sieht das Anliegen und den bisherigen Verlauf.",
    question: "Das muss bitte jemand persönlich prüfen.",
    result: "Mit Kontext übergeben.",
    detail: "Das Team weiß, worum es geht und was bereits geklärt wurde.",
  },
] as const;

export function ChannelShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const active = channels[activeIndex];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % channels.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + channels.length) % channels.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = channels.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`channel-tab-${channels[nextIndex].id}`)?.focus();
  }

  return (
    <section id="kanaele" className="page-gutter bg-[#090b0b] py-24 text-white md:py-36">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <h2 data-scroll-reveal className="display-type max-w-[12ch] text-[clamp(3.7rem,7vw,8.5rem)] font-medium leading-[0.89] tracking-[-0.07em]">
            Vier Wege rein.<br />Ein Weg weiter.
          </h2>
          <p data-scroll-reveal className="max-w-md text-lg leading-relaxed text-white/60 lg:ml-auto lg:pb-2">
            Egal, wo sich ein Kunde meldet: Der Agent arbeitet mit demselben Wissen und denselben Regeln deines Betriebs.
          </p>
        </div>

        <div className="mt-12 border-t border-white/20 md:hidden">
          {channels.map((channel, index) => {
            const isOpen = mobileOpenIndex === index;
            return (
              <div key={channel.id} className="border-b border-white/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-channel-${channel.id}`}
                  onClick={() => setMobileOpenIndex(isOpen ? null : index)}
                  className="flex min-h-20 w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                >
                  <span className={`display-type text-[clamp(2rem,8vw,3rem)] leading-none tracking-[-0.055em] transition-colors ${isOpen ? "text-white" : "text-white/60"}`}>{channel.name}</span>
                  <span aria-hidden="true" className={`display-type text-3xl leading-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div id={`mobile-channel-${channel.id}`} className="solution-panel-enter pb-9">
                    <div className="bg-[var(--paper)] p-5 text-[var(--ink)]">
                      <p className="text-lg leading-snug tracking-[-0.03em]">„{channel.question}“</p>
                      <div className="mt-6 border-l-2 border-black pl-4">
                        <strong className="display-type block text-[clamp(2.1rem,8vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.06em]">{channel.result}</strong>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--graphite)]">{channel.detail}</p>
                      </div>
                    </div>
                    <h3 className="display-type mt-7 text-[clamp(2.15rem,8vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.06em]">{channel.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-white/65">{channel.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div role="tablist" aria-label="Kanäle auswählen" className="mt-24 hidden grid-cols-4 border-t border-white/20 md:grid">
          {channels.map((channel, index) => (
            <button
              key={channel.id}
              id={`channel-tab-${channel.id}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="channel-panel"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover)").matches) setActiveIndex(index);
              }}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              tabIndex={activeIndex === index ? 0 : -1}
              className={`group relative min-h-24 border-b border-white/20 px-2 py-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white md:min-h-32 md:px-5 ${activeIndex === index ? "text-white" : "text-white/35 hover:text-white/75"}`}
            >
              <span className="display-type inline-block text-[clamp(1.75rem,3vw,3.1rem)] leading-none tracking-[-0.055em] transition-transform duration-300 group-hover:-translate-y-1">{channel.name}</span>
              {activeIndex === index && <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-white" aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div key={active.id} id="channel-panel" role="tabpanel" aria-labelledby={`channel-tab-${active.id}`} className="solution-panel-enter hidden gap-14 pt-14 md:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24 lg:pt-20">
          <div>
            <div>
              <h3 className="display-type max-w-[14ch] text-[clamp(3rem,5.4vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">{active.title}</h3>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 md:mt-10 md:text-xl">{active.description}</p>
            </div>
          </div>
          <div className="solution-channel-preview relative flex min-h-[27rem] flex-col justify-between overflow-hidden bg-[var(--paper)] p-6 text-[var(--ink)] sm:p-9 lg:min-h-[36rem] lg:p-12">
            <svg className="solution-preview-line pointer-events-none absolute -right-24 top-12 h-[80%] w-[90%] opacity-[0.08]" viewBox="0 0 500 600" fill="none" aria-hidden="true">
              <path d="M 450 -50 C 100 100 600 210 210 380 S 300 580 540 680" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="relative max-w-sm text-[clamp(1.5rem,2.5vw,2.8rem)] font-medium leading-[1.18] tracking-[-0.045em]">„{active.question}“</p>
            <div className="relative ml-auto max-w-[25rem] border-l-2 border-black pl-5 sm:pl-7">
              <strong className="display-type block text-[clamp(2.5rem,4vw,4.7rem)] font-medium leading-[0.95] tracking-[-0.06em]">{active.result}</strong>
              <p className="mt-5 max-w-xs text-base leading-relaxed text-[var(--graphite)]">{active.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
