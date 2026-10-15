"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light" | "ghost";
  className?: string;
}

export function MagneticLink({
  href,
  children,
  tone = "dark",
  className = "",
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  const toneClass = {
    dark: "bg-[var(--ink)] text-white hover:bg-[#262828]",
    light: "bg-white text-[var(--ink)] hover:bg-[#e8e8e4]",
    ghost: "border border-[var(--line)] bg-white/45 text-[var(--ink)] hover:bg-white",
  }[tone];

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group inline-flex min-h-12 items-center justify-center gap-5 rounded-full px-6 text-sm font-semibold transition-[transform,background-color,color] duration-300 ${toneClass} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
    </a>
  );
}
