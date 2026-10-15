import type { ReactNode } from "react";

export function RevealText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`reveal-mask block overflow-hidden ${className}`}>
      <span className="reveal-line block" data-reveal-line>
        {children}
      </span>
    </span>
  );
}
