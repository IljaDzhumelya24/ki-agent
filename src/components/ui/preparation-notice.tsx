"use client";

import { X } from "lucide-react";

export function PreparationNotice({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[90] flex w-[min(92vw,34rem)] -translate-x-1/2 items-center justify-between gap-6 rounded-2xl border border-black/10 bg-black px-5 py-4 text-sm text-white shadow-2xl"
    >
      <p>
        <span className="text-white/55">Nächster Release / </span>
        {label} ist in Vorbereitung.
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Hinweis schließen"
        className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
