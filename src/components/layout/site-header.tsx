"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function announcePlanned(label: string) {
    setPlannedLabel(label);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between rounded-[1.1rem] border border-black/10 bg-[rgba(244,244,240,0.78)] px-4 py-3 shadow-[0_12px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl md:px-5">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Zur Startseite">
            <span className="grid size-8 place-items-center rounded-full bg-black text-white">
              <span className="size-2 rounded-full border border-white" />
            </span>
            <span className="font-mono text-[0.68rem] font-bold tracking-[-0.02em]">PLACEHOLDER/AI</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {homeContent.navigation.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => announcePlanned(item.label)}
                className="group relative py-2 text-xs font-semibold text-black/70 transition-colors hover:text-black"
                aria-label={`${item.label} – in Vorbereitung`}
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              className="hidden min-h-10 items-center gap-3 rounded-full bg-black px-5 text-xs font-semibold text-white transition-colors hover:bg-[#292a2a] sm:flex"
            >
              Demo starten
              <span className="size-1.5 rounded-full bg-white" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-black/15 bg-white/70 lg:hidden"
              aria-label="Menü öffnen"
              aria-expanded={menuOpen}
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
          className="fixed inset-0 z-[70] flex min-h-dvh flex-col bg-black p-5 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <span className="font-mono text-[0.68rem] font-bold">PLACEHOLDER/AI</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Menü schließen"
              className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-black"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile Hauptnavigation">
            {homeContent.navigation.map((item, index) => (
              <button
                type="button"
                key={item.href}
                onClick={() => announcePlanned(item.label)}
                className="group flex items-center justify-between border-b border-white/15 py-5 text-left"
                aria-label={`${item.label} – in Vorbereitung`}
              >
                <span className="flex items-start gap-4">
                  <span className="mt-2 font-mono text-[0.6rem] text-white/40">0{index + 1}</span>
                  <span className="display-type text-[clamp(2.4rem,11vw,5rem)] leading-none">{item.label}</span>
                </span>
                <ArrowDownRight className="size-6 text-white/45 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </button>
            ))}
          </nav>
        </div>
      )}

      {plannedLabel && (
        <PreparationNotice label={plannedLabel} onClose={() => setPlannedLabel(null)} />
      )}
    </>
  );
}
