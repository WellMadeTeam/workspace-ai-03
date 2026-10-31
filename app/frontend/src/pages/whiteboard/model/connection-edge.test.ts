import { describe, expect, it } from "vitest";

import type { WidgetType } from "../api/widget";
import { canConnect } from "./connection-edge";
import { toNode } from "./widget-node";

const node = (id: WidgetType) =>
    toNode({
        id,
        widget_type: id,
        title: id,
        content: "graph TD",
        x: 0,
        y: 0,
    });

const nodes = [node("ai"), node("text"), node("image")];

describe("canConnect with image blocks", () => {
    it("connects an image to an AI block", () => {
        expect(canConnect(nodes, [], "image", "ai")).toBe(true);
    });

    it("connects a text block to an image", () => {
        expect(canConnect(nodes, [], "text", "image")).toBe(true);
    });

    it("does not connect an AI block to an image", () => {
        expect(canConnect(nodes, [], "ai", "image")).toBe(false);
    });
});
