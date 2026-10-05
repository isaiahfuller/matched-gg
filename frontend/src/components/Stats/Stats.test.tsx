import { cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { render } from "../../test-utils/render";
import Stats from "./Stats";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const stats = { totalGames: 2, playedGames: 1, unplayedGames: 1, totalMinutes: 90, matchedGames: 1,
  mostPlayed: [{ steamId: 10, name: "Portal", minutes: 90 }],
  genres: [{ id: 1, name: "Puzzle", minutes: 90, games: 1 }], themes: [], tags: [] };

it("shows playtime, game rankings and category coverage", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => stats }));
  render(<Stats />);
  expect(await screen.findByRole("link", { name: "1. Portal" })).toHaveAttribute("href", "https://store.steampowered.com/app/10");
  expect(screen.getByText("Puzzle")).toBeInTheDocument();
  expect(screen.getAllByText("1.5 h")).toHaveLength(3);
  expect(screen.getByText(/Metadata matched for 1 of 2 games/)).toBeInTheDocument();
});

it("retries failed loads and explains an empty library", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true, json: async () => ({ ...stats, totalGames: 0 }) }));
  render(<Stats />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Stats unavailable");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByText(/No synced games yet/)).toBeInTheDocument();
});
