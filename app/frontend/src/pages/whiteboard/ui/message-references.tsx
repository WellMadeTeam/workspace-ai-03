import { useEffect, useRef, useState } from "react";
import { Button, Popover } from "@heroui/react";
import { useNodesData } from "@xyflow/react";
import { Link2 } from "lucide-react";
import { useGoToNode } from "../model/use-go-to-node";
import { getNodeTitle, type WidgetNode } from "../model/widget-node";

// Lets the pointer move from the trigger to the popover without closing it.
const HOVER_CLOSE_DELAY_MS = 150;

// "hover" closes when the pointer leaves; "pinned" was opened by a press and
// stays open until a press outside or Escape.
type OpenMode = "hover" | "pinned" | null;

type MessageReferencesProps = {
    references: string[];
};

/** How many blocks an AI answer used, with a list of them to go to. */
export function MessageReferences({ references }: MessageReferencesProps) {
    const goToNode = useGoToNode();
    // Only the blocks still on the board are returned.
    const nodes = useNodesData<WidgetNode>(references);
    const [openMode, setOpenMode] = useState<OpenMode>(null);
    const closeTimerRef = useRef<number | undefined>(undefined);

    const cancelClose = () => window.clearTimeout(closeTimerRef.current);

    const scheduleClose = () => {
        cancelClose();
        closeTimerRef.current = window.setTimeout(
            () => setOpenMode((mode) => (mode === "hover" ? null : mode)),
            HOVER_CLOSE_DELAY_MS,
        );
    };

    useEffect(() => cancelClose, []);

    const firstNodeId = references.find((id) =>
        nodes.some((node) => node.id === id),
    );
    const count = references.length;
    const label = `Used ${count} ${count === 1 ? "block" : "blocks"}`;

    return (
        <Popover
            isOpen={openMode !== null}
            onOpenChange={(isOpen) =>
                // A press on the trigger while the popover is open on hover
                // keeps it open instead of closing it.
                setOpenMode(isOpen || openMode === "hover" ? "pinned" : null)
            }
        >
            <Button
                size="sm"
                variant="ghost"
                className="h-auto min-w-0 gap-1 px-3 py-0.5 text-xs opacity-70"
                onHoverStart={() => {
                    cancelClose();
                    setOpenMode((mode) => mode ?? "hover");
                }}
                onHoverEnd={scheduleClose}
            >
                <Link2 className="size-3" aria-hidden />
                {label}
            </Button>
            <Popover.Content
                placement="bottom start"
                // On hover the popover must not block the board or take the
                // focus from the message composer.
                isNonModal={openMode === "hover"}
                className="max-w-64"
            >
                <ul
                    aria-label="Blocks used in the answer"
                    className="flex flex-col p-1"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                >
                    {references.map((id) => {
                        const node = nodes.find((item) => item.id === id);

                        return (
                            <li key={id}>
                                {node ? (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        fullWidth
                                        className="justify-start"
                                        // Lets keyboard users reach the list.
                                        autoFocus={
                                            openMode === "pinned" &&
                                            id === firstNodeId
                                        }
                                        onPress={() => {
                                            setOpenMode(null);
                                            goToNode(id);
                                        }}
                                    >
                                        <span className="truncate">
                                            {getNodeTitle(node.data)}
                                        </span>
                                    </Button>
                                ) : (
                                    <p className="px-3 py-1.5 text-sm italic opacity-60">
                                        Deleted block
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Popover.Content>
        </Popover>
    );
}
