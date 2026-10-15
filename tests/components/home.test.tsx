import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SignalCoreFallback } from "@/components/three/signal-core-fallback";
import { ChannelStory } from "@/components/home/channel-story";
import { CapabilitySection } from "@/components/home/capability-section";
import { IndustryExplorer } from "@/components/home/industry-explorer";
import { RoiSection } from "@/components/home/roi-section";
import { ProcessSection } from "@/components/home/process-section";
import { PricingPreview } from "@/components/home/pricing-preview";
import { FinalCta } from "@/components/home/final-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { homeContent } from "@/content/home";

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
  it("pairs the black-hole artwork with a memorable gravity headline", () => {
    render(<HeroSection visual={<SignalCoreFallback />} />);

    expect(
      screen.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Keine Anfrage entkommt." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Demo starten" })).not.toBeInTheDocument();
  });
});

describe("homepage narrative", () => {
  it("renders every substantive section from the approved content", () => {
    render(
      <>
        <ChannelStory />
        <CapabilitySection />
        <IndustryExplorer />
        <RoiSection />
        <ProcessSection />
        <PricingPreview />
        <FinalCta />
        <SiteFooter />
      </>,
    );

    for (const heading of [
      "Vier Türen. Ein Gehirn.",
      "Kein Bot. Ein System, das handelt.",
      "Gebaut für den echten Betrieb.",
      "Wert, der sich messen lässt.",
      "Von der ersten Frage bis zum Go-live.",
      "Ein Einstieg, der mitwächst.",
      "Bereit, keinen Anruf mehr zu verlieren?",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    expect(
      screen.getAllByRole("button", { name: /Branchen-Seite in Vorbereitung/i }),
    ).toHaveLength(8);
    for (const industry of homeContent.industries) {
      expect(screen.getByText(industry.problem)).toBeInTheDocument();
    }
    for (const metric of homeContent.roi) {
      expect(screen.getByText(metric.qualifier)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("listitem", { name: /Prozessschritt/i })).toHaveLength(5);
    expect(screen.getAllByRole("article", { name: /Paket/i })).toHaveLength(3);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.queryByText(/Kundenlogo|Testimonial/i)).not.toBeInTheDocument();
  });
});
