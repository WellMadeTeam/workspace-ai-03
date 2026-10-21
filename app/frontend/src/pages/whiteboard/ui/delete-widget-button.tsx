import { Button } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import type { WidgetNode } from "../model/widget-node";

type DeleteWidgetButtonProps = {
    id: string;
};

export function DeleteWidgetButton({ id }: DeleteWidgetButtonProps) {
    const { deleteElements } = useReactFlow<WidgetNode>();

    return (
        <Button
            size="sm"
            variant="danger"
            aria-label="Delete block"
            // Goes through onNodesDelete, like the Backspace shortcut.
            onPress={() => void deleteElements({ nodes: [{ id }] })}
        >
            <Trash2 className="size-4" />
            Delete
        </Button>
    );
}
