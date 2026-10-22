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
          <div className="max-w-md lg:pb-3">
            <p className="text-lg leading-relaxed text-white/65 lg:text-xl">
              Der Agent nimmt Anfragen auf, versteht das Anliegen und bringt den nächsten Schritt auf den Weg – am Telefon, per WhatsApp und auf deiner Website.
            </p>
            <a
              href="mailto:demo@placeholder.ai"
              className="mt-9 inline-flex h-12 items-center justify-center border border-white bg-white px-7 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-black transition-[background-color,box-shadow] duration-300 hover:bg-[#e8e8e4] hover:shadow-[0_0_26px_rgba(114,190,255,.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Demo anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
