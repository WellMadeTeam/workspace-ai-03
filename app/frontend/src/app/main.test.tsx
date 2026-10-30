import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const rootCapture = vi.hoisted(
    (): { current: { unmount: () => void } | null } => ({ current: null }),
);

vi.mock("react-dom/client", async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-dom/client")>();

    return {
        ...actual,
        createRoot: (...args: Parameters<typeof actual.createRoot>) => {
            const root = actual.createRoot(...args);
            rootCapture.current = root;
            return root;
        },
    };
});

vi.mock("../pages/whiteboard/model/use-board-connection", () => ({
    useBoardConnection: () => ({
        connection: { status: "live" },
        retry: vi.fn(),
    }),
}));

const jsonResponse = (body: unknown) => ({
    ok: true,
    status: 200,
    json: async () => body,
});

describe("frontend entry point", () => {
    afterEach(async () => {
        if (rootCapture.current) {
            await act(async () => rootCapture.current?.unmount());
            rootCapture.current = null;
        }
        vi.unstubAllGlobals();
    });

    it("mounts the whiteboard route", async () => {
        document.body.innerHTML = '<div id="root"></div>';
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({
                matches: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            })),
        );
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
        vi.stubGlobal(
            "fetch",
            vi.fn(async (input: RequestInfo | URL) => {
                const url = String(input);

                if (url === "/api/boards") {
                    return jsonResponse({ id: "test-board", title: "Test" });
                }
                if (url.startsWith("/api/widgets?")) {
                    return jsonResponse({ items: [] });
                }
                if (url.startsWith("/api/connections?")) {
                    return jsonResponse([]);
                }

                throw new Error(`Unexpected request: ${url}`);
            }),
        );

        await import("./main");

        await vi.waitFor(() => {
            expect(
                document.querySelector('[aria-label="Whiteboard tools"]'),
            ).not.toBeNull();
        });
    });
});
