"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    if (menuOpen) window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function announcePlanned(label: string) {
    setPlannedLabel(label);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-[var(--gutter)] md:pt-5">
        <div className="mx-auto flex max-w-[108rem] items-center justify-between py-2">
          <a href="#top" className="group" aria-label="Zur Startseite">
            <span className="display-type text-[1.55rem] font-semibold leading-none tracking-[-0.075em] transition-opacity group-hover:opacity-55">PLACEHOLDER/AI</span>
          </a>

          <nav className="hidden items-center gap-9 xl:gap-12 lg:flex" aria-label="Hauptnavigation">
            {homeContent.navigation.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => announcePlanned(item.label)}
                className="group relative py-2 font-mono text-[0.75rem] font-bold uppercase tracking-[0.04em] text-black transition-opacity hover:opacity-45"
                aria-label={`${item.label} – in Vorbereitung`}
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-10 items-center gap-3 border border-black bg-transparent px-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-black hover:text-white sm:flex"
            >
              Demo starten
              <span className="size-1.5 rounded-full bg-white" aria-hidden="true" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center border border-black bg-transparent transition-colors hover:bg-black hover:text-white lg:hidden"
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
          className="fixed inset-0 z-[70] flex min-h-dvh flex-col bg-black p-5 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <span className="font-mono text-[0.68rem] font-bold">PLACEHOLDER/AI</span>
            <button
              type="button"
              autoFocus
              onClick={closeMenu}
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
