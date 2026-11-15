import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { copyWidgets, type WidgetCopy, type WidgetCopies } from "../api/widget";
import type { ConnectionEdge } from "./connection-edge";
import type { WidgetNode } from "./widget-node";

const PASTE_OFFSET = 40;

export const isTextClipboardTarget = (target: EventTarget | null) =>
    target instanceof Element &&
    !!target.closest(
        "input, textarea, [contenteditable]:not([contenteditable='false'])",
    );

export function getBoardClipboard(
    boardId: string,
    nodes: WidgetNode[],
    edges: ConnectionEdge[],
): WidgetCopy | null {
    const selected = nodes.filter((node) => node.selected);
    if (!selected.length) return null;
    const ids = new Set(selected.map((node) => node.id));
    return {
        board_id: boardId,
        items: selected.map((node) => ({
            source_widget_id: node.id,
            x: node.position.x,
            y: node.position.y,
        })),
        connection_ids: edges
            .filter(
                (edge) =>
                    edge.selected &&
                    ids.has(edge.source) &&
                    ids.has(edge.target),
            )
            .map((edge) => edge.id),
    };
}

type BoardClipboardOptions = {
    boardId: string | null;
    enabled: boolean;
    nodes: WidgetNode[];
    edges: ConnectionEdge[];
    flushWidgets: (ids: string[]) => Promise<boolean>;
    onPasted: (copies: WidgetCopies) => void;
};

export function useBoardClipboard(options: BoardClipboardOptions) {
    const latest = useRef(options);
    const clipboard = useRef<WidgetCopy | null>(null);
    const pasteCount = useRef(0);
    const pasting = useRef(false);
    const boardSession = useRef(0);
    const [failure, setFailure] = useState<{
        boardId: string;
        message: string;
    } | null>(null);

    useLayoutEffect(() => {
        latest.current = options;
    });

    useLayoutEffect(() => {
        boardSession.current += 1;
        clipboard.current = null;
        pasteCount.current = 0;
        return () => {
            boardSession.current += 1;
        };
    }, [options.boardId]);

    useEffect(() => {
        const paste = async (
            selection: WidgetCopy,
            offset: number,
            session: number,
        ) => {
            const isCurrentBoard = () => boardSession.current === session;
            try {
                const saved = await latest.current.flushWidgets(
                    selection.items.map((item) => item.source_widget_id),
                );
                if (!saved) throw new Error("Could not save the source blocks");
                if (!isCurrentBoard() || !latest.current.enabled) return;
                const copies = await copyWidgets({
                    ...selection,
                    items: selection.items.map((item) => ({
                        ...item,
                        x: item.x + offset,
                        y: item.y + offset,
                    })),
                });
                if (!isCurrentBoard() || !latest.current.enabled) return;
                latest.current.onPasted(copies);
                if (clipboard.current === selection) pasteCount.current += 1;
                setFailure(null);
            } catch {
                if (isCurrentBoard())
                    setFailure({
                        boardId: selection.board_id,
                        message:
                            "Could not paste the blocks. Check that the originals still exist and try again.",
                    });
            } finally {
                pasting.current = false;
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            const current = latest.current;
            if (
                !current.enabled ||
                !current.boardId ||
                event.defaultPrevented ||
                !(event.ctrlKey || event.metaKey) ||
                event.altKey ||
                event.shiftKey ||
                event.isComposing ||
                isTextClipboardTarget(event.target) ||
                window.getSelection()?.toString() ||
                document.querySelector('[role="dialog"], [role="alertdialog"]')
            )
                return;

            if (event.key.toLowerCase() === "c") {
                const selection = getBoardClipboard(
                    current.boardId,
                    current.nodes,
                    current.edges,
                );
                clipboard.current = selection;
                pasteCount.current = 0;
                if (selection) {
                    event.preventDefault();
                    setFailure(null);
                }
            } else if (event.key.toLowerCase() === "v") {
                const selection = clipboard.current;
                if (!selection || selection.board_id !== current.boardId)
                    return;
                event.preventDefault();
                if (pasting.current || event.repeat) return;
                pasting.current = true;
                const offset = (pasteCount.current + 1) * PASTE_OFFSET;
                void paste(selection, offset, boardSession.current);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return {
        error: failure?.boardId === options.boardId ? failure.message : null,
    };
}
