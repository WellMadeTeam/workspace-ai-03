import {
    Background,
    BackgroundVariant,
    ConnectionMode,
    Controls,
    Panel,
    ReactFlow,
    type EdgeTypes,
    type IsValidConnection,
    type NodeTypes,
    type OnConnect,
    type OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./connections.css";
import { canConnect, type ConnectionEdge } from "../model/connection-edge";
import { SaveWidgetContext } from "../model/save-widget";
import { useBoardConnections } from "../model/use-board-connections";
import { useBoardContextMenu } from "../model/use-board-context-menu";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, type WidgetNode } from "../model/widget-node";
import { BoardContextMenu } from "./board-context-menu";
import { BoardError } from "./board-error";
import { ConnectionEdgeView } from "./connection-edge";
import { ConnectionPreview } from "./connection-preview";
import { MessagesPanel } from "./messages-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

// Connections are drawn as straight one-sided arrows between blocks.
const edgeTypes: EdgeTypes = { default: ConnectionEdgeView };

export function WhiteboardPage() {
    const boardId = useBoardId();
    const {
        nodes,
        onNodesChange,
        error: widgetsError,
        addWidget,
        saveWidget,
        removeWidgets,
    } = useBoardWidgets(boardId);
    const {
        edges,
        onEdgesChange,
        error: connectionsError,
        addConnection,
    } = useBoardConnections(nodes.map((node) => node.id));
    const error = widgetsError ?? connectionsError;
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

    const isValidConnection: IsValidConnection<ConnectionEdge> = ({
        source,
        target,
    }) => canConnect(nodes, edges, source, target);

    const onConnect: OnConnect = ({ source, target }) =>
        void addConnection({
            source_widget_id: source,
            target_widget_id: target,
        });

    // Called for the context menu's Delete and the Backspace shortcut alike.
    const onNodesDelete = (deletedNodes: WidgetNode[]) =>
        void removeWidgets(deletedNodes.map((node) => node.id));

    return (
        <SaveWidgetContext value={saveWidget}>
            <div className="h-screen w-screen">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={ConnectionPreview}
                    // Every handle can both start and end a connection.
                    connectionMode={ConnectionMode.Loose}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    isValidConnection={isValidConnection}
                    onConnect={onConnect}
                    onNodesDelete={onNodesDelete}
                    onNodeContextMenu={contextMenu.onNodeContextMenu}
                    onSelectionContextMenu={contextMenu.onSelectionContextMenu}
                    onPaneContextMenu={contextMenu.close}
                    onMoveStart={contextMenu.close}
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
