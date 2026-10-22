import { MagneticLink } from "@/components/ui/magnetic-link";

export function FinalCta() {
  return (
    <section id="contact" className="page-gutter relative isolate overflow-hidden bg-black py-28 text-white md:py-40">
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full text-white/15 lg:block"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path d="M 1190 -90 C 1000 80 1110 170 1290 245 C 1530 345 1080 395 1125 525 C 1160 640 1390 630 1510 785" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="relative mx-auto max-w-[96rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end lg:gap-20">
          <h2 className="display-type max-w-[14ch] text-[clamp(3.75rem,7.2vw,8.5rem)] leading-[0.91] font-medium tracking-[-0.065em]">
            Während dein Team arbeitet, bleibt dein Betrieb erreichbar.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/65 lg:pb-3 lg:text-xl">
            Der Agent nimmt Anfragen auf, versteht das Anliegen und bringt den nächsten Schritt auf den Weg – am Telefon, per WhatsApp und auf deiner Website.
          </p>
        </div>
        <div className="mt-20 flex flex-col gap-7 border-t border-white/25 pt-7 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-white/65">
            Sieh in einer Live-Demo, wie das für deinen Betrieb aussieht.
          </p>
          <MagneticLink href="mailto:demo@placeholder.ai" tone="light" className="min-h-14 self-start px-8 text-base md:self-auto">
            Demo anfragen
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
