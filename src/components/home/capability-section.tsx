import { SectionLabel } from "@/components/ui/section-label";

const channels = ["Telefon", "WhatsApp", "Website"];
const destinations = ["Kalender", "CRM / Kasse", "Dein Team"];

export function CapabilitySection() {
  return (
    <section id="capabilities" className="page-gutter bg-[var(--paper)] pb-24 pt-2 text-[var(--ink)] md:pb-32 md:pt-4">
      <div className="mx-auto max-w-[96rem]">
        <div className="flex flex-wrap items-start justify-between gap-5 border-t border-black/20 pt-5">
          <SectionLabel>02 / Im Hintergrund</SectionLabel>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-black/45">
            Vom Kontakt in den Betrieb
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <h2 className="display-type max-w-[14ch] text-[clamp(3.5rem,6vw,6.6rem)] leading-[0.93] font-medium tracking-[-0.065em]">
            Ein Gespräch.<br />
            <span className="text-black/35">Ein nächster Schritt.</span>
          </h2>
          <p className="max-w-md text-base leading-8 text-[var(--graphite)] lg:pb-2">
            Eine gute Antwort ist erst der Anfang. Der Agent versteht das Anliegen, prüft die Möglichkeiten deines Betriebs und bringt die Aufgabe dorthin, wo sie erledigt wird.
          </p>
        </div>

        <div className="mt-12 grid border-y border-black/20 lg:grid-cols-[1fr_1.15fr_1fr]">
          <div className="flex flex-col px-1 py-9 lg:pr-10 lg:py-12">
            <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-black/45">
              <span>01 / Eingang</span><span>→</span>
            </div>
            <p className="display-type mt-12 text-[clamp(2rem,2.8vw,3.5rem)] leading-none tracking-[-0.05em]">Dort, wo Kunden sind.</p>
            <ul className="mt-auto pt-10" aria-label="Eingangskanäle">
              {channels.map((channel) => (
                <li key={channel} className="flex items-center justify-between border-t border-black/15 py-3 text-sm">
                  <span>{channel}</span><span className="font-mono text-black/35">↗</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative isolate flex min-h-[28rem] flex-col overflow-hidden bg-[#0b0c0c] p-7 text-white md:p-10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[7rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.13]" />
            <div className="relative flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/50">
              <span>02 / Dein Agent</span><span>● Aktiv</span>
            </div>
            <div className="relative mt-auto grid gap-4 pb-5">
              <p className="display-type text-[clamp(2.6rem,3.7vw,4.9rem)] leading-[0.95] tracking-[-0.06em]">
                Verstehen.<br />Prüfen.<br />Handeln.
              </p>
              <span className="mt-5 h-px bg-white/25" />
              <p className="max-w-xs text-sm leading-6 text-white/55">Innerhalb klarer Regeln. Mit dem Menschen im Loop, wenn es darauf ankommt.</p>
            </div>
          </div>

          <div className="flex flex-col px-1 py-9 lg:pl-10 lg:py-12">
            <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-black/45">
              <span>03 / Ergebnis</span><span>↗</span>
            </div>
            <p className="display-type mt-12 text-[clamp(2rem,2.8vw,3.5rem)] leading-none tracking-[-0.05em]">Dort, wo Arbeit passiert.</p>
            <ul className="mt-auto pt-10" aria-label="Ziele im Betrieb">
              {destinations.map((destination) => (
                <li key={destination} className="flex items-center justify-between border-t border-black/15 py-3 text-sm">
                  <span>{destination}</span><span className="font-mono text-black/35">↗</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--graphite)]">
          Keine zweite Datenwelt: Kalender, Kasse oder CRM bleiben führend. Was unklar oder kritisch ist, geht mit Kontext an dein Team.
        </p>
      </div>
    </section>
  );
}
