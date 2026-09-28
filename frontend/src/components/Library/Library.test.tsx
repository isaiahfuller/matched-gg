import { cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { render } from "../../test-utils/render";
import Library from "./Library";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows owned games, including unplayed games, and searches by name", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { appid: 10, name: "Portal", playtime_forever: 90 },
      { appid: 20, name: "Half-Life", playtime_forever: 0 },
    ],
  }));
  render(<Library />);
  expect(await screen.findByRole("link", { name: "Portal" })).toHaveAttribute("href", "https://store.steampowered.com/app/10");
  expect(screen.getByText("Not played yet")).toBeInTheDocument();
  expect(screen.getByText("1.5 hours played")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Search your library"), { target: { value: "PORT" } });
  expect(screen.queryByRole("link", { name: "Half-Life" })).not.toBeInTheDocument();
  expect(screen.getByText("1 of 2 games")).toBeInTheDocument();
});

it("allows retrying a failed request and displays an empty library", async () => {
  vi.stubGlobal("fetch", vi.fn()
    .mockResolvedValueOnce({ ok: false })
    .mockResolvedValueOnce({ ok: true, json: async () => [] }));
  render(<Library />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Library unavailable");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByText("No games found in your Steam library yet.")).toBeInTheDocument();
});
