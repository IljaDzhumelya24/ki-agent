"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotionMode } from "@/hooks/use-motion-mode";
import { shouldAnimateScrollReveals } from "@/lib/motion";

export function HomeMotion() {
  const mode = useMotionMode();

  useEffect(() => {
    if (mode === "fallback" || mode === "reduced") {
      document.documentElement.dataset.motion = mode;
      return;
    }

    document.documentElement.dataset.motion = mode;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: mode === "lite" ? 0.8 : 1.05,
      smoothWheel: mode === "full",
      wheelMultiplier: 0.9,
    });

    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal-line]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
        },
      );

      if (shouldAnimateScrollReveals(mode)) {
        gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 64, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
            },
          );
        });
      }
    });

    return () => {
      context.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
      delete document.documentElement.dataset.motion;
    };
  }, [mode]);

  return null;
}
