"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

const scrambleAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleLabel({ label, restingTone = "light" }: { label: string; restingTone?: "light" | "dark" }) {
  const [value, setValue] = useState(label);
  const [isRewriting, setIsRewriting] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function rewrite() {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);

    const startedAt = window.performance.now();
    setIsRewriting(true);

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 420, 1);
      const revealed = Math.floor(progress * label.length);
      setValue(
        label
          .split("")
          .map((character, index) => {
            if (character === " " || index < revealed) return character;
            return scrambleAlphabet[Math.floor(Math.random() * scrambleAlphabet.length)];
          })
          .join(""),
      );

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        setValue(label);
        setIsRewriting(false);
        frameRef.current = null;
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
  }

  return (
    <span
      onPointerEnter={rewrite}
      onFocus={rewrite}
      className={`relative z-10 whitespace-nowrap ${isRewriting ? "nav-label-glow" : restingTone === "dark" ? "text-black" : "text-white group-hover:text-black"}`}
    >
      {value}
    </span>
  );
}

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
                className="group relative isolate overflow-hidden border border-transparent px-3 py-2 font-mono text-[0.88rem] font-bold uppercase tracking-[0.015em] transition-[background-color,border-color,transform] duration-300 hover:border-white hover:bg-white hover:shadow-[0_0_24px_rgba(114,190,255,.26)] focus-visible:border-white focus-visible:bg-white"
                aria-label={`${item.label} – in Vorbereitung`}
              >
                <ScrambleLabel label={item.label} />
              </button>
            ))}
          </nav>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <a
              href="#contact"
              className="group hidden h-10 w-[9.35rem] items-center justify-center border border-white bg-white font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_26px_rgba(114,190,255,.35)] focus-visible:shadow-[0_0_26px_rgba(114,190,255,.35)] sm:flex"
            >
              <ScrambleLabel label="Demo starten" restingTone="dark" />
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
