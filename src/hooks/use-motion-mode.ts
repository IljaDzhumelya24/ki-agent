"use client";

import { useEffect, useState } from "react";

import { resolveMotionMode, type MotionMode } from "@/lib/motion";

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext("webgl2"),
    );
  } catch {
    return false;
  }
}

export function useMotionMode(): MotionMode {
  const [mode, setMode] = useState<MotionMode>("fallback");

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const updateMode = () => {
      setMode(
        resolveMotionMode({
          prefersReducedMotion: reducedQuery.matches,
          hasFinePointer: pointerQuery.matches,
          hasWebGL: canCreateWebGLContext(),
        }),
      );
    };

    updateMode();
    reducedQuery.addEventListener("change", updateMode);
    pointerQuery.addEventListener("change", updateMode);

    return () => {
      reducedQuery.removeEventListener("change", updateMode);
      pointerQuery.removeEventListener("change", updateMode);
    };
  }, []);

  return mode;
}
