"use client";

import { useState } from "react";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteFooter() {
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);

  return (
    <footer className="page-gutter bg-black pb-8 text-white" aria-label="Seitenende">
      <div className="mx-auto max-w-[96rem] border-t border-white/20 pt-12">
        <div className="grid gap-16 pb-24 lg:grid-cols-[1fr_auto] lg:gap-20 lg:pb-32">
          <a href="#top" className="display-type w-fit self-start text-[clamp(2rem,3vw,3rem)] font-semibold leading-none tracking-[-0.075em] transition-opacity hover:opacity-55">
            PLACEHOLDER/AI
          </a>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-20">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50">Navigation</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {homeContent.navigation.map((item) => (
                  item.status === "live" ? (
                    <Link key={item.href} href={item.href} className="text-base text-white/65 transition-colors hover:text-white">{item.label}</Link>
                  ) : (
                    <button key={item.href} type="button" onClick={() => setPlannedLabel(item.label)} className="text-base text-white/65 transition-colors hover:text-white">{item.label}</button>
                  )
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50">Kontakt</p>
              <div className="mt-6 flex flex-col gap-3 text-base text-white/65">
                <Link href="/kontakt" className="transition-colors hover:text-white">Nachricht schreiben</Link>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/50">Rechtliches</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {['Impressum', 'Datenschutz'].map((label) => (
                  <button key={label} type="button" onClick={() => setPlannedLabel(label)} className="text-base text-white/65 transition-colors hover:text-white">{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/20 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/50">
          <span>© 2026 PLACEHOLDER/AI</span>
          <a href="#top" className="transition-colors hover:text-white">Nach oben ↑</a>
        </div>
      </div>

      {plannedLabel && <PreparationNotice label={plannedLabel} onClose={() => setPlannedLabel(null)} />}
    </footer>
  );
}
