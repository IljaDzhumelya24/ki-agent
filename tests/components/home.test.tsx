import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SignalCoreFallback } from "@/components/three/signal-core-fallback";
import { SignalCoreBoundary } from "@/components/three/signal-core-loader";
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
    expect(within(dialog).getAllByRole("button", { name: /in Vorbereitung/i })).toHaveLength(5);
    expect(screen.queryByRole("link", { name: "Lösungen" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Menü schließen" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("HeroSection", () => {
  it("keeps the promise, actions, channels, and fallback artwork visible", () => {
    render(<HeroSection visual={<SignalCoreFallback />} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Ein Agent. Jeder Kanal. Keine Anfrage verloren.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Demo starten" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(
      screen.getByRole("link", { name: "System entdecken" }),
    ).toHaveAttribute("href", "#channels");

    for (const channel of ["Telefon", "WhatsApp", "Website-Chat", "Team-App"]) {
      expect(screen.getByText(channel)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("img", { name: "Abstrakter KI-Agent mit vier verbundenen Kanälen" }),
    ).toBeInTheDocument();
  });

  it("preserves the hero and fallback artwork when the 3D scene fails", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    function BrokenScene(): never {
      throw new Error("WebGL scene failed");
    }

    try {
      render(
        <HeroSection
          visual={
            <SignalCoreBoundary>
              <BrokenScene />
            </SignalCoreBoundary>
          }
        />,
      );

      expect(
        screen.getByRole("heading", { level: 1, name: /Ein Agent/ }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Demo starten" })).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "Abstrakter KI-Agent mit vier verbundenen Kanälen" }),
      ).toBeInTheDocument();
    } finally {
      errorSpy.mockRestore();
    }
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
