import { act, useLayoutEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { clearWidget, updateWidget, type Widget } from "../api/widget";
import { useBoardWidgets } from "./use-board-widgets";

const polling = vi.hoisted(() => ({
    onData: (_widgets: Widget[]) => {},
    refresh: vi.fn(),
}));
vi.mock("@/shared/lib", () => ({
    usePolling: (options: { onData: (widgets: Widget[]) => void }) => {
        polling.onData = options.onData;
        return polling.refresh;
    },
}));
vi.mock("../api/widget", () => ({
    updateWidget: vi.fn(),
    listWidgets: vi.fn(),
    createWidget: vi.fn(),
    clearWidget: vi.fn(),
    deleteWidget: vi.fn(),
}));

const widget: Widget = {
    id: "text",
    widget_type: "text",
    title: "Notes",
    content: "Saved",
    x: 0,
    y: 0,
};
let board: ReturnType<typeof useBoardWidgets>;
let root: Root;
function Board() {
    const state = useBoardWidgets("board");
    useLayoutEffect(() => {
        board = state;
    });
    return null;
}
beforeEach(async () => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    vi.clearAllMocks();
    vi.mocked(updateWidget).mockResolvedValue(widget);
    vi.mocked(clearWidget).mockResolvedValue(undefined);
    root = createRoot(document.createElement("div"));
    await act(async () => root.render(<Board />));
});
afterEach(async () => {
    await act(async () => root.unmount());
});

it("flushes debounced edits before the paste request can run", async () => {
    board.saveWidget("text", { content: "Latest text" }, 60_000);
    board.saveWidget("text", { title: "Latest title" }, 60_000);
    expect(updateWidget).not.toHaveBeenCalled();
    let saved = false;
    await act(async () => {
        saved = await board.flushWidgets(["text"]);
    });
    expect(saved).toBe(true);
    expect(updateWidget).toHaveBeenCalledExactlyOnceWith("text", {
        content: "Latest text",
        title: "Latest title",
    });
});

it("serializes edits and waits for both in-flight and queued saves", async () => {
    let finishFirst!: (widget: Widget) => void;
    vi.mocked(updateWidget).mockReturnValueOnce(
        new Promise((resolve) => {
            finishFirst = resolve;
        }),
    );
    board.saveWidget("text", { content: "First" }, 60_000);
    let first!: Promise<boolean>;
    await act(async () => {
        first = board.flushWidgets(["text"]);
    });
    board.saveWidget("text", { content: "Second" }, 60_000);
    let second!: Promise<boolean>;
    await act(async () => {
        second = board.flushWidgets(["text"]);
    });
    expect(updateWidget).toHaveBeenCalledTimes(1);
    await act(async () => {
        finishFirst(widget);
        await Promise.all([first, second]);
    });
    expect(updateWidget).toHaveBeenCalledTimes(2);
    expect(updateWidget).toHaveBeenLastCalledWith("text", {
        content: "Second",
    });
});

it("reports failed saves so a paste does not copy stale content", async () => {
    vi.mocked(updateWidget).mockRejectedValueOnce(new Error("Offline"));
    board.saveWidget("text", { content: "Unsaved" }, 60_000);
    let saved = true;
    await act(async () => {
        saved = await board.flushWidgets(["text"]);
    });
    expect(saved).toBe(false);
    await act(async () => {
        saved = await board.flushWidgets(["text"]);
    });
    expect(saved).toBe(true);
    expect(updateWidget).toHaveBeenLastCalledWith("text", {
        content: "Unsaved",
    });
});

it("selects new copies and keeps their selection through polling", async () => {
    await act(async () => polling.onData([widget]));
    const copy = { ...widget, id: "copy", x: 40, y: 40 };
    await act(async () => board.acceptCopies([copy]));
    expect(board.nodes.map((node) => [node.id, node.selected])).toEqual([
        ["text", false],
        ["copy", true],
    ]);
    await act(async () => polling.onData([widget, copy]));
    expect(board.nodes.find((node) => node.id === "copy")?.selected).toBe(true);
    expect(polling.refresh).toHaveBeenCalled();
});

it("clears after an active save and discards queued edits", async () => {
    let finishFirst!: (widget: Widget) => void;
    vi.mocked(updateWidget).mockReturnValueOnce(
        new Promise((resolve) => {
            finishFirst = resolve;
        }),
    );
    board.saveWidget("text", { content: "First" }, 60_000);
    let first!: Promise<boolean>;
    await act(async () => {
        first = board.flushWidgets(["text"]);
    });
    board.saveWidget("text", { content: "Second" }, 60_000);
    let queued!: Promise<boolean>;
    await act(async () => {
        queued = board.flushWidgets(["text"]);
    });
    let cleared!: Promise<void>;
    await act(async () => {
        cleared = board.clearWidgets(["text"]);
    });
    expect(clearWidget).not.toHaveBeenCalled();
    await act(async () => {
        finishFirst(widget);
        await Promise.all([first, queued, cleared]);
    });
    expect(updateWidget).toHaveBeenCalledTimes(1);
    expect(clearWidget).toHaveBeenCalledExactlyOnceWith("text");
    await act(async () => {
        await board.flushWidgets(["text"]);
    });
    expect(updateWidget).toHaveBeenCalledTimes(1);
});

it("does not retry a failed active save after the block is cleared", async () => {
    let rejectSave!: (error: Error) => void;
    vi.mocked(updateWidget).mockReturnValueOnce(
        new Promise((_resolve, reject) => {
            rejectSave = reject;
        }),
    );
    board.saveWidget("text", { content: "Old edit" }, 60_000);
    let saving!: Promise<boolean>;
    await act(async () => {
        saving = board.flushWidgets(["text"]);
    });
    let clearing!: Promise<void>;
    await act(async () => {
        clearing = board.clearWidgets(["text"]);
    });
    await act(async () => {
        rejectSave(new Error("Offline"));
        await Promise.all([saving, clearing]);
        await board.flushWidgets(["text"]);
    });
    expect(updateWidget).toHaveBeenCalledTimes(1);
    expect(clearWidget).toHaveBeenCalledOnce();
});

it("orders new edits after an active clear", async () => {
    let finishClear!: () => void;
    vi.mocked(clearWidget).mockReturnValueOnce(
        new Promise((resolve) => {
            finishClear = resolve;
        }),
    );
    let clearing!: Promise<void>;
    await act(async () => {
        clearing = board.clearWidgets(["text"]);
    });
    board.saveWidget("text", { content: "New edit" }, 60_000);
    let saving!: Promise<boolean>;
    await act(async () => {
        saving = board.flushWidgets(["text"]);
    });
    expect(updateWidget).not.toHaveBeenCalled();
    await act(async () => {
        finishClear();
        await Promise.all([clearing, saving]);
    });
    expect(updateWidget).toHaveBeenCalledExactlyOnceWith("text", {
        content: "New edit",
    });
});
