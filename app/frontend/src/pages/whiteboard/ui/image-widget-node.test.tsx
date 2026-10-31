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
});
