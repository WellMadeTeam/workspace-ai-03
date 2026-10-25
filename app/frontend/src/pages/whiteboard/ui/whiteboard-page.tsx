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
import { useBoardContextMenu } from "../model/use-board-context-menu";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, type WidgetNode } from "../model/widget-node";
import { BoardContextMenu } from "./board-context-menu";
import { BoardError } from "./board-error";
import { MessagesPanel } from "./messages-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

export function WhiteboardPage() {
    const boardId = useBoardId();
    const {
        nodes,
        onNodesChange,
        error,
        addWidget,
        saveWidget,
        removeWidgets,
    } = useBoardWidgets(boardId);
    const contextMenu = useBoardContextMenu(nodes, onNodesChange);
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

    // Called for the context menu's Delete and the Backspace shortcut alike.
    const onNodesDelete = (deletedNodes: WidgetNode[]) =>
        void removeWidgets(deletedNodes.map((node) => node.id));

    return (
        <SaveWidgetContext value={saveWidget}>
            <div className="h-screen w-screen">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onNodeDragStop={onNodeDragStop}
                    onNodesDelete={onNodesDelete}
                    onNodeContextMenu={contextMenu.onNodeContextMenu}
                    onSelectionContextMenu={contextMenu.onSelectionContextMenu}
                    onPaneContextMenu={contextMenu.close}
                    onMoveStart={contextMenu.close}
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
                    <BoardContextMenu
                        position={contextMenu.position}
                        onClose={contextMenu.close}
                    />
                </ReactFlow>
            </div>
        </SaveWidgetContext>
    );
}
