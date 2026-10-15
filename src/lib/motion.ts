export type MotionMode = "full" | "lite" | "reduced" | "fallback";

export interface MotionCapabilities {
  prefersReducedMotion: boolean;
  hasFinePointer: boolean;
  hasWebGL: boolean;
}

export function resolveMotionMode({
  prefersReducedMotion,
  hasFinePointer,
  hasWebGL,
}: MotionCapabilities): MotionMode {
  if (prefersReducedMotion) return "reduced";
  if (!hasWebGL) return "fallback";
  if (!hasFinePointer) return "lite";
  return "full";
}

export function shouldAnimateScrollReveals(mode: MotionMode) {
  return mode === "full";
}
