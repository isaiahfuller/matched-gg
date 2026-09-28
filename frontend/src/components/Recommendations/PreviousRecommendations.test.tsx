// import { cleanup, fireEvent, screen } from "@testing-library/react";
// import { afterEach, expect, it, vi } from "vitest";
// import { render } from "../../test-utils/render";
// import PreviousRecommendations from "./PreviousRecommendations";

// afterEach(() => {
//   cleanup();
//   vi.unstubAllGlobals();
// });

// it("paginates recommendations without overlap and resets the page when searching", async () => {
//   vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
//     ok: true,
//     json: async () => Array.from({ length: 25 }, (_, index) => ({
//       game: { id: index, name: `Game ${String(index + 1).padStart(2, "0")}`, rating: 80 },
//     })),
//   }));
//   render(<PreviousRecommendations />);
//   expect(await screen.findByText("Game 01")).toBeInTheDocument();
//   expect(screen.queryByText("Game 25")).not.toBeInTheDocument();
//   fireEvent.click(screen.getByRole("button", { name: "2", exact: true }));
//   expect(screen.getByText("Game 25")).toBeInTheDocument();
//   expect(screen.queryByText("Game 24")).not.toBeInTheDocument();
//   fireEvent.change(screen.getByLabelText("Search your recommendations"), { target: { value: "game 01" } });
//   expect(screen.getByText("Game 01")).toBeInTheDocument();
//   expect(screen.getByText("1 of 25 games")).toBeInTheDocument();
// });

// it("recovers from request failures and shows the empty state", async () => {
//   vi.stubGlobal("fetch", vi.fn()
//     .mockResolvedValueOnce({ ok: false })
//     .mockResolvedValueOnce({ ok: true, json: async () => [] }));
//   render(<PreviousRecommendations />);
//   expect(await screen.findByRole("alert")).toHaveTextContent("Recommendations unavailable");
//   fireEvent.click(screen.getByRole("button", { name: "Try again" }));
//   expect(await screen.findByText("No recommendations yet!")).toBeInTheDocument();
// });
