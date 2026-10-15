import type { ReactNode } from "react";

import { SignalCoreFallback } from "@/components/three/signal-core-fallback";

export function HeroSection({ visual }: { visual?: ReactNode }) {
  return (
    <section
      id="top"
      className="relative isolate h-[100svh] min-h-[38rem] overflow-hidden bg-[#020304] text-white"
    >
      <div className="absolute inset-0">
        {visual ?? <SignalCoreFallback />}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,4,.54)_0%,transparent_25%,rgba(2,3,4,.18)_70%,rgba(2,3,4,.52)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-[var(--gutter)] pt-14">
        <h1
          aria-label="Keine Anfrage entkommt."
          className="hero-gravity-title display-type max-w-[11ch] text-center text-[clamp(4.25rem,10.5vw,12rem)] font-semibold leading-[0.74] tracking-[-0.09em] text-[#f5f0e7]"
        >
          <span className="hero-gravity-line hero-gravity-line--left" data-text="Keine Anfrage">
            Keine Anfrage
          </span>
          <span className="hero-gravity-line hero-gravity-line--right" data-text="entkommt.">
            entkommt.
          </span>
        </h1>
      </div>
    </section>
  );
}
