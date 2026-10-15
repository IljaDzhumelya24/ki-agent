import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";
import { SignalCoreFallback } from "@/components/three/signal-core-fallback";
import { SignalCoreBoundary } from "@/components/three/signal-core-loader";

describe("SiteHeader", () => {
  it("opens and closes an accessible menu without exposing broken future links", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.getByText("PLACEHOLDER/AI")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

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
      "#kontakt",
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
    const originalError = console.error;
    console.error = () => undefined;

    function BrokenScene(): never {
      throw new Error("WebGL scene failed");
    }

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

    console.error = originalError;
  });
});
