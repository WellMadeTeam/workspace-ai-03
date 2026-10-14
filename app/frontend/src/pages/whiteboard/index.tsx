import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    Panel,
    ReactFlow,
    type NodeTypes,
    type OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Surface } from "@heroui/react";
import { createBoard } from "./api.ts";
import { SaveWidgetContext } from "./save-widget-context.ts";
import { WhiteboardToolbar } from "./toolbar.tsx";
import type { WidgetNode } from "./types.ts";
import { useBoardWidgets } from "./use-board-widgets.ts";
import { WidgetNodeView } from "./widget-node.tsx";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

const BOARD_PARAM = "board";

export function WhiteboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const boardId = searchParams.get(BOARD_PARAM);
    const { nodes, onNodesChange, error, refresh, saveWidget } = useBoardWidgets(boardId);

    // Save the final position of every dragged node (several when a selection is dragged).
    const onNodeDragStop: OnNodeDrag<WidgetNode> = (_event, _node, draggedNodes) => {
        for (const { id, position } of draggedNodes) {
            saveWidget(id, { x: position.x, y: position.y });
        }
    };

    // The ref survives StrictMode's double effect run, so only one board is created.
    const isCreatingBoard = useRef(false);

    // On the first visit without a board in the URL, create one and remember
    // its id in the query parameters. An existing id is never replaced.
    useEffect(() => {
        if (boardId || isCreatingBoard.current) return;
        isCreatingBoard.current = true;

        createBoard("Untitled board")
            .then(({ id }) =>
                setSearchParams(
                    (params) => {
                        params.set(BOARD_PARAM, id);
                        return params;
                    },
                    { replace: true },
                ),
            )
            .finally(() => {
                isCreatingBoard.current = false;
            });
    }, [boardId, setSearchParams]);

    return (
        <SaveWidgetContext value={saveWidget}>
            <div className="h-screen w-screen">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onNodeDragStop={onNodeDragStop}
                    nodesConnectable={false}
                    colorMode="system"
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                    <Controls />
                    <MiniMap />
                    {error && (
                        <Panel position="top-center">
                            <Surface className="rounded-xl px-4 py-2 text-sm text-danger shadow-lg">
                                {error}
                            </Surface>
                        </Panel>
                    )}
                    {boardId && (
                        <Panel position="bottom-center">
                            <WhiteboardToolbar boardId={boardId} onWidgetCreated={refresh} />
                        </Panel>
                    )}
                </ReactFlow>
            </div>
        </SaveWidgetContext>
    );
}
