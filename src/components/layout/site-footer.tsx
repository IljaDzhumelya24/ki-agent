"use client";

import { useState } from "react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteFooter() {
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);

  return (
    <footer className="page-gutter bg-black pb-8 text-white" aria-label="Seitenende">
      <div className="mx-auto max-w-[96rem] border-t border-white/18 pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-white text-black"><span className="size-2 rounded-full border border-black" /></span>
              <span className="font-mono text-xs font-bold">PLACEHOLDER/AI</span>
            </div>
            <p className="display-type mt-10 max-w-[12ch] text-4xl leading-[0.95] text-white/85 md:text-5xl">Ein Agent für jede Tür zum Betrieb.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/38">Navigation</p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {homeContent.navigation.map((item) => (
                  <button key={item.href} type="button" onClick={() => setPlannedLabel(item.label)} className="text-sm text-white/68 hover:text-white">{item.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/38">Kontakt</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
                <a href="mailto:demo@placeholder.ai" className="hover:text-white">E-Mail</a>
                <a href="#contact" className="hover:text-white">Demo</a>
              </div>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/38">Rechtliches</p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {['Impressum', 'Datenschutz'].map((label) => (
                  <button key={label} type="button" onClick={() => setPlannedLabel(label)} className="text-sm text-white/68 hover:text-white">{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-white/12 pt-5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-white/35 sm:flex-row sm:justify-between">
          <span>© 2026 PLACEHOLDER/AI</span>
          <span>Local first · Human handoff · Clear limits</span>
        </div>
      </div>

      {plannedLabel && <PreparationNotice label={plannedLabel} onClose={() => setPlannedLabel(null)} />}
    </footer>
  );
}
