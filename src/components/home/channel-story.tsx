"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilitySection, capabilityStages } from "./capability-section";

const steps = [
  {
    number: "01",
    label: "Kontakt",
    title: "Ein Kunde meldet sich.",
    description: "Ob Anruf, WhatsApp oder Website: Der Agent nimmt die Anfrage auf und beginnt das Gespräch – auch nach Feierabend.",
    detailLabel: "EINGANG",
    detail: "WHATSAPP / TELEFON / WEB",
  },
  {
    number: "02",
    label: "Verstehen",
    title: "Der Agent versteht.",
    description: "Er erkennt Terminwunsch und Zeitfenster, gleicht sie mit dem Wissen deines Betriebs ab und findet einen passenden freien Slot.",
    detailLabel: "KONTEXT",
    detail: "ANLIEGEN / ZEIT / VERFÜGBARKEIT",
  },
  {
    number: "03",
    label: "Handeln",
    title: "Der Termin steht.",
    description: "Der Kunde erhält eine Bestätigung. Dein Team bekommt die relevanten Details, ohne den gesamten Chat durchgehen zu müssen.",
    detailLabel: "ERGEBNIS",
    detail: "BESTÄTIGT / DOKUMENTIERT / ÜBERGEBEN",
  },
];

function PhoneScene({ capabilityStage = null }: { capabilityStage?: number | null }) {
  const activeCapability = capabilityStage === null ? null : capabilityStages[capabilityStage];
  return (
    <div className="signal-phone" aria-label="Beispielhafter Ablauf einer Kundenanfrage auf einem Smartphone">
      <div className="signal-phone-rim">
        <div className="signal-phone-screen">
          <div className="signal-phone-status"><span>21:47</span><span className="signal-phone-island" /><span>●●  ▰</span></div>
          <div className="signal-phone-header">
            <span className="signal-phone-back">‹</span>
            <span className="signal-phone-avatar">AI</span>
            <span className="signal-phone-identity"><strong>Dein Assistent</strong><small>Immer erreichbar</small></span>
            <span className="signal-phone-more">···</span>
          </div>

          <div className="signal-screen signal-screen--first">
            <span className="signal-screen-label">HEUTE · 21:47</span>
            <div className="signal-message signal-message--customer">Hallo, habt ihr morgen noch einen Termin frei?</div>
            <span className="signal-message-time">21:47 · EINGEGANGEN</span>
            <div className="signal-message signal-message--agent">Ja, gerne. Welches Zeitfenster passt Ihnen morgen am besten?</div>
            <span className="signal-message-time signal-message-time--right">21:47 · GESENDET</span>
            <div className="signal-message signal-message--customer">Morgen zwischen 9 und 12 Uhr wäre gut.</div>
            <span className="signal-message-time">21:48 · EINGEGANGEN</span>
            <div className="signal-phone-context">
              <span className="signal-phone-context-kicker">IM HINTERGRUND</span>
              <span><i /> Anliegen erkennen</span>
              <span><i /> Freie Termine prüfen</span>
            </div>
            <div className="signal-phone-activity"><i /> ANTWORT IN SEKUNDEN</div>
          </div>

          <div className="signal-screen signal-screen--second">
            <span className="signal-screen-label">ANLIEGEN ERKANNT / 21:47</span>
            <p className="signal-understood">Morgen.<br /><em>Vormittags.</em></p>
            <div className="signal-insight-card">
              <span className="signal-phone-context-kicker">AUS DER NACHRICHT ERKANNT</span>
              <div><span>Anliegen</span><strong>Termin vereinbaren</strong></div>
              <div><span>Zeitwunsch</span><strong>Morgen · Vormittag</strong></div>
              <div><span>Kanal</span><strong>WhatsApp</strong></div>
            </div>
            <div className="signal-slot-card"><span>NÄCHSTER FREIER TERMIN</span><strong>10:30 <small>UHR</small></strong><i>VERFÜGBAR ↗</i></div>
            <div className="signal-phone-activity"><i /> KALENDER ABGEGLICHEN</div>
          </div>

          <div className="signal-screen signal-screen--third">
            <span className="signal-screen-label">ANTWORT GESENDET / 21:48</span>
            <div className="signal-message signal-message--agent">Ja, morgen um 10:30 Uhr ist noch ein Termin frei. Ich habe ihn für Sie reserviert.</div>
            <span className="signal-message-time signal-message-time--right">21:48 · ZUGESTELLT</span>
            <div className="signal-confirmation"><span>MORGEN</span><strong>10:30</strong><small>TERMIN BESTÄTIGT ↗</small></div>
            <div className="signal-handoff-card"><span>FÜR DEIN TEAM</span><strong>Alle Details. Kein Nachfragen.</strong><small>Kanal · Anliegen · Termin · Verlauf</small></div>
            <div className="signal-phone-activity signal-phone-activity--done"><i /> AN DEIN TEAM ÜBERGEBEN</div>
          </div>

          {activeCapability && (
            <div className="signal-capability-screen">
              <div key={capabilityStage} className="signal-capability-content">
                <span className="signal-screen-label">{activeCapability.phoneLabel}</span>
                <strong className="signal-capability-title">{activeCapability.title}</strong>
                <p className="signal-capability-copy">{activeCapability.detail}</p>
                <div className="signal-capability-example">
                  <span>IM BEISPIEL</span>
                  <strong>{activeCapability.phoneExample}</strong>
                </div>
                <div className="signal-phone-activity"><i /> {activeCapability.phoneStatus}</div>
              </div>
            </div>
          )}

          <div className="signal-phone-home" />
        </div>
      </div>
    </div>
  );
}

export function ChannelStory() {
  const [capabilityStage, setCapabilityStage] = useState(0);
  const [capabilityVisible, setCapabilityVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const desktopPhoneRef = useRef<HTMLDivElement>(null);
  const mobilePhoneRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const media = gsap.matchMedia();
    const setupAnimation = (desktop: boolean) => () => {
      const phone = desktop ? desktopPhoneRef.current : mobilePhoneRef.current;
      if (!phone) return;
      const chapters = gsap.utils.toArray<HTMLElement>(".signal-chapter", scene);
      const screens = gsap.utils.toArray<HTMLElement>(".signal-screen", phone);
      const reveals = gsap.utils.toArray<SVGRectElement>(".signal-trace-reveal", scene);
      const wipe = scene.querySelector<HTMLElement>(".signal-light-wipe");
      const progress = scene.querySelector<HTMLElement>(".signal-progress");
      const progressTrack = scene.querySelector<HTMLElement>(".signal-progress-track");
      const progressFill = progressTrack?.querySelector<HTMLElement>("span");
      reveals.forEach((rect) => gsap.set(rect, { attr: { height: 0 } }));
      if (wipe) gsap.set(wipe, { autoAlpha: 0 });
      gsap.set(chapters.slice(1), { autoAlpha: 0, y: 48 });
      gsap.set(screens.slice(1), { autoAlpha: 0, y: 26 });
      gsap.set(phone, { autoAlpha: 0.82, y: 35, rotationY: -26, rotationZ: 8, scale: 0.84 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: scene,
          start: "top top",
          end: "+=195%",
          scrub: 0.55,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            if (progressRef.current) progressRef.current.style.transform = window.innerWidth < 768 ? `scaleX(${progress})` : `scaleY(${progress})`;
            if (percentageRef.current) percentageRef.current.textContent = `${Math.round(progress * 100)}%`;
            if (currentRef.current) currentRef.current.textContent = String(Math.min(3, Math.floor(progress * 3) + 1)).padStart(2, "0");
          },
        },
      });

      timeline
        .to(phone, { autoAlpha: 1, y: 0, rotationY: -14, rotationZ: 3, scale: 1, duration: 0.7, ease: "power3.out" }, 0.05)
        .to(chapters[0], { autoAlpha: 0, x: -70, duration: 0.24, ease: "power2.in" }, 0.88)
        .to(screens[0], { autoAlpha: 0, y: -26, duration: 0.22 }, 0.9)
        .fromTo(chapters[1], { autoAlpha: 0, x: 70, y: 0 }, { autoAlpha: 1, x: 0, duration: 0.37, ease: "power3.out" }, 1.08)
        .fromTo(screens[1], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: "power3.out" }, 1.08)
        .to(phone, { rotationY: 0, rotationZ: 0, y: -14, scale: 1.06, duration: 0.58, ease: "power2.inOut" }, 1.02)
        .to(chapters[1], { autoAlpha: 0, x: -70, duration: 0.24, ease: "power2.in" }, 1.93)
        .to(screens[1], { autoAlpha: 0, y: -26, duration: 0.22 }, 2.28)
        .fromTo(chapters[2], { autoAlpha: 0, x: 70, y: 0 }, { autoAlpha: 1, x: 0, duration: 0.38, ease: "power3.out" }, 2.31)
        .fromTo(screens[2], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.31)
        .to(phone, { rotationY: 9, rotationZ: -3, y: 55, scale: 1.02, duration: 0.62, ease: "power2.inOut" }, 2.08)
        .to({}, { duration: 1.15 });

      if (desktop) timeline.to(phone, { rotationY: 0, rotationZ: 0, y: 0, scale: 0.88, duration: 0.5, ease: "power2.inOut" }, 3.35);

      if (wipe) timeline.to(wipe, { autoAlpha: 1, duration: 0.58, ease: "power2.inOut" }, 2.05);
      if (progress) timeline.set(progress, { color: "#171a19" }, 2.42);
      if (progressTrack) timeline.set(progressTrack, { backgroundColor: "rgba(10, 12, 11, 0.2)" }, 2.42);
      if (progressFill) timeline.set(progressFill, { backgroundColor: "#171a19" }, 2.42);

      reveals.forEach((rect) => {
        timeline.to(rect, { attr: { height: Number(rect.dataset.fullHeight) }, duration: 0.7, ease: "power2.out" }, 0);
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set([...chapters, ...screens, phone], { clearProps: "all" });
        gsap.set([progress, progressTrack, progressFill, wipe].filter(Boolean), { clearProps: "all" });
        reveals.forEach((rect) => gsap.set(rect, { attr: { height: 0 } }));
      };
    };

    media.add("(min-width: 768px) and (min-height: 651px) and (prefers-reduced-motion: no-preference)", setupAnimation(true));
    media.add("(max-width: 767px) and (min-height: 651px) and (prefers-reduced-motion: no-preference)", setupAnimation(false));

    return () => media.revert();
  }, []);

  return (
    <div className="signal-flow">
      <div className="signal-device-rail">
        <div className="signal-device-stage"><div className="signal-device-motion" ref={desktopPhoneRef}><PhoneScene capabilityStage={capabilityVisible ? capabilityStage : null} /></div></div>
      </div>
      <section id="channels" ref={sectionRef} className="signal-story" aria-label="So arbeitet dein KI-Agent">
        <div ref={sceneRef} className="signal-scene">
        <svg className="signal-trace signal-trace--desktop" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <defs><clipPath id="signal-trace-desktop-clip"><rect className="signal-trace-reveal" data-full-height="900" x="0" y="0" width="1440" height="0" /></clipPath></defs>
          <path className="signal-trace-path" clipPath="url(#signal-trace-desktop-clip)" d="M720 0 C720 150 750 250 840 330 S960 405 950 460" />
        </svg>
        <svg className="signal-trace signal-trace--mobile" viewBox="0 0 390 844" preserveAspectRatio="none" aria-hidden="true">
          <defs><clipPath id="signal-trace-mobile-clip"><rect className="signal-trace-reveal" data-full-height="844" x="0" y="0" width="390" height="0" /></clipPath></defs>
          <path className="signal-trace-path" clipPath="url(#signal-trace-mobile-clip)" d="M195 0 C195 80 380 70 380 160 L380 345 C380 390 280 405 195 420" />
        </svg>
        <div className="signal-light-wipe" aria-hidden="true" />
        <div className="signal-chapters">
          {steps.map((step) => (
            <article className="signal-chapter" key={step.number}>
              <span className="signal-step-label"><i /> {step.number} / {step.label}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <div className="signal-chapter-meta"><span>{step.detailLabel}</span><strong>{step.detail}</strong></div>
            </article>
          ))}
        </div>

        <div className="signal-device-stage signal-device-stage--mobile"><div className="signal-device-motion" ref={mobilePhoneRef}><PhoneScene /></div></div>

        <div className="signal-progress" aria-label="Fortschritt der Scroll-Animation">
          <span className="signal-progress-heading">FORTSCHRITT <span ref={percentageRef}>0%</span></span>
          <div className="signal-progress-track"><span ref={progressRef} /></div>
          <span className="signal-progress-count"><span ref={currentRef}>01</span> / 03</span>
        </div>
        </div>
      </section>
      <CapabilitySection onStageChange={setCapabilityStage} onVisibilityChange={setCapabilityVisible} />
    </div>
  );
}
