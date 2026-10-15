import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

import { homeContent } from "@/content/home";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/section-label";
import { SignalCoreLoader } from "@/components/three/signal-core-loader";
import { RevealText } from "@/components/ui/reveal-text";

export function HeroSection({ visual }: { visual?: ReactNode }) {
  return (
    <section id="top" className="page-gutter relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_70%_0%,rgba(0,0,0,0.06),transparent_42%)]" />
      <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-[96rem] grid-cols-1 items-center gap-8 pb-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-0">
        <div className="relative z-10 flex flex-col items-start pt-6 lg:pt-0">
          <SectionLabel>{homeContent.hero.eyebrow}</SectionLabel>
          <h1
            aria-label={homeContent.hero.title}
            className="display-type mt-6 max-w-[13ch] text-[clamp(4rem,8.4vw,9.4rem)] leading-[0.81] font-medium"
          >
            <RevealText>Ein Agent.</RevealText>
            <RevealText className="text-black/48">Jeder Kanal.</RevealText>
            <RevealText>Keine Anfrage verloren.</RevealText>
          </h1>
          <div className="mt-8 grid w-full gap-8 border-t border-[var(--line)] pt-5 sm:grid-cols-[1fr_auto] sm:items-end lg:max-w-[46rem]">
            <p className="max-w-[38rem] text-sm leading-7 text-[var(--graphite)] md:text-base">
              {homeContent.hero.body}
            </p>
            <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black/45 sm:block">
              Scroll / 01—09
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <MagneticLink href={homeContent.hero.actions[0].href}>
              {homeContent.hero.actions[0].label}
            </MagneticLink>
            <MagneticLink href={homeContent.hero.actions[1].href} tone="ghost">
              {homeContent.hero.actions[1].label}
            </MagneticLink>
          </div>
        </div>

        <div className="relative -mx-8 min-h-[24rem] lg:-ml-20 lg:mr-0 lg:min-h-[42rem]">
          <div className="absolute inset-0 grid place-items-center">{visual ?? <SignalCoreLoader />}</div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[96rem] flex-col border-t border-[var(--line)] py-4 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {homeContent.channels.map((channel) => (
            <div key={channel.id} className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-black" aria-hidden="true" />
              <span className="text-[0.67rem] font-semibold uppercase tracking-[0.08em]">{channel.name}</span>
            </div>
          ))}
        </div>
        <a href="#channels" className="mt-4 hidden items-center gap-3 text-xs font-semibold md:flex">
          System ansehen <ArrowDown className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
