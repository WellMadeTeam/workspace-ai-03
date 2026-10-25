import { useCallback, useState, type MouseEvent } from "react";
import type { NodeMouseHandler, OnNodesChange } from "@xyflow/react";
import type { WidgetNode } from "./widget-node";

export type ContextMenuPosition = { x: number; y: number };

// A field the member is typing in keeps the browser's menu, for copy and paste.
const isEditingField = (target: EventTarget) =>
    (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement) &&
    !target.readOnly;

/**
 * Opens the board's context menu at the cursor on a right click on a block or
 * a selection. A right click on a block outside the selection selects only
 * that block first, so the menu always acts on the selection.
 */
export function useBoardContextMenu(
    nodes: WidgetNode[],
    onNodesChange: OnNodesChange<WidgetNode>,
) {
    const [position, setPosition] = useState<ContextMenuPosition | null>(null);

    const close = useCallback(() => setPosition(null), []);

    const open = (event: MouseEvent) => {
        if (isEditingField(event.target)) {
            close();
            return;
        }

        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
    };

    const onNodeContextMenu: NodeMouseHandler<WidgetNode> = (event, node) => {
        if (!isEditingField(event.target) && !node.selected) {
            onNodesChange(
                nodes
                    .filter(
                        (current) =>
                            !!current.selected !== (current.id === node.id),
                    )
                    .map((current) => ({
                        id: current.id,
                        type: "select",
                        selected: current.id === node.id,
                    })),
            );
        }
        open(event);
    };

    // Right click on the box around several selected blocks.
    const onSelectionContextMenu = (event: MouseEvent) => open(event);

    return { position, close, onNodeContextMenu, onSelectionContextMenu };
}
