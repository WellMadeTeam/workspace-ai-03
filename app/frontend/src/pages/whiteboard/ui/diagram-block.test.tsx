import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const renderDiagram = vi.hoisted(() => vi.fn());

vi.mock("../lib/render-diagram", () => ({ renderDiagram }));

import { AddDiagramContext } from "../model/add-diagram";
import { DiagramBlock } from "./diagram-block";

const CODE = "graph TD\n  A --> B";
// The rendered diagram, not an icon.
const DIAGRAM = 'svg[id^="diagram-"]';

let container: HTMLDivElement;
let root: Root;

const show = async (addDiagram?: (code: string) => Promise<boolean>) => {
    await act(async () =>
        root.render(
            <AddDiagramContext value={addDiagram ?? null}>
                <DiagramBlock code={CODE} />
            </AddDiagramContext>,
        ),
    );
};

const press = async (element: Element | null | undefined) => {
    expect(element).toBeTruthy();
    await act(async () => {
        element?.dispatchEvent(
            new PointerEvent("pointerdown", { bubbles: true }),
        );
        element?.dispatchEvent(
            new PointerEvent("pointerup", { bubbles: true }),
        );
        (element as HTMLElement).click();
    });
};

const byLabel = (label: string) => [
    ...document.querySelectorAll(`[aria-label="${label}"]`),
];

const tab = (name: string) =>
    [...container.querySelectorAll('[role="tab"]')].find(
        (element) => element.textContent === name,
    );

describe("DiagramBlock", () => {
    beforeEach(() => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        // The tabs and the modal measure and animate themselves, which
        // jsdom cannot do.
        Element.prototype.getAnimations ??= () => [];
        vi.stubGlobal("CSS", {
            escape: (value: string) => value,
            supports: () => false,
        });
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
        renderDiagram.mockReset();
        vi.unstubAllGlobals();
    });

    it("shows the picture first and the code on the Code tab", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"><style>#${id} .node{}</style></svg>`,
        }));

        await show();

        expect(container.querySelector(DIAGRAM)).toBeTruthy();
        expect(tab("Diagram")?.getAttribute("aria-selected")).toBe("true");

        await press(tab("Code"));

        expect(container.querySelector("pre")?.textContent).toBe(CODE);
    });

    it("opens the picture in a modal with its own ids", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"></svg>`,
        }));

        await show();
        const id = container.querySelector(DIAGRAM)?.id;
        await press(byLabel("Open diagram")[0]);

        const dialog = document.querySelector('[role="dialog"]');
        expect(dialog?.querySelector(DIAGRAM)?.id).toBe(`${id}-full`);
        expect(dialog?.querySelectorAll('[role="tab"]')).toHaveLength(2);
    });

    it("adds the diagram to the board", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"></svg>`,
        }));
        const addDiagram = vi.fn().mockResolvedValue(true);

        await show(addDiagram);
        await press(byLabel("Add to board")[0]);

        expect(addDiagram).toHaveBeenCalledWith(CODE);
        expect(container.textContent).toContain("Added to the board");
    });

    it("offers no adding outside an AI block's panel", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"></svg>`,
        }));

        await show();

        expect(byLabel("Add to board")).toHaveLength(0);
    });

    it("shows the code and the error when the diagram is invalid", async () => {
        renderDiagram.mockResolvedValue({ error: "Parse error on line 2" });

        await show();

        expect(container.textContent).toContain(
            "This diagram could not be rendered",
        );
        expect(container.textContent).toContain("Parse error on line 2");
        expect(container.querySelector("pre")?.textContent).toBe(CODE);
        expect(byLabel("Open diagram")).toHaveLength(0);
    });
});
