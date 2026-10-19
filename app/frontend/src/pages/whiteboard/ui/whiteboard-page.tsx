import {
    Background,
    BackgroundVariant,
    Controls,
    Panel,
    ReactFlow,
    type NodeTypes,
    type OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SaveWidgetContext } from "../model/save-widget";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, type WidgetNode } from "../model/widget-node";
import { BoardError } from "./board-error";
import { MessagesPanel } from "./messages-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

export function WhiteboardPage() {
    const boardId = useBoardId();
    const { nodes, onNodesChange, error, addWidget, saveWidget } =
        useBoardWidgets(boardId);
    const selectedAiNode = nodes.filter(isAiNode).find((node) => node.selected);

    // Save the final position of every dragged node (several when a selection is dragged).
    const onNodeDragStop: OnNodeDrag<WidgetNode> = (
        _event,
        _node,
        draggedNodes,
    ) => {
        for (const { id, position } of draggedNodes) {
            saveWidget(id, { x: position.x, y: position.y });
        }
    };

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
                    proOptions={{
                        hideAttribution: true,
                    }}
                >
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={16}
                        size={1}
                    />
                    <Controls />
                    {error && (
                        <Panel position="top-center">
                            <BoardError message={error} />
                        </Panel>
                    )}
                    {boardId && (
                        <Panel position="bottom-center">
                            <WidgetToolbar onAddWidget={addWidget} />
                        </Panel>
                    )}
                    {selectedAiNode && (
                        <Panel position="top-right">
                            {/* Keyed so the draft resets when another AI block is selected. */}
                            <MessagesPanel
                                key={selectedAiNode.id}
                                node={selectedAiNode}
                            />
                        </Panel>
                    )}
                </ReactFlow>
            </div>
        </SaveWidgetContext>
    );
}
