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
    type OnDelete,
    type OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./connections.css";
import { canConnect, type ConnectionEdge } from "../model/connection-edge";
import { SaveWidgetContext } from "../model/save-widget";
import { useBoardConnection } from "../model/use-board-connection";
import { useBoardConnections } from "../model/use-board-connections";
import { useBoardContextMenu } from "../model/use-board-context-menu";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, type WidgetNode } from "../model/widget-node";
import { BoardContextMenu } from "./board-context-menu";
import { BoardError } from "./board-error";
import { BoardGate, type BoardGateState } from "./board-gate";
import { ConnectionEdgeView } from "./connection-edge";
import { ConnectionPreview } from "./connection-preview";
import { MessagesPanel } from "./messages-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

// Connections are drawn as straight one-sided arrows between blocks.
const edgeTypes: EdgeTypes = { default: ConnectionEdgeView };

export function WhiteboardPage() {
    const { boardId, isCreating, createFailed, createNewBoard } = useBoardId();
    const { connection, retry } = useBoardConnection(boardId);
    // Widgets are loaded only for a member of the board, so a full board
    // cannot be seen or edited through polling. After a drop, polling keeps
    // the open board up to date while the socket reconnects.
    const isMember =
        connection.status === "live" || connection.status === "reconnecting";
    const {
        nodes,
        onNodesChange,
        error: widgetsError,
        isLoaded,
        addWidget,
        saveWidget,
        removeWidgets,
    } = useBoardWidgets(isMember ? boardId : null);
    const {
        edges,
        onEdgesChange,
        error: connectionsError,
        addConnection,
        removeConnections,
    } = useBoardConnections(nodes.map((node) => node.id));
    const error = widgetsError ?? connectionsError;
    const contextMenu = useBoardContextMenu(
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
    );
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

    const gate: BoardGateState | null = createFailed
        ? "unavailable"
        : connection.status === "error"
          ? connection.reason
          : !isLoaded
            ? "loading"
            : null;

    if (gate) {
        return (
            <BoardGate
                state={gate}
                isCreatingBoard={isCreating}
                // A failed board creation is retried; otherwise the connection is.
                onRetry={createFailed ? () => void createNewBoard() : retry}
                onCreateBoard={() => void createNewBoard()}
            />
        );
    }

    const notice =
        error ??
        (connection.status === "reconnecting" ? "Reconnecting…" : null);

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
    // `edges` also holds the connections of the deleted blocks, which the
    // server deletes together with the blocks.
    const onDelete: OnDelete<WidgetNode, ConnectionEdge> = ({
        nodes: deletedNodes,
        edges: deletedEdges,
    }) => {
        const deletedNodeIds = new Set(deletedNodes.map((node) => node.id));
        if (deletedNodeIds.size > 0) void removeWidgets([...deletedNodeIds]);
        void removeConnections(
            deletedEdges
                .filter(
                    (edge) =>
                        !deletedNodeIds.has(edge.source) &&
                        !deletedNodeIds.has(edge.target),
                )
                .map((edge) => edge.id),
        );
    };

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
                    onDelete={onDelete}
                    onNodeContextMenu={contextMenu.onNodeContextMenu}
                    onEdgeContextMenu={contextMenu.onEdgeContextMenu}
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
                    {notice && (
                        <Panel position="top-center">
                            <BoardError message={notice} />
                        </Panel>
                    )}
                    <Panel position="bottom-center">
                        <WidgetToolbar onAddWidget={addWidget} />
                    </Panel>
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
