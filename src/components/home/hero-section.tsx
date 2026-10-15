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
    </section>
  );
}
