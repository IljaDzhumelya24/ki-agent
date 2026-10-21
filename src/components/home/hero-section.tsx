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
      <div className="pointer-events-none absolute left-[var(--gutter)] right-[var(--gutter)] top-[34%] z-10 md:left-[50vw] md:top-[34%]">
        <h1
          aria-label="KI, die zuhört, versteht und handelt."
          className="hero-flow-title text-center text-[clamp(4rem,7.4vw,10rem)] font-medium leading-[0.82] md:text-left"
        >
          <span className="block">KI, die zuhört,</span>
          <span className="block">versteht</span>
          <span className="block">und handelt.</span>
        </h1>
      </div>
      <p className="absolute bottom-7 left-[var(--gutter)] z-10 flex max-w-[min(22rem,calc(100vw-2rem))] items-start gap-3 font-mono text-[0.72rem] font-medium uppercase leading-[1.55] tracking-[0.045em] text-white/90 sm:bottom-10 sm:text-[0.82rem]">
        <span aria-hidden="true" className="mt-[0.38rem] size-2 shrink-0 bg-white" />
        KI-Agenten, die Telefonate, WhatsApp-Nachrichten und Website-Anfragen rund um die Uhr verstehen, bearbeiten und direkt in deinen Betrieb bringen.
      </p>
      <span className="hero-thread-out" aria-hidden="true" />
    </section>
  );
}
