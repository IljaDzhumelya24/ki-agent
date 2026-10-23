import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChannelStory } from "@/components/home/channel-story";

describe("ChannelStory phone preview", () => {
  it("presents the scroll story as three concise process steps", () => {
    render(<ChannelStory />);

    expect(screen.getByRole("heading", { name: "Ein Kunde meldet sich." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Der Agent versteht." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Der Termin steht." })).toBeInTheDocument();
  });

  it("shows a useful reply and the agent's next action instead of an empty chat", () => {
    render(<ChannelStory />);

    expect(screen.getAllByText(/welches zeitfenster passt ihnen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/freie termine prüfen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/an dein team übergeben/i).length).toBeGreaterThan(0);
  });
});
