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
 * connection or a selection. A right click on a block or a connection outside
 * the selection selects only it first, so the menu always acts on the
 * selection.
 */
export function useBoardContextMenu(
    nodes: WidgetNode[],
    edges: ConnectionEdge[],
    onNodesChange: OnNodesChange<WidgetNode>,
    onEdgesChange: OnEdgesChange<ConnectionEdge>,
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
            onNodesChange(selectOnly(nodes, node.id));
            onEdgesChange(selectOnly(edges, null));
        }
        open(event);
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
        position,
        close,
        onNodeContextMenu,
        onEdgeContextMenu,
        onSelectionContextMenu,
    };
}
