import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { copyWidgets } from "../api/widget";
import { getBoardClipboard, useBoardClipboard } from "./use-board-clipboard";
import { toNode } from "./widget-node";

vi.mock("../api/widget", () => ({ copyWidgets: vi.fn() }));

const nodes = ["text", "ai", "image"].map((type, index) => ({
    ...toNode({
        id: type,
        widget_type: type as "text" | "ai" | "image",
        title: type,
        content: "Content",
        x: index * 100,
        y: index * 50,
    }),
    selected: true,
}));
const edges = [
    { id: "selected", source: "text", target: "ai", selected: true },
    { id: "unselected", source: "image", target: "ai", selected: false },
    { id: "external", source: "outside", target: "ai", selected: true },
];

let container: HTMLDivElement;
let root: Root;
let boardId: string;
let enabled: boolean;
const flushWidgets = vi.fn();
const onPasted = vi.fn();

function Board() {
    const { error } = useBoardClipboard({
        boardId,
        enabled,
        nodes,
        edges,
        flushWidgets,
        onPasted,
    });
    return (
        <div>
            {error}
            <input />
            <textarea />
            <div contentEditable suppressContentEditableWarning>
                Editable
            </div>
        </div>
    );
}

const show = () => act(async () => root.render(<Board />));
const press = async (
    key: string,
    target: EventTarget = window,
    modifiers: KeyboardEventInit = { ctrlKey: true },
) => {
    const event = new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
        ...modifiers,
    });
    await act(async () => {
        target.dispatchEvent(event);
    });
    return event;
};

beforeEach(async () => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    vi.clearAllMocks();
    flushWidgets.mockResolvedValue(true);
    vi.mocked(copyWidgets).mockResolvedValue({ items: [], connections: [] });
    boardId = "board";
    enabled = true;
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await show();
});
afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    window.getSelection()?.removeAllRanges();
});

describe("board clipboard", () => {
    it("includes only selected connections whose two endpoints are selected", () => {
        expect(
            getBoardClipboard("board", nodes, edges)?.connection_ids,
        ).toEqual(["selected"]);
        expect(
            getBoardClipboard(
                "board",
                nodes.map((node) => ({ ...node, selected: node.id === "ai" })),
                edges,
            )?.connection_ids,
        ).toEqual([]);
        expect(getBoardClipboard("board", [], edges)).toBeNull();
    });

    it("flushes saves and pastes the copied selection with increasing offsets", async () => {
        await press("c");
        await press("v");
        expect(flushWidgets).toHaveBeenCalledWith(["text", "ai", "image"]);
        expect(copyWidgets).toHaveBeenLastCalledWith({
            board_id: "board",
            connection_ids: ["selected"],
            items: [
                { source_widget_id: "text", x: 40, y: 40 },
                { source_widget_id: "ai", x: 140, y: 90 },
                { source_widget_id: "image", x: 240, y: 140 },
            ],
        });
        expect(onPasted).toHaveBeenCalledOnce();
        await press("v");
        expect(vi.mocked(copyWidgets).mock.calls[1][0].items[0]).toEqual({
            source_widget_id: "text",
            x: 80,
            y: 80,
        });
    });

    it("supports the macOS command modifier", async () => {
        await press("c", window, { metaKey: true });
        await press("v", window, { metaKey: true });
        expect(copyWidgets).toHaveBeenCalledOnce();
    });

    it("leaves text editing and selected text to the native clipboard", async () => {
        await press("c");
        for (const field of container.querySelectorAll(
            "input, textarea, [contenteditable]",
        )) {
            expect((await press("c", field)).defaultPrevented).toBe(false);
            expect((await press("v", field)).defaultPrevented).toBe(false);
        }
        const range = document.createRange();
        range.selectNodeContents(container.querySelector("[contenteditable]")!);
        window.getSelection()?.addRange(range);
        expect((await press("v")).defaultPrevented).toBe(false);
        expect(copyWidgets).not.toHaveBeenCalled();
    });

    it("clears the clipboard when the board changes and ignores disabled boards", async () => {
        await press("c");
        boardId = "other";
        await show();
        await press("v");
        await press("c");
        enabled = false;
        await show();
        await press("v");
        expect(copyWidgets).not.toHaveBeenCalled();
    });

    it("reports save and copy failures without applying copies", async () => {
        await press("c");
        flushWidgets.mockResolvedValueOnce(false);
        await press("v");
        expect(copyWidgets).not.toHaveBeenCalled();
        vi.mocked(copyWidgets).mockRejectedValueOnce(
            new Error("Missing source"),
        );
        await press("v");
        expect(container.textContent).toContain("Could not paste");
        expect(onPasted).not.toHaveBeenCalled();
    });

    it("waits for saves and prevents overlapping pastes", async () => {
        let finishSave!: (value: boolean) => void;
        flushWidgets.mockReturnValueOnce(
            new Promise<boolean>((resolve) => {
                finishSave = resolve;
            }),
        );
        await press("c");
        await press("v");
        await press("v");
        expect(copyWidgets).not.toHaveBeenCalled();
        await act(async () => finishSave(true));
        expect(copyWidgets).toHaveBeenCalledOnce();
    });

    it("does not apply a copy response to another board", async () => {
        let finishCopy!: (value: { items: []; connections: [] }) => void;
        vi.mocked(copyWidgets).mockReturnValueOnce(
            new Promise((resolve) => {
                finishCopy = resolve;
            }),
        );
        await press("c");
        await press("v");
        boardId = "other";
        await show();
        await act(async () => finishCopy({ items: [], connections: [] }));
        expect(onPasted).not.toHaveBeenCalled();
    });
});
