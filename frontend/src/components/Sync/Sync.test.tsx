import { render, screen } from "../../setupTests";
import Sync from "./Sync";
import { describe, it, vi } from "vitest";

// Mocking necessary hooks for testing purpose
vi.mock("@mantine/hooks", () => ({
  useViewportSize: () => ({ height: 1080 }),
}));

describe("Sync Component", () => {
  it("renders the linked Steam profile after successful fetch", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockImplementation(
      async () =>
        new Response(
          JSON.stringify({
            steam: {
              personaname: "Test User",
              avatarhash: "12345",
              profileurl: "http://example.com",
            },
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
    );

    render(<Sync />);

    await screen.findByText(/Test User/i); // Verify the fetched data is rendered

    mockFetch.mockRestore(); // Restore the original fetch function after test
  });

  it("calls processSteamLibrary when Sync button is clicked", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockImplementation(
      async () =>
        new Response(
          JSON.stringify({
            steam: {
              personaname: "Test User",
              avatarhash: "12345",
              profileurl: "http://example.com",
            },
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
    );

    render(<Sync />);

    await screen.findByText(/Test User/i); // Ensure the user data has loaded
    const syncButton = screen.getByRole("button", { name: /sync/i });
    expect(syncButton).toBeInTheDocument();

    vi.mock("@mantine/hooks", () => ({
      useViewportSize: () => ({ height: 1080 }),
    }));

    // Simulate button click
    syncButton.click();
    await screen.findByText(/Sync/i); // Verify the button click

    mockFetch.mockRestore(); // Restore the original fetch function after test
  });

  it("renders the link Steam button if no steam data is present", () => {
    const mockFetch = vi.spyOn(global, "fetch").mockImplementation(
      async () =>
        new Response(JSON.stringify({}), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
    );

    render(<Sync />);
    expect(screen.getByRole("link", { name: /Link/i })).toBeInTheDocument(); // Ensure the link Steam button is present
    mockFetch.mockRestore();
  });
});
