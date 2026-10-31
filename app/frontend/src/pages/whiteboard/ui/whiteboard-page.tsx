import { useMemo, useRef, useState } from "react";
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
    type OnBeforeDelete,
    type OnNodeDrag,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./connections.css";
import { canConnect, type ConnectionEdge } from "../model/connection-edge";
import { SaveWidgetContext } from "../model/save-widget";
import { useBoardConnection } from "../model/use-board-connection";
import { useBoardConnections } from "../model/use-board-connections";
import { useBoardContextMenu } from "../model/use-board-context-menu";
import { useBoardHighlights } from "../model/use-board-highlights";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, isTextNode, type WidgetNode } from "../model/widget-node";
import { ConfirmationDialog } from "./confirmation-dialog";
import { BoardContextMenu } from "./board-context-menu";
import { BoardError } from "./board-error";
import { BoardGate, type BoardGateState } from "./board-gate";
import { ConnectionEdgeView } from "./connection-edge";
import { ConnectionPreview } from "./connection-preview";
import { MessagesPanel } from "./messages-panel";
import { TextPanel } from "./text-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

// Connections are drawn as straight one-sided arrows between blocks.
const edgeTypes: EdgeTypes = { default: ConnectionEdgeView };

export function WhiteboardPage() {
    const { boardId, isCreating, createFailed, createNewBoard } = useBoardId();
    const highlightsState = useBoardHighlights(boardId);
    const { connection, retry, sendHighlightCommand } = useBoardConnection(
        boardId,
        highlightsState.onSocketEvent,
    );
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
        clearWidgets,
    } = useBoardWidgets(isMember ? boardId : null);
    const {
        edges,
        onEdgesChange,
        error: connectionsError,
        addConnection,
        removeConnections,
    } = useBoardConnections(
        isMember ? boardId : null,
        nodes.map((node) => node.id),
    );
    const [confirmation, setConfirmation] = useState<{
        action: "clear" | "delete";
        ids: string[];
    } | null>(null);
    const deletionResolver = useRef<((allowed: boolean) => void) | null>(null);
    const requestClear = (ids: string[]) => {
        if (ids.length) setConfirmation({ action: "clear", ids });
    };
    const onBeforeDelete: OnBeforeDelete<WidgetNode, ConnectionEdge> = ({
        nodes: selectedNodes,
    }) => {
        if (!selectedNodes.length) return Promise.resolve(true);
        return new Promise<boolean>((resolve) => {
            deletionResolver.current = resolve;
            setConfirmation({
                action: "delete",
                ids: selectedNodes.map((node) => node.id),
            });
        });
    };
    const finishConfirmation = (confirmed: boolean) => {
        if (confirmed && confirmation?.action === "clear")
            void clearWidgets(confirmation.ids);
        deletionResolver.current?.(confirmed);
        deletionResolver.current = null;
        setConfirmation(null);
    };
    const error = widgetsError ?? connectionsError;
    const contextMenu = useBoardContextMenu(
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
    );
    const highlightedNodes = useMemo(
        () =>
            nodes.map((node) => {
                const highlightColor =
                    highlightsState.highlights[node.id]?.[0]?.color;
                if (node.data.highlightColor === highlightColor) return node;

                return {
                    ...node,
                    data: { ...node.data, highlightColor },
                };
            }),
        [nodes, highlightsState.highlights],
    );
    const selectedNode = nodes.find((node) => node.selected);
    const selectedAiNode =
        selectedNode && isAiNode(selectedNode) ? selectedNode : undefined;
    const selectedTextNode =
        selectedNode && isTextNode(selectedNode) ? selectedNode : undefined;

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
                    nodes={highlightedNodes}
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
                    onBeforeDelete={onBeforeDelete}
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
                    {selectedTextNode && (
                        <Panel position="top-right">
                            <TextPanel
                                key={selectedTextNode.id}
                                node={selectedTextNode}
                            />
                        </Panel>
                    )}
                    <BoardContextMenu
                        position={contextMenu.position}
                        widgetId={contextMenu.widgetId}
                        isHighlightedByMe={
                            contextMenu.widgetId !== null &&
                            highlightsState.isHighlightedByMe(
                                contextMenu.widgetId,
                            )
                        }
                        onHighlight={(widgetId) =>
                            highlightsState.sendStart(
                                widgetId,
                                sendHighlightCommand,
                            )
                        }
                        onRemoveHighlight={(widgetId) =>
                            highlightsState.sendStop(
                                widgetId,
                                sendHighlightCommand,
                            )
                        }
                        onClose={contextMenu.close}
                        onClear={requestClear}
                    />
                    <ConfirmationDialog
                        message={
                            confirmation
                                ? `Are you sure you want to ${confirmation.action} this widget?`
                                : null
                        }
                        onConfirm={() => finishConfirmation(true)}
                        onCancel={() => finishConfirmation(false)}
                    />
                </ReactFlow>
            </div>
        </SaveWidgetContext>
    );
}
