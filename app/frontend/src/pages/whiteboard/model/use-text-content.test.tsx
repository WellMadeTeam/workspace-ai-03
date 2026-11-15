import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SaveWidgetContext } from "./save-widget";
import { useTextContent } from "./use-text-content";

const updateNodeData = vi.hoisted(() => vi.fn());
vi.mock("@xyflow/react", () => ({
    // Leave node updates pending until the test supplies their contents.
    useReactFlow: () => ({ updateNodeData }),
}));

const saveWidget = vi.fn();
let container: HTMLDivElement;
let root: Root;

function Editor({ content }: { content: string }) {
    return <textarea {...useTextContent("note", content)} />;
}

const show = async (content: string) => {
    await act(async () =>
        root.render(
            <SaveWidgetContext value={saveWidget}>
                <Editor content={content} />
            </SaveWidgetContext>,
        ),
    );
};

describe("text with delayed node updates", () => {
    beforeEach(async () => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        updateNodeData.mockClear();
        saveWidget.mockClear();
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
        await show("abcd");
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
    });

    it("keeps newer typing through intermediate echoes, then accepts remote updates", async () => {
        const field = container.querySelector("textarea")!;
        field.focus();
        const edit = async (value: string, caret: number) => {
            await act(async () => {
                Object.getOwnPropertyDescriptor(
                    HTMLTextAreaElement.prototype,
                    "value",
                )!.set!.call(field, value);
                field.setSelectionRange(caret, caret);
                field.dispatchEvent(new Event("input", { bubbles: true }));
            });
        };

        await edit("acd", 1);
        expect(field.value).toBe("acd");
        expect(field.selectionStart).toBe(1);
        await edit("aXcd", 2);

        await show("acd");
        expect(field.value).toBe("aXcd");
        expect(field.selectionStart).toBe(2);
        await show("aXcd");
        expect(field.selectionStart).toBe(2);
        expect(updateNodeData).toHaveBeenLastCalledWith("note", {
            content: "aXcd",
        });
        expect(saveWidget).toHaveBeenLastCalledWith(
            "note",
            { content: "aXcd" },
            500,
        );

        await show("XXaXcd");
        expect(field.value).toBe("XXaXcd");
        expect(field.selectionStart).toBe(4);
    });

    it("updates an unfocused editor without taking focus from another field", async () => {
        const otherField = document.createElement("input");
        container.append(otherField);
        otherField.focus();

        await show("new text");

        expect(container.querySelector("textarea")!.value).toBe("new text");
        expect(document.activeElement).toBe(otherField);
        expect(saveWidget).not.toHaveBeenCalled();
    });
});
