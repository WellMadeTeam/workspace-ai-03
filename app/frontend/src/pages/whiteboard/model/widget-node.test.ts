import { describe, expect, it } from "vitest";

import type { Widget } from "../api/widget";
import { mergeNode, toNode } from "./widget-node";

const image: Widget = {
    id: "image-id",
    widget_type: "image",
    title: "Diagram",
    content: "graph TD\n  A --> B",
    x: 10,
    y: 20,
};

describe("image block nodes", () => {
    it("keep the diagram's code", () => {
        expect(toNode(image).data).toEqual({
            widget_type: "image",
            label: "Diagram",
            code: "graph TD\n  A --> B",
        });
    });

    it("are kept when the server sends the same block", () => {
        const node = toNode(image);

        expect(mergeNode(node, { ...image })).toBe(node);
    });

    it("are updated when the title changes", () => {
        const node = toNode(image);

        expect(mergeNode(node, { ...image, title: "Flow" }).data).toEqual({
            widget_type: "image",
            label: "Flow",
            code: "graph TD\n  A --> B",
        });
    });
});
