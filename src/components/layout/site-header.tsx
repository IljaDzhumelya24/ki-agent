"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { PreparationNotice } from "@/components/ui/preparation-notice";

export function SiteHeader({ initialTheme = "dark", currentPage = "home" }: { initialTheme?: "dark" | "light"; currentPage?: "home" | "solutions" | "industries" | "pricing" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plannedLabel, setPlannedLabel] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const [navTheme, setNavTheme] = useState<"dark" | "light">(initialTheme);
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
    if (!menuOpen || !dialogRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".mobile-menu-item",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: "power3.out" },
      );
      gsap.fromTo(
        ".mobile-menu-trace",
        { strokeDashoffset: 1, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
      );
      gsap.to(".mobile-menu-glow", {
        x: -18,
        y: 22,
        scale: 1.12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, dialogRef);

    return () => context.revert();
  }, [menuOpen]);

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

    return () => {
      tween.kill();
    };
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
      const section = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).find((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.top <= navY && rect.bottom > navY;
      });
      const wipe = section?.id === "channels" ? section.querySelector<HTMLElement>(".signal-light-wipe") : null;
      const wipeOpacity = wipe ? Number.parseFloat(window.getComputedStyle(wipe).opacity) : 0;
      const overLightSurface = section?.dataset.navTheme === "light" || section?.id === "capabilities" || section?.id === "industries" ||
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

  const currentHref = currentPage === "solutions" ? "/loesungen" : currentPage === "industries" ? "/branchen" : currentPage === "pricing" ? "/preise" : null;

  return (
    <>
      <header
        ref={headerRef}
        data-scroll-state={navVisible ? "shown" : "hidden"}
        data-theme={navTheme}
        onFocusCapture={() => setNavVisible(true)}
        className={`fixed inset-x-0 top-0 z-50 px-6 pt-4 transition-colors duration-300 will-change-transform ${navTheme === "light" ? "text-black [--nav-hover-text:#fff]" : "text-white [--nav-hover-text:#0b0c0c]"} ${navVisible ? "" : "pointer-events-none"}`}
      >
        <div className="relative h-10 w-full">
          <Link href={currentPage === "home" ? "#top" : "/"} className="group absolute left-0 top-1/2 -translate-y-1/2" aria-label="Zur Startseite">
            <span className="display-type text-[1.7rem] font-semibold leading-none tracking-[-0.075em] transition-opacity group-hover:opacity-55">PLACEHOLDER/AI</span>
          </Link>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 xl:gap-10 lg:flex" aria-label="Hauptnavigation">
            {homeContent.navigation.map((item) => {
              const className = `group relative isolate overflow-hidden border border-transparent px-3 py-2 font-mono text-[0.88rem] font-bold uppercase tracking-[0.015em] transition-[background-color,border-color,transform] duration-300 ${navTheme === "light" ? "hover:border-black hover:bg-black focus-visible:border-black focus-visible:bg-black" : "hover:border-white hover:bg-white hover:shadow-[0_0_24px_rgba(114,190,255,.26)] focus-visible:border-white focus-visible:bg-white"}`;
              const label = <span data-label={item.label} className={`nav-label relative z-10 whitespace-nowrap ${navTheme === "light" ? "text-black group-hover:text-white group-focus-visible:text-white" : "text-white group-hover:text-black group-focus-visible:text-black"}`}>{item.label}</span>;
              return item.status === "live" ? (
                <Link key={item.href} href={item.href} className={className} aria-current={currentHref === item.href ? "page" : undefined}>{label}</Link>
              ) : (
                <button type="button" key={item.href} onClick={() => announcePlanned(item.label)} className={className} aria-label={`${item.label} – in Vorbereitung`}>{label}</button>
              );
            })}
          </nav>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <Link
              href="/kontakt"
              className={`group hidden h-10 w-[9.35rem] items-center justify-center border font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] transition-[background-color,border-color,box-shadow,transform] duration-300 sm:flex ${navTheme === "light" ? "border-black bg-black hover:bg-[#282b2b] focus-visible:bg-[#282b2b]" : "border-white bg-white hover:shadow-[0_0_26px_rgba(114,190,255,.35)] focus-visible:shadow-[0_0_26px_rgba(114,190,255,.35)]"}`}
            >
              <span data-label="Kontakt" className={`nav-label relative z-10 whitespace-nowrap ${navTheme === "light" ? "text-white" : "text-black"}`}>Kontakt</span>
            </Link>
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
          className="fixed inset-0 z-[100] isolate flex h-dvh flex-col overflow-y-auto overscroll-contain bg-[#050606] px-6 pb-8 pt-4 text-white"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="mobile-menu-glow absolute -right-[58%] top-[12%] h-[72%] w-[125%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.035)_38%,transparent_70%)] blur-2xl" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 900" preserveAspectRatio="xMidYMid slice" fill="none">
              <path className="mobile-menu-trace" d="M 510 -75 C 170 130, 500 215, 260 370 S 120 580, 475 690" pathLength="1" strokeDasharray="1" strokeDashoffset="1" stroke="white" strokeOpacity="0.24" strokeWidth="1" />
              <path className="mobile-menu-trace" d="M 560 60 C 250 245, 520 325, 335 475 S 175 690, 480 810" pathLength="1" strokeDasharray="1" strokeDashoffset="1" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
            </svg>
          </div>
          <div className="relative z-10 flex h-10 shrink-0 items-center justify-between">
            <span className="display-type text-[1.5rem] font-semibold leading-none tracking-[-0.075em]">PLACEHOLDER/AI</span>
            <button
              type="button"
              autoFocus
              onClick={closeMenu}
              aria-label="Menü schließen"
              className="grid size-10 place-items-center border border-white/60 bg-transparent text-white transition-colors hover:bg-white hover:text-black"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <nav className="relative z-10 mb-6 mt-8 grid min-h-48 flex-1 grid-rows-4" aria-label="Mobile Hauptnavigation">
            {homeContent.navigation.map((item) => {
              const className = "mobile-menu-item group flex w-full items-center text-left";
              const label = <span className="display-type text-[clamp(2.6rem,13vw,5.25rem)] leading-[0.9] tracking-[-0.075em] transition-[transform,color,opacity] duration-300 group-hover:translate-x-2 group-hover:text-white/60 group-active:opacity-55">{item.label}</span>;
              return item.status === "live" ? (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={className} aria-current={currentHref === item.href ? "page" : undefined}>{label}</Link>
              ) : (
                <button type="button" key={item.href} onClick={() => announcePlanned(item.label)} className={className} aria-label={`${item.label} – in Vorbereitung`}>{label}</button>
              );
            })}
          </nav>
          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            className="relative z-10 mb-24 flex min-h-12 shrink-0 items-center justify-center border border-white bg-white px-6 font-mono text-[0.72rem] font-bold uppercase tracking-[0.07em] text-black transition-colors hover:bg-white/85"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      )}

      {plannedLabel && (
        <PreparationNotice label={plannedLabel} onClose={() => setPlannedLabel(null)} />
      )}
    </>
  );
}
