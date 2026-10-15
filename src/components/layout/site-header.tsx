"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  function closeMenu() {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    lastScrollYRef.current = window.scrollY;

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;

      if (!menuOpen) {
        setNavVisible(scrollingUp || currentScrollY < 24);
      }
      lastScrollYRef.current = currentScrollY;
    };

    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  function announcePlanned(label: string) {
    setPlannedLabel(label);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        data-scroll-state={navVisible ? "shown" : "hidden"}
        className={`fixed inset-x-0 top-0 z-50 px-6 pt-4 text-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${navVisible ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"}`}
      >
        <div className="relative h-10 w-full">
          <a href="#top" className="group absolute left-0 top-1/2 -translate-y-1/2" aria-label="Zur Startseite">
            <span className="display-type text-[1.7rem] font-semibold leading-none tracking-[-0.075em] transition-opacity group-hover:opacity-55">PLACEHOLDER/AI</span>
          </a>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 xl:gap-10 lg:flex" aria-label="Hauptnavigation">
            {homeContent.navigation.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => announcePlanned(item.label)}
                className="group relative py-2 font-mono text-[0.88rem] font-bold uppercase tracking-[0.015em] text-current transition-opacity hover:opacity-45"
                aria-label={`${item.label} – in Vorbereitung`}
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <a
              href="#contact"
              className="hidden h-10 w-[9.35rem] items-center justify-center bg-white font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-black transition-colors hover:bg-black hover:text-white sm:flex"
            >
              Demo starten
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white lg:hidden"
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
