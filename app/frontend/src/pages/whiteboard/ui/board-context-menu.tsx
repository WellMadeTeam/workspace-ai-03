import { Dropdown, Kbd } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { Eraser, Eye, EyeOff, Trash2 } from "lucide-react";
import type { ConnectionEdge } from "../model/connection-edge";
import type { ContextMenuPosition } from "../model/use-board-context-menu";
import type { WidgetNode } from "../model/widget-node";

type BoardContextMenuProps = {
    position: ContextMenuPosition | null;
    widgetId: string | null;
    isHighlightedByMe: boolean;
    onHighlight: (widgetId: string) => void;
    onRemoveHighlight: (widgetId: string) => void;
    onClose: () => void;
    onClear: (ids: string[]) => void;
};

/** Actions for the selected elements and right-clicked block. */
export function BoardContextMenu({
    position,
    widgetId,
    isHighlightedByMe,
    onHighlight,
    onRemoveHighlight,
    onClose,
    onClear,
}: BoardContextMenuProps) {
    const { getNodes, getEdges, deleteElements } = useReactFlow<
        WidgetNode,
        ConnectionEdge
    >();

    if (!position) return null;
    const menuLabel = widgetId ? "Block actions" : "Selection actions";

    // Goes through onDelete, like the Backspace shortcut.
    const deleteSelection = () =>
        void deleteElements({
            nodes: getNodes().filter((node) => node.selected),
            edges: getEdges().filter((edge) => edge.selected),
        });

    return (
        // Keyed by the position, so a right click elsewhere reopens the menu
        // there instead of leaving it where it was.
        <Dropdown
            key={`${position.x},${position.y}`}
            isOpen
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            {/* An invisible point at the cursor that the menu is placed at. */}
            <Dropdown.Trigger
                aria-label={menuLabel}
                className="pointer-events-none fixed size-0! min-w-0! border-0! p-0! opacity-0"
                style={{ left: position.x, top: position.y }}
            />
            <Dropdown.Popover placement="bottom start">
                <Dropdown.Menu
                    aria-label={menuLabel}
                    onAction={(key) => {
                        if (key === "delete") deleteSelection();
                        if (key === "highlight" && widgetId)
                            onHighlight(widgetId);
                        if (key === "remove-highlight" && widgetId)
                            onRemoveHighlight(widgetId);
                        if (key === "clear") {
                            onClear(
                                getNodes()
                                    .filter((node) => node.selected)
                                    .map((node) => node.id),
                            );
                        }
                    }}
                >
                    {widgetId && (
                        <Dropdown.Item
                            id={
                                isHighlightedByMe
                                    ? "remove-highlight"
                                    : "highlight"
                            }
                            textValue={
                                isHighlightedByMe
                                    ? "Remove highlight"
                                    : "Highlight"
                            }
                        >
                            {isHighlightedByMe ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                            <span className="flex-1">
                                {isHighlightedByMe
                                    ? "Remove highlight"
                                    : "Highlight"}
                            </span>
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item id="clear" textValue="Clear">
                        <Eraser className="size-4" />
                        <span className="flex-1">Clear</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        id="delete"
                        textValue="Delete"
                        variant="danger"
                    >
                        <Trash2 className="size-4" />
                        <span className="flex-1">Delete</span>
                        <Kbd>
                            <Kbd.Abbr keyValue="delete" />
                        </Kbd>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}
