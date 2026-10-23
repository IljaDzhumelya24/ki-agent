"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ValueCalculator() {
  const [missed, setMissed] = useState(24);
  const [conversion, setConversion] = useState(25);
  const [orderValue, setOrderValue] = useState(180);
  const potential = Math.round(missed * (conversion / 100) * orderValue);
  const amountRef = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(potential);

  useEffect(() => {
    const amount = amountRef.current;
    if (!amount) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      amount.textContent = euro.format(potential);
      previousValue.current = potential;
      return;
    }

    const counter = { value: previousValue.current };
    const animation = gsap.to(counter, {
      value: potential,
      duration: 0.65,
      ease: "power3.out",
      onUpdate: () => {
        amount.textContent = euro.format(Math.round(counter.value));
      },
    });
    previousValue.current = potential;

    return () => {
      animation.kill();
    };
  }, [potential]);

  return (
    <div className="grid bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:border lg:border-black/15">
      <div className="order-last space-y-7 border-x border-b border-black/15 px-5 py-8 sm:space-y-10 sm:p-10 lg:order-first lg:border-0 lg:p-14">
        <div>
          <h3 className="display-type text-[clamp(1.95rem,3vw,3.4rem)] leading-none tracking-[-0.055em]">
            Deine Zahlen. Dein Szenario.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--graphite)] sm:mt-4 sm:text-base">
            Verändere die Werte. Es geht um den möglichen Wert deiner Anfragen, nicht um ein versprochenes Ergebnis.
          </p>
        </div>

        <div>
          <label htmlFor="missed-requests" className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-base">
            <span>Liegengebliebene Anfragen im Monat</span>
            <strong className="display-type text-[2rem] leading-none">{missed}</strong>
          </label>
          <input id="missed-requests" className="price-range mt-4 w-full sm:mt-5" type="range" min="0" max="100" step="1" value={missed} onChange={(event) => setMissed(Number(event.target.value))} />
        </div>

        <div>
          <label htmlFor="conversion-rate" className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-base">
            <span>Möglicher Anteil, der zum Auftrag wird</span>
            <strong className="display-type text-[2rem] leading-none">{conversion} %</strong>
          </label>
          <input id="conversion-rate" className="price-range mt-4 w-full sm:mt-5" type="range" min="0" max="60" step="5" value={conversion} onChange={(event) => setConversion(Number(event.target.value))} />
        </div>

        <div>
          <label htmlFor="order-value" className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-base">
            <span>Durchschnittlicher Umsatz pro Auftrag</span>
            <strong className="display-type text-[2rem] leading-none">{euro.format(orderValue)}</strong>
          </label>
          <input id="order-value" className="price-range mt-4 w-full sm:mt-5" type="range" min="50" max="1000" step="10" value={orderValue} onChange={(event) => setOrderValue(Number(event.target.value))} />
        </div>

        <p className="border-t border-black/15 pt-5 text-sm leading-relaxed text-[var(--graphite)] lg:hidden">
          {missed} Anfragen × {conversion} % × {euro.format(orderValue)}. Eine Rechenhilfe, keine Umsatzprognose. Nicht jede Anfrage ist erreichbar oder wird zum Auftrag.
        </p>
      </div>

      <div className="sticky top-16 z-10 order-first flex flex-col justify-between overflow-hidden bg-[#101212] px-5 py-5 text-white sm:p-10 lg:static lg:order-last lg:min-h-[28rem] lg:p-14">
        <svg aria-hidden="true" className="pricing-result-lines pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M 660 -20 C 150 90 750 245 250 390 S 330 610 670 760" stroke="currentColor" strokeWidth="1" />
          <path d="M 750 70 C 250 170 790 320 350 470 S 440 680 740 820" stroke="currentColor" strokeWidth="1" />
        </svg>
        <p className="relative max-w-xs text-xs leading-relaxed text-white/70 sm:text-base">
          Rechnerischer Monatswert <span className="hidden sm:inline">auf Basis deiner Annahmen</span>
        </p>
        <div className="relative mt-3 lg:mt-0">
          <span ref={amountRef} aria-hidden="true" className="display-type block break-words text-[clamp(2.8rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.075em] lg:tracking-[-0.08em]">
            {euro.format(potential)}
          </span>
          <span className="sr-only" aria-live="polite">{euro.format(potential)} rechnerischer Monatswert</span>
          <div className="mt-9 hidden h-px w-full bg-white/25 lg:block">
            <div className="h-full bg-white transition-[width] duration-700 ease-out" style={{ width: `${Math.max(4, Math.min(100, (potential / 12000) * 100))}%` }} />
          </div>
          <p className="mt-5 hidden max-w-md text-sm leading-relaxed text-white/55 lg:block">
            {missed} Anfragen × {conversion} % × {euro.format(orderValue)}. Eine Rechenhilfe, keine Umsatzprognose. Nicht jede Anfrage ist erreichbar oder wird zum Auftrag.
          </p>
        </div>
      </div>
    </div>
  );
}
