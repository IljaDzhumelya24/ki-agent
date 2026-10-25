import { describe, expect, it } from "vitest";

import { homeContent } from "@/content/home";

describe("homeContent", () => {
  it("models the four promised access channels", () => {
    expect(homeContent.channels.map((channel) => channel.id)).toEqual([
      "phone",
      "whatsapp",
      "website",
      "team",
    ]);
  });

  it("offers eight distinct industry paths", () => {
    const slugs = homeContent.industries.map((industry) => industry.slug);

    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
  });

  it("gives the hero one primary and one secondary action", () => {
    expect(homeContent.hero.actions.map((action) => action.kind)).toEqual([
      "primary",
      "secondary",
    ]);
  });

  it("labels every ROI value as an example rather than a guarantee", () => {
    expect(homeContent.roi).not.toHaveLength(0);
    expect(
      homeContent.roi.every((metric) => metric.qualifier.trim().length > 0),
    ).toBe(true);
  });

  it("links finished pages and keeps only future destinations planned", () => {
    expect(homeContent.navigation.filter((item) => item.status === "live").map((item) => item.href)).toEqual([
      "/loesungen",
      "/branchen",
      "/preise",
    ]);
    expect(homeContent.navigation.every((item) => item.status === "live")).toBe(true);
  });
});
