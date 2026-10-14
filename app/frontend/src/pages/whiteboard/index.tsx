import { useCallback } from "react";
import {
    addEdge,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    Panel,
    ReactFlow,
    useEdgesState,
    useNodesState,
    type Connection,
    type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WhiteboardToolbar } from "./toolbar.tsx";
import type { WidgetNode } from "./types.ts";

const initialNodes: WidgetNode[] = [
    {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "Idea", widget_type: "text" },
    },
    {
        id: "2",
        position: { x: 0, y: 120 },
        data: { label: "Prompt", widget_type: "ai" },
    },
];

const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2" }];

export function WhiteboardPage() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <div className="h-screen w-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                colorMode="system"
                fitView
            >
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                <Controls />
                <MiniMap />
                <Panel position="bottom-center">
                    <WhiteboardToolbar />
                </Panel>
            </ReactFlow>
        </div>
    );
}
