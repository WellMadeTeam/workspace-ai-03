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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Surface } from "@heroui/react";
import { createBoard } from "./api.ts";
import { WhiteboardToolbar } from "./toolbar.tsx";
import { useBoardWidgets } from "./use-board-widgets.ts";
import { WidgetNodeView } from "./widget-node.tsx";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

const BOARD_PARAM = "board";

export function WhiteboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const boardId = searchParams.get(BOARD_PARAM);
    const { nodes, onNodesChange, error, refresh } = useBoardWidgets(boardId);

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
        <div className="h-screen w-screen">
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
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
    );
}
