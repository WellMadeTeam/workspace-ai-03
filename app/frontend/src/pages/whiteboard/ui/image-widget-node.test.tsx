import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const renderDiagram = vi.hoisted(() => vi.fn());

vi.mock("../lib/render-diagram", () => ({ renderDiagram }));

import { ImageWidgetNode } from "./image-widget-node";

const CODE = "graph TD\n  A --> B";

let container: HTMLDivElement;
let root: Root;

const show = async () => {
    await act(async () =>
        root.render(
            <ReactFlowProvider>
                <ImageWidgetNode
                    id="image-id"
                    data={{
                        widget_type: "image",
                        label: "Diagram",
                        code: CODE,
                    }}
                    selected={false}
                />
            </ReactFlowProvider>,
        ),
    );
};

const press = async (element: Element | null | undefined) => {
    expect(element).toBeTruthy();
    await act(async () => (element as HTMLElement).click());
};

describe("ImageWidgetNode", () => {
    beforeEach(() => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
        renderDiagram.mockReset();
    });

    it("shows the diagram in the light theme for every member", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"></svg>`,
        }));

        await show();

        expect(renderDiagram).toHaveBeenCalledWith(
            expect.any(String),
            CODE,
            "default",
        );
        expect(container.querySelector('svg[id^="diagram-"]')).toBeTruthy();
        expect(
            container.querySelector('[aria-label="Open diagram"]'),
        ).toBeTruthy();
    });

    it("shows the error when the diagram cannot be rendered", async () => {
        renderDiagram.mockResolvedValue({ error: "Parse error on line 2" });

        await show();

        expect(container.textContent).toContain(
            "This diagram could not be rendered",
        );
        expect(container.textContent).toContain("Parse error on line 2");
        expect(
            container.querySelector('[aria-label="Open diagram"]'),
        ).toBeNull();
    });

    it("collapses and expands the picture, keeping the title", async () => {
        renderDiagram.mockImplementation(async (id: string) => ({
            svg: `<svg id="${id}"></svg>`,
        }));

        await show();
        const toggle = container.querySelector('[aria-label="Show diagram"]');
        const picture = container.querySelector('svg[id^="diagram-"]');

        expect(toggle?.getAttribute("aria-expanded")).toBe("true");
        expect(picture?.closest("[hidden]")).toBeNull();

        await press(toggle);

        expect(toggle?.getAttribute("aria-expanded")).toBe("false");
        expect(picture?.closest("[hidden]")).toBeTruthy();
        expect(
            container
                .querySelector('[aria-label="Image block title"]')
                ?.closest("[hidden]"),
        ).toBeNull();
        expect(
            container
                .querySelector('[aria-label="Open diagram"]')
                ?.closest("[hidden]"),
        ).toBeNull();

        await press(toggle);

        expect(toggle?.getAttribute("aria-expanded")).toBe("true");
        expect(picture?.closest("[hidden]")).toBeNull();
    });

    it("collapses the error of an invalid diagram", async () => {
        renderDiagram.mockResolvedValue({ error: "Parse error on line 2" });

        await show();
        await press(container.querySelector('[aria-label="Show diagram"]'));

        expect(container.querySelector("p")?.closest("[hidden]")).toBeTruthy();
    });
});
