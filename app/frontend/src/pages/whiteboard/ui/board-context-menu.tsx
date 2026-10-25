import { Dropdown, Kbd } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import type { ConnectionEdge } from "../model/connection-edge";
import type { ContextMenuPosition } from "../model/use-board-context-menu";
import type { WidgetNode } from "../model/widget-node";

type BoardContextMenuProps = {
    position: ContextMenuPosition | null;
    onClose: () => void;
};

/** Actions for the selected blocks and connections, opened with a right click. */
export function BoardContextMenu({ position, onClose }: BoardContextMenuProps) {
    const { getNodes, getEdges, deleteElements } = useReactFlow<
        WidgetNode,
        ConnectionEdge
    >();

    if (!position) return null;

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
                aria-label="Selection actions"
                className="pointer-events-none fixed size-0! min-w-0! border-0! p-0! opacity-0"
                style={{ left: position.x, top: position.y }}
            />
            <Dropdown.Popover placement="bottom start">
                <Dropdown.Menu
                    aria-label="Selection actions"
                    onAction={(key) => {
                        if (key === "delete") deleteSelection();
                    }}
                >
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
