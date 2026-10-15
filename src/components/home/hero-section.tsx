import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

import { homeContent } from "@/content/home";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SignalCoreLoader } from "@/components/three/signal-core-loader";
import { RevealText } from "@/components/ui/reveal-text";

export function HeroSection({ visual }: { visual?: ReactNode }) {
  return (
    <section
      id="top"
      className="page-gutter editorial-grid relative isolate min-h-[100svh] overflow-hidden bg-cover bg-center bg-no-repeat pt-20 text-white md:pt-24 lg:h-[100svh] lg:min-h-0"
      style={{ backgroundImage: "url('/images/agent-signal-hero.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,5,.9)_0%,rgba(2,4,5,.66)_38%,rgba(2,4,5,.16)_74%,rgba(2,4,5,.34)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="mx-auto max-w-[108rem] lg:flex lg:min-h-0 lg:h-full lg:flex-col">
        <div className="relative grid min-h-[calc(100svh-11rem)] grid-cols-1 gap-7 py-7 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-0 lg:py-6">
          <div className="relative z-10 flex flex-col justify-between lg:col-span-8 lg:pr-12">
            <p className="max-w-[25rem] text-xs leading-5 text-white/66 md:text-sm md:leading-6">
              KI-Infrastruktur für Betriebe, die erreichbar sein wollen, auch wenn niemand am Bildschirm sitzt.
            </p>
          <h1
            aria-label={homeContent.hero.title}
            className="display-type relative z-10 mt-14 max-w-[11ch] text-[clamp(3.8rem,7.1vw,9rem)] leading-[0.77] font-medium tracking-[-0.075em] lg:mt-0"
          >
            <RevealText>Ein Agent.</RevealText>
            <RevealText className="text-white/42">Jeder Kanal.</RevealText>
            <RevealText>Keine Anfrage verloren.</RevealText>
          </h1>
          <div className="mt-12 grid w-full max-w-[52rem] gap-8 border-t border-white/20 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-[38rem] text-sm leading-7 text-white/68 md:text-base">
              {homeContent.hero.body}
            </p>
            <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/42 sm:block">
              Scroll / 01—09
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 pb-1">
            <MagneticLink href={homeContent.hero.actions[0].href} tone="light">
              {homeContent.hero.actions[0].label}
            </MagneticLink>
            <MagneticLink
              href={homeContent.hero.actions[1].href}
              tone="ghost"
              className="!border-white/35 !bg-white/10 !text-white hover:!bg-white hover:!text-black"
            >
              {homeContent.hero.actions[1].label}
            </MagneticLink>
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden border border-white/15 bg-black/10 lg:col-span-4 lg:my-2 lg:min-h-0 lg:border-0 lg:bg-transparent">
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent_80%)] lg:hidden" />
          <div className="absolute inset-0 grid place-items-center lg:hidden">{visual ?? <SignalCoreLoader />}</div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/48">
            <span>Live / 24:7</span>
            <span className="max-w-[8rem] text-right leading-4">Ein System. Vier Eingangstüren.</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[108rem] shrink-0 flex-col border-t border-white/20 py-4 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {homeContent.channels.map((channel) => (
            <div key={channel.id} className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-white" aria-hidden="true" />
              <span className="text-[0.67rem] font-semibold uppercase tracking-[0.08em] text-white/86">{channel.name}</span>
            </div>
          ))}
        </div>
        <a href="#channels" className="mt-4 hidden items-center gap-3 text-xs font-semibold text-white md:flex">
          System ansehen <ArrowDown className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      </div>
    </section>
  );
}
