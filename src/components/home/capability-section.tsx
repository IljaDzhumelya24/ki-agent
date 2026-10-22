const operations = [
  {
    number: "01",
    title: "Anfrage aufnehmen",
    detail: "Telefon, WhatsApp oder Website – der Kontakt geht nicht verloren.",
  },
  {
    number: "02",
    title: "Kontext prüfen",
    detail: "Anliegen, Betriebswissen, Regeln und Verfügbarkeit greifen ineinander.",
  },
  {
    number: "03",
    title: "Schritt auslösen",
    detail: "Buchen, dokumentieren oder mit allen Details an dein Team übergeben.",
  },
];

export function CapabilitySection() {
  return (
    <section id="capabilities" className="page-gutter bg-[var(--paper)] pb-24 pt-12 text-[var(--ink)] md:pb-32 md:pt-20">
      <div className="mx-auto grid max-w-[96rem] border-y border-black/15 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-between py-10 lg:py-16 lg:pr-20">
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-black/45">02 / Hinter der Antwort</span>
            <h2 className="display-type mt-10 max-w-[11ch] text-[clamp(3.7rem,6.2vw,7.2rem)] leading-[0.92] font-medium tracking-[-0.07em]">
              Die Antwort ist nicht das Ergebnis.
            </h2>
          </div>
          <div className="mt-14 max-w-md">
            <p className="text-base leading-8 text-[var(--graphite)]">
              Ein Agent wird erst dann wertvoll, wenn aus einer Anfrage ein sinnvoller nächster Schritt wird – innerhalb deiner Regeln und in den Systemen, die dein Betrieb bereits nutzt.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/15 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-black/50">
              <span>Kalender</span><span>CRM / Kasse</span><span>Team</span>
            </div>
          </div>
        </div>

        <div className="relative isolate flex flex-col overflow-hidden bg-[#101111] px-7 py-8 text-[#f4f3ef] md:px-10 md:py-10 lg:px-14">
          <div className="flex items-center justify-between border-b border-white/20 pb-6 font-mono text-[0.65rem] uppercase tracking-[0.17em] text-white/50">
            <span>Ein verbundener Ablauf</span>
            <span className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-white" /> System bereit</span>
          </div>

          <div className="flex-1">
            {operations.map((operation) => (
              <div key={operation.number} className="grid grid-cols-[2.6rem_1fr] gap-5 border-b border-white/15 py-7 md:py-9">
                <span className="pt-1 font-mono text-[0.65rem] text-white/40">{operation.number}</span>
                <div>
                  <h3 className="display-type text-[clamp(2rem,3vw,3.3rem)] leading-none tracking-[-0.055em]">{operation.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/55">{operation.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <span className="font-mono text-[0.63rem] uppercase tracking-[0.14em] text-white/45">Kein paralleles System.</span>
            <span className="display-type text-2xl tracking-[-0.05em]">Dein Betrieb bleibt führend. ↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
