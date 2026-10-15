import { describe, expect, it } from "vitest";

import { resolveMotionMode, shouldAnimateScrollReveals } from "@/lib/motion";

describe("resolveMotionMode", () => {
  it("honours reduced-motion before every other capability", () => {
    expect(
      resolveMotionMode({
        prefersReducedMotion: true,
        hasFinePointer: true,
        hasWebGL: true,
      }),
    ).toBe("reduced");
  });

  it("uses the deliberate fallback when WebGL is unavailable", () => {
    expect(
      resolveMotionMode({
        prefersReducedMotion: false,
        hasFinePointer: true,
        hasWebGL: false,
      }),
    ).toBe("fallback");
  });

  it("limits motion on coarse pointers", () => {
    expect(
      resolveMotionMode({
        prefersReducedMotion: false,
        hasFinePointer: false,
        hasWebGL: true,
      }),
    ).toBe("lite");
  });

  it("enables the full experience only when every capability supports it", () => {
    expect(
      resolveMotionMode({
        prefersReducedMotion: false,
        hasFinePointer: true,
        hasWebGL: true,
      }),
    ).toBe("full");
  });
});

describe("shouldAnimateScrollReveals", () => {
  it("keeps scroll-hidden content exclusive to the full motion experience", () => {
    expect(shouldAnimateScrollReveals("full")).toBe(true);
    expect(shouldAnimateScrollReveals("lite")).toBe(false);
    expect(shouldAnimateScrollReveals("reduced")).toBe(false);
    expect(shouldAnimateScrollReveals("fallback")).toBe(false);
  });
});
