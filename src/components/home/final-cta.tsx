import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/section-label";

export function FinalCta() {
  return (
    <section id="contact" className="page-gutter relative isolate overflow-hidden bg-black py-[var(--section-space)] text-white">
      <div className="cta-orb pointer-events-none absolute -right-[14rem] top-1/2 size-[44rem] -translate-y-1/2 rounded-full" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(circle_at_80%_50%,black,transparent_54%)]" />
      <div className="relative mx-auto max-w-[96rem]">
        <SectionLabel>04 / Nächster Schritt</SectionLabel>
        <h2 className="display-type mt-10 max-w-[10ch] text-[clamp(4.6rem,10.6vw,11.8rem)] leading-[0.78] font-medium tracking-[-0.075em]">
          Bereit, keinen Anruf mehr zu verlieren?
        </h2>
        <div className="mt-14 grid gap-8 border-t border-white/18 pt-7 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-lg text-sm leading-7 text-white/55">In einer Live-Demo zeigen wir nicht Folien, sondern einen echten Ablauf für deinen Betrieb.</p>
          <MagneticLink href="mailto:demo@placeholder.ai" tone="light">Demo anfragen</MagneticLink>
        </div>
      </div>
    </section>
  );
}
