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
    type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MessagesPanel } from "./messages-panel.tsx";
import { WhiteboardToolbar } from "./toolbar.tsx";
import type { AiWidgetNode, WidgetNode } from "./types.ts";
import { WidgetNodeView } from "./widget-node.tsx";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

const initialNodes: WidgetNode[] = [
    {
        id: "1",
        type: "widget",
        position: { x: 0, y: 0 },
        data: { widget_type: "text", content: "Idea" },
    },
    {
        id: "2",
        type: "widget",
        position: { x: 0, y: 120 },
        data: { widget_type: "ai", label: "Prompt", messages: [] },
    },
];

const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2" }];

const isAiNode = (node: WidgetNode): node is AiWidgetNode =>
    node.data.widget_type === "ai";

export function WhiteboardPage() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const selectedAiNode = nodes.filter(isAiNode).find((node) => node.selected);
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
                nodeTypes={nodeTypes}
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
                {selectedAiNode && (
                    <Panel position="top-right">
                        {/* Keyed so the draft resets when another AI block is selected. */}
                        <MessagesPanel key={selectedAiNode.id} node={selectedAiNode} />
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
}
