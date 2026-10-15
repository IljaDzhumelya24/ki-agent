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
      <div className="pointer-events-none absolute inset-x-0 top-[clamp(7rem,14.5vh,10rem)] z-10 px-[var(--gutter)]">
        <h1
          aria-label="Der Kunde wartet nicht. Wir auch nicht."
          className="hero-flow-title display-type mx-auto max-w-[15ch] text-center text-[clamp(3.4rem,7.3vw,8.25rem)] font-semibold leading-[0.8] tracking-[-0.085em] text-[#f5f0e7]"
        >
          <span className="block">Der Kunde wartet nicht</span>
          <span className="block">Wir auch nicht</span>
        </h1>
      </div>
    </section>
  );
}
