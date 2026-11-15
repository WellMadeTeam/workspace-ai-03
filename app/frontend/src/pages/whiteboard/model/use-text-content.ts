import {
    use,
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";
import { useReactFlow } from "@xyflow/react";
import { SaveWidgetContext } from "./save-widget";
import type { WidgetNode } from "./widget-node";

const SAVE_CONTENT_DELAY_MS = 500;

// Treat an incoming text change as one replacement, leaving the common
// prefix and suffix alone. Positions after it follow the same text.
function movePosition(position: number, previous: string, next: string) {
    // Find where the unchanged prefix ends and the replacement starts.
    let start = 0;
    while (
        start < previous.length &&
        start < next.length &&
        previous[start] === next[start]
    )
        start++;

    // Walk backward over the unchanged suffix to find both replacement ends.
    let end = previous.length;
    let nextEnd = next.length;
    while (
        end > start &&
        nextEnd > start &&
        previous[end - 1] === next[nextEnd - 1]
    ) {
        end--;
        nextEnd--;
    }

    // Before the replacement: keep the offset. After it: follow the same text
    // by adding the length difference. Inside it: move to the replacement end.
    // Example: "abcd" -> "XXabcd" moves a caret after "ab" from 2 to 4.
    if (position <= start) return position;
    if (position >= end) return position + nextEnd - end;
    return nextEnd;
}

/**
 * Supplies textarea props for both the board editor and the side panel.
 * `content` is the text arriving through React Flow; `value` is the local
 * text rendered immediately while React Flow's queued updates catch up.
 * Autosave persists edits separately and does not control the textarea.
 */
export function useTextContent(id: string, content: string) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const fieldRef = useRef<HTMLTextAreaElement>(null);
    // A controlled textarea needs its value updated during onChange.
    // Waiting for node data can make React restore old text and move the caret.
    const [value, setValue] = useState(content);
    const [isComposing, setIsComposing] = useState(false);
    // Latest local text not yet echoed by node data, rather than an unsaved
    // server request. `null` means caught up; an empty string is a valid edit.
    const pendingContent = useRef<string | null>(null);
    // Selection to restore AFTER an incoming value reaches the DOM. The value
    // identifies the render it belongs to; direction preserves backward drags.
    const selection = useRef<{
        value: string;
        start: number;
        end: number;
        direction: "forward" | "backward" | "none";
        scrollTop: number;
        scrollLeft: number;
    } | null>(null);

    // Reconcile incoming node content before the browser paints. Local typing
    // already updates `value` directly, so its matching echo needs no DOM write.
    useLayoutEffect(() => {
        // Several keystrokes may happen before node data catches up. Ignore
        // intermediate echoes until it contains our most recent local text.
        if (pendingContent.current !== null) {
            if (content !== pendingContent.current) return;
            pendingContent.current = null;
        }
        // Do not replace text while an input method is building a character.
        // Changing isComposing to false reruns this effect with current content.
        if (isComposing) return;

        const field = fieldRef.current;
        // Preview mode unmounts the textarea. Keep its draft current so the
        // next switch to editing starts with the latest shared text.
        if (!field) {
            setValue(content);
            return;
        }
        if (field.value !== content) {
            // Capture offsets against the old DOM value, before setValue applies
            // the incoming text. Unfocused editors only need their text updated.
            if (document.activeElement === field) {
                selection.current = {
                    value: content,
                    start: movePosition(
                        field.selectionStart,
                        field.value,
                        content,
                    ),
                    end: movePosition(field.selectionEnd, field.value, content),
                    direction: field.selectionDirection,
                    scrollTop: field.scrollTop,
                    scrollLeft: field.scrollLeft,
                };
            }
            setValue(content);
        }
    }, [content, isComposing]);

    // The preceding effect schedules a second render for incoming text.
    // Restore only once that text is in the DOM, still before the next paint.
    useLayoutEffect(() => {
        const field = fieldRef.current;
        const saved = selection.current;
        if (!field || !saved || field.value !== saved.value) return;
        selection.current = null;
        // Updating one editor must not take focus from the other editor.
        if (document.activeElement !== field) return;
        field.setSelectionRange(saved.start, saved.end, saved.direction);
        field.scrollTop = saved.scrollTop;
        field.scrollLeft = saved.scrollLeft;
    }, [value]);

    return {
        ref: fieldRef,
        value,
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
            const next = event.currentTarget.value;
            // The browser already placed the caret for this edit. Discard any
            // restoration prepared for an earlier incoming value.
            selection.current = null;
            pendingContent.current = next;
            // Keep this synchronous: it is what prevents the caret jump.
            setValue(next);
            // Then share the edit with the other editor and debounce persistence.
            updateNodeData(id, { content: next });
            saveWidget(id, { content: next }, SAVE_CONTENT_DELAY_MS);
        },
        onCompositionStart: () => setIsComposing(true),
        onCompositionEnd: () => setIsComposing(false),
    };
}
