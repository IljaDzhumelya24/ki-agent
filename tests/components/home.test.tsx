import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SignalCoreFallback } from "@/components/three/signal-core-fallback";
import { ChannelStory } from "@/components/home/channel-story";
import { CapabilitySection } from "@/components/home/capability-section";
import { IndustryExplorer } from "@/components/home/industry-explorer";
import { FinalCta } from "@/components/home/final-cta";
import { SiteFooter } from "@/components/layout/site-footer";

describe("SiteHeader", () => {
  it("opens and closes an accessible menu without exposing broken future links", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.getByText("PLACEHOLDER/AI")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen
        .getByRole("button", { name: "Lösungen – in Vorbereitung" })
        .querySelector("svg"),
    ).toBeNull();

    await user.click(screen.getByRole("button", { name: "Menü öffnen" }));

    const dialog = screen.getByRole("dialog", { name: "Hauptnavigation" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getAllByRole("button", { name: /in Vorbereitung/i })).toHaveLength(4);
    expect(screen.queryByRole("button", { name: "Über uns – in Vorbereitung" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Lösungen" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Menü schließen" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hides while scrolling down and returns when scrolling up", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scroll-state", "shown");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 180 });
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-scroll-state", "hidden");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 96 });
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-scroll-state", "shown");
  });
});

describe("HeroSection", () => {
  it("keeps the black hole clear beneath a static hero headline", () => {
    const { container } = render(<HeroSection visual={<SignalCoreFallback />} />);

    expect(
      screen.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "KI, die zuhört, versteht und handelt." })).toHaveClass(
      "hero-flow-title",
    );
    expect(container.querySelector(".hero-flow-stream")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo starten" })).not.toBeInTheDocument();
  });
});

describe("homepage narrative", () => {
  it("keeps the homepage focused on story, value, industries and contact", () => {
    render(
      <>
        <ChannelStory />
        <CapabilitySection />
        <IndustryExplorer />
        <FinalCta />
        <SiteFooter />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Ein Kunde meldet sich." })).toBeInTheDocument();

    for (const heading of [
      "Kein Bot. Ein System, das handelt.",
      "Für Menschen im Betrieb. Nicht für Folien.",
      "Bereit, keinen Anruf mehr zu verlieren?",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    expect(document.querySelectorAll("#capabilities article")).toHaveLength(3);
    expect(document.querySelectorAll("#industries article")).toHaveLength(4);
    expect(screen.queryByRole("button", { name: /Branchen-Seite in Vorbereitung/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Wert, der sich messen lässt." })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Von der ersten Frage bis zum Go-live." })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Ein Einstieg, der mitwächst." })).not.toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.queryByText(/Kundenlogo|Testimonial/i)).not.toBeInTheDocument();
  });
});
