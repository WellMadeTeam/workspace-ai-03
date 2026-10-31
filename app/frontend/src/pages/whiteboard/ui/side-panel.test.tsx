import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { SidePanel } from "./side-panel";

let container: HTMLDivElement;
let root: Root;

const show = async () => {
    await act(async () =>
        root.render(<SidePanel label="Panel">Content</SidePanel>),
    );
};

const handle = () =>
    container.querySelector<HTMLElement>('[role="separator"]')!;

const panelWidth = () =>
    container.querySelector<HTMLElement>('[role="complementary"]')!.style.width;

const press = async (key: string) => {
    await act(async () => {
        handle().dispatchEvent(
            new KeyboardEvent("keydown", { key, bubbles: true }),
        );
    });
};

describe("SidePanel", () => {
    beforeEach(() => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
    });

    it("is never narrower than it was before it could be resized", async () => {
        await show();
        await press("Home");
        await press("ArrowRight");

        expect(panelWidth()).toBe("320px");
        expect(handle().getAttribute("aria-valuenow")).toBe("320");
    });

    it("widens from the keyboard up to the window's width", async () => {
        await show();
        await press("Home");
        await press("ArrowLeft");

        expect(panelWidth()).toBe("352px");

        await press("End");

        expect(panelWidth()).toBe(`${window.innerWidth - 32}px`);
    });

    it("keeps its width for the next block's panel", async () => {
        await show();
        await press("Home");
        await press("ArrowLeft");
        await act(async () => root.unmount());

        root = createRoot(container);
        await show();

        expect(panelWidth()).toBe("352px");
        expect(localStorage.getItem("side-panel-width")).toBe("352");
    });
});
