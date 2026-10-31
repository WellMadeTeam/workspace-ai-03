import { useCallback, useState, type MouseEvent } from "react";
import type {
    EdgeMouseHandler,
    NodeMouseHandler,
    OnEdgesChange,
    OnNodesChange,
} from "@xyflow/react";
import type { ConnectionEdge } from "./connection-edge";
import type { WidgetNode } from "./widget-node";

export type ContextMenuPosition = { x: number; y: number };

type ContextMenuState = {
    position: ContextMenuPosition;
    widgetId: string | null;
};

// A field the member is typing in keeps the browser's menu, for copy and paste.
const isEditingField = (target: EventTarget) =>
    (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement) &&
    !target.readOnly;

// Changes that select only the element with `selectedId` among `elements`.
const selectOnly = (
    elements: { id: string; selected?: boolean }[],
    selectedId: string | null,
) =>
    elements
        .filter((element) => !!element.selected !== (element.id === selectedId))
        .map((element) => ({
            id: element.id,
            type: "select" as const,
            selected: element.id === selectedId,
        }));

/**
 * Opens the board's context menu at the cursor on a right click on a block, a
 * connection or a selection. A right click outside the selection selects only
 * that element first; block-specific actions still target the block under the
 * cursor.
 */
export function useBoardContextMenu(
    nodes: WidgetNode[],
    edges: ConnectionEdge[],
    onNodesChange: OnNodesChange<WidgetNode>,
    onEdgesChange: OnEdgesChange<ConnectionEdge>,
) {
    const [menu, setMenu] = useState<ContextMenuState | null>(null);

    const close = useCallback(() => setMenu(null), []);

    const open = (event: MouseEvent, widgetId: string | null = null) => {
        if (isEditingField(event.target)) {
            close();
            return;
        }

        event.preventDefault();
        setMenu({
            position: { x: event.clientX, y: event.clientY },
            widgetId,
        });
    };

    const onNodeContextMenu: NodeMouseHandler<WidgetNode> = (event, node) => {
        if (!isEditingField(event.target) && !node.selected) {
            onNodesChange(selectOnly(nodes, node.id));
            onEdgesChange(selectOnly(edges, null));
        }
        open(event, node.id);
    };

    const onEdgeContextMenu: EdgeMouseHandler<ConnectionEdge> = (
        event,
        edge,
    ) => {
        if (!edge.selected) {
            onNodesChange(selectOnly(nodes, null));
            onEdgesChange(selectOnly(edges, edge.id));
        }
        open(event);
    };

    // Right click on the box around several selected blocks.
    const onSelectionContextMenu = (event: MouseEvent) => open(event);

    return {
        position: menu?.position ?? null,
        widgetId: menu?.widgetId ?? null,
        close,
        onNodeContextMenu,
        onEdgeContextMenu,
        onSelectionContextMenu,
    };
}
