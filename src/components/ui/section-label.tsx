import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--graphite)]">
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </div>
  );
}
