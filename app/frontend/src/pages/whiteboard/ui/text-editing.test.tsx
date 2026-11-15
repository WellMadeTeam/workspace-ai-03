import { act, useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    type NodeProps,
} from "@xyflow/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SaveWidgetContext } from "../model/save-widget";
import type { TextWidgetNode as TextNode } from "../model/widget-node";
import { TextPanel } from "./text-panel";
import { TextWidgetNode } from "./text-widget-node";

const initialNode: TextNode = {
    id: "note",
    type: "widget",
    position: { x: 0, y: 0 },
    data: { widget_type: "text", label: "Note", content: "abcd" },
};
const nodeTypes = {
    widget: ({ id, data, selected }: NodeProps<TextNode>) => (
        <TextWidgetNode id={id} data={data} selected={selected} />
    ),
};
const saveWidget = vi.fn();
let receiveContent: (content: string) => void;
let refreshBoard: () => void;
let container: HTMLDivElement;
let root: Root;

function Board() {
    const [nodes, setNodes, onNodesChange] = useNodesState([initialNode]);
    const [, setRefresh] = useState(0);
    useEffect(() => {
        receiveContent = (content) =>
            setNodes((current) =>
                current.map((node) => ({
                    ...node,
                    data: { ...node.data, content },
                })),
            );
        refreshBoard = () => setRefresh((current) => current + 1);
    }, [setNodes]);

    return (
        <SaveWidgetContext value={saveWidget}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    nodeTypes={nodeTypes}
                >
                    <TextPanel node={nodes[0]!} />
                </ReactFlow>
            </ReactFlowProvider>
        </SaveWidgetContext>
    );
}

const contents = () =>
    [".react-flow__node", '[role="complementary"]'].map((selector) => {
        const surface = container.querySelector(selector)!;
        return (
            surface.querySelector("textarea")?.value ??
            surface.querySelector(".markdown-content")?.textContent
        );
    });

// Use the native setter to simulate the browser editing the value without
// changing React's value tracker. KeyboardEvent alone does not edit in jsdom.
async function edit(field: HTMLTextAreaElement, value: string, caret: number) {
    await act(async () => {
        Object.getOwnPropertyDescriptor(
            HTMLTextAreaElement.prototype,
            "value",
        )!.set!.call(field, value);
        field.setSelectionRange(caret, caret);
        field.dispatchEvent(new Event("input", { bubbles: true }));
    });
}

describe.each(["board", "side panel"])("text editing in the %s", (editor) => {
    let field: HTMLTextAreaElement;

    const startEditing = async () => {
        await act(async () => {
            if (editor === "board") {
                container
                    .querySelector(
                        '.react-flow__node [aria-label="Text block content"]',
                    )!
                    .dispatchEvent(
                        new MouseEvent("dblclick", { bubbles: true }),
                    );
            } else {
                container
                    .querySelector<HTMLButtonElement>(
                        '[aria-label="Edit text"]',
                    )!
                    .click();
            }
        });
        field = container.querySelector<HTMLTextAreaElement>(
            editor === "board"
                ? ".react-flow__node textarea"
                : '[role="complementary"] textarea',
        )!;
        expect(field).toBeTruthy();
        field.focus();
    };

    beforeEach(async () => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
        vi.stubGlobal("matchMedia", () => ({
            matches: false,
            addEventListener() {},
            removeEventListener() {},
        }));
        saveWidget.mockClear();
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
        await act(async () => root.render(<Board />));
        await startEditing();
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
        vi.unstubAllGlobals();
    });

    it("keeps Backspace inside a word in place through node updates and save echoes", async () => {
        field.setSelectionRange(2, 2);
        await edit(field, "acd", 1);

        expect(field.value).toBe("acd");
        expect(field.selectionStart).toBe(1);
        expect(field.selectionEnd).toBe(1);
        expect(contents()).toEqual(["acd", "acd"]);
        expect(saveWidget).toHaveBeenLastCalledWith(
            "note",
            { content: "acd" },
            500,
        );

        await act(async () => receiveContent("acd"));
        await act(async () => refreshBoard());

        expect(field.selectionStart).toBe(1);
        expect(document.activeElement).toBe(field);
    });

    it("keeps insertion and selected-text replacement inside the word", async () => {
        field.setSelectionRange(2, 2);
        await edit(field, "abXcd", 3);
        expect(field.selectionStart).toBe(3);
        expect(contents()).toEqual(["abXcd", "abXcd"]);

        field.setSelectionRange(1, 3);
        await edit(field, "aYcd", 2);
        expect(field.selectionStart).toBe(2);
        expect(field.selectionEnd).toBe(2);
        expect(contents()).toEqual(["aYcd", "aYcd"]);
    });

    it("opens the latest shared text after an update in preview mode", async () => {
        await act(async () => {
            if (editor === "board") field.blur();
            else
                container
                    .querySelector<HTMLButtonElement>(
                        '[aria-label="Preview text"]',
                    )!
                    .click();
        });
        await act(async () => receiveContent("shared **note**"));
        expect(contents()).toEqual(["shared note", "shared note"]);

        await startEditing();

        expect(field.value).toBe("shared **note**");
        expect(saveWidget).not.toHaveBeenCalled();
    });

    it("moves a backward selection with remote text inserted before it", async () => {
        field.setSelectionRange(2, 3, "backward");
        await act(async () => receiveContent("XXabcd"));

        expect(field.value).toBe("XXabcd");
        expect(field.selectionStart).toBe(4);
        expect(field.selectionEnd).toBe(5);
        expect(field.selectionDirection).toBe("backward");
        expect(document.activeElement).toBe(field);
        expect(saveWidget).not.toHaveBeenCalled();
    });

    it("keeps the caret valid when remote text removes its surrounding word", async () => {
        field.setSelectionRange(2, 2);
        await act(async () => receiveContent(""));

        expect(field.value).toBe("");
        expect(field.selectionStart).toBe(0);
        expect(document.activeElement).toBe(field);
    });

    it("defers incoming text until composition ends", async () => {
        await act(async () => {
            field.dispatchEvent(
                new CompositionEvent("compositionstart", { bubbles: true }),
            );
        });
        await act(async () => receiveContent("XXabcd"));
        expect(field.value).toBe("abcd");

        await act(async () => {
            field.dispatchEvent(
                new CompositionEvent("compositionend", { bubbles: true }),
            );
        });
        expect(field.value).toBe("XXabcd");
    });
});
