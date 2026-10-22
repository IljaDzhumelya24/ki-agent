"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";
import gsap from "gsap";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const scrollIntentRef = useRef(0);

  function closeMenu() {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(header, {
      y: navVisible ? 0 : -28,
      opacity: navVisible ? 1 : 0,
      duration: reducedMotion ? 0 : navVisible ? 0.72 : 0.52,
      ease: "power3.out",
      overwrite: "auto",
      force3D: true,
    });

    return () => tween.kill();
  }, [navVisible]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    lastScrollYRef.current = window.scrollY;
    scrollIntentRef.current = 0;

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
    const updateTheme = () => {
      const navY = 36;
      const section = Array.from(document.querySelectorAll<HTMLElement>("main > section")).find((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.top <= navY && rect.bottom > navY;
      });
      const wipe = section?.id === "channels" ? section.querySelector<HTMLElement>(".signal-light-wipe") : null;
      const wipeOpacity = wipe ? Number.parseFloat(window.getComputedStyle(wipe).opacity) : 0;
      const overLightSurface = section?.id === "capabilities" || section?.id === "industries" ||
        wipeOpacity > 0.75;
      setNavTheme(overLightSurface ? "light" : "dark");
    };
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      if (!menuOpen) {
        if (currentScrollY < 64) {
          scrollIntentRef.current = 0;
          setNavVisible(true);
        } else if (delta > 0) {
          scrollIntentRef.current = Math.max(0, scrollIntentRef.current) + delta;
          if (scrollIntentRef.current > 32) setNavVisible(false);
        } else if (delta < 0) {
          scrollIntentRef.current = Math.min(0, scrollIntentRef.current) + delta;
          if (scrollIntentRef.current < -20) setNavVisible(true);
        }
      }
      lastScrollYRef.current = currentScrollY;
      updateTheme();
    };

    updateTheme();
    const wipe = document.querySelector(".signal-light-wipe");
    const wipeObserver = wipe ? new MutationObserver(updateTheme) : null;
    if (wipe && wipeObserver) wipeObserver.observe(wipe, { attributes: true, attributeFilter: ["style"] });
    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      wipeObserver?.disconnect();
    };
  }, [menuOpen]);

  function announcePlanned(label: string) {
    setPlannedLabel(label);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        data-scroll-state={navVisible ? "shown" : "hidden"}
        data-theme={navTheme}
        onFocusCapture={() => setNavVisible(true)}
        className={`fixed inset-x-0 top-0 z-50 px-6 pt-4 transition-[color,background-color] duration-300 will-change-transform ${navTheme === "light" ? "bg-[rgba(242,242,238,.94)] text-black [--nav-hover-text:#fff]" : "text-white [--nav-hover-text:#0b0c0c]"} ${navVisible ? "" : "pointer-events-none"}`}
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
                className={`group relative isolate overflow-hidden border border-transparent px-3 py-2 font-mono text-[0.88rem] font-bold uppercase tracking-[0.015em] transition-[background-color,border-color,transform] duration-300 ${navTheme === "light" ? "hover:border-black hover:bg-black focus-visible:border-black focus-visible:bg-black" : "hover:border-white hover:bg-white hover:shadow-[0_0_24px_rgba(114,190,255,.26)] focus-visible:border-white focus-visible:bg-white"}`}
                aria-label={`${item.label} – in Vorbereitung`}
              >
                <span data-label={item.label} className={`nav-label relative z-10 whitespace-nowrap ${navTheme === "light" ? "text-black group-hover:text-white group-focus-visible:text-white" : "text-white group-hover:text-black group-focus-visible:text-black"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <a
              href="#contact"
              className={`group hidden h-10 w-[9.35rem] items-center justify-center border font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] transition-[background-color,border-color,box-shadow,transform] duration-300 sm:flex ${navTheme === "light" ? "border-black bg-black hover:bg-[#282b2b] focus-visible:bg-[#282b2b]" : "border-white bg-white hover:shadow-[0_0_26px_rgba(114,190,255,.35)] focus-visible:shadow-[0_0_26px_rgba(114,190,255,.35)]"}`}
            >
              <span data-label="Demo starten" className={`nav-label relative z-10 whitespace-nowrap ${navTheme === "light" ? "text-white" : "text-black"}`}>Demo starten</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`grid size-10 place-items-center border transition-colors lg:hidden ${navTheme === "light" ? "border-black bg-black text-white hover:bg-white hover:text-black" : "border-black bg-white text-black hover:bg-black hover:text-white"}`}
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
