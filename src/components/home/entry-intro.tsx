"use client";

import { useEffect, useState } from "react";

export function EntryIntro() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 1450);
    const completeTimer = window.setTimeout(() => setIsComplete(true), 2050);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  if (isComplete) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className={`entry-intro${isLeaving ? " entry-intro--leaving" : ""}`}
      >
        <span className="entry-intro__brand">PLACEHOLDER/AI</span>
        <span className="entry-intro__index">001 / INITIALIZING</span>
        <span className="entry-intro__signal">
          <span />
        </span>
      </div>
      <noscript>
        <style>{`.entry-intro { display: none !important; }`}</style>
      </noscript>
    </>
  );
}
