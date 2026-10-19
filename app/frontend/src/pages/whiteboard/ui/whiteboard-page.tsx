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
import { useBoardConnection } from "../model/use-board-connection";
import { useBoardId } from "../model/use-board-id";
import { useBoardWidgets } from "../model/use-board-widgets";
import { isAiNode, type WidgetNode } from "../model/widget-node";
import { BoardError } from "./board-error";
import { BoardGate, type BoardGateState } from "./board-gate";
import { MessagesPanel } from "./messages-panel";
import { WidgetNodeView } from "./widget-node";
import { WidgetToolbar } from "./widget-toolbar";

const nodeTypes: NodeTypes = { widget: WidgetNodeView };

export function WhiteboardPage() {
    const { boardId, isCreating, createFailed, createNewBoard } = useBoardId();
    const { connection, retry } = useBoardConnection(boardId);
    // Widgets are loaded only for a member of the board, so a full board
    // cannot be seen or edited through polling. After a drop, polling keeps
    // the open board up to date while the socket reconnects.
    const isMember =
        connection.status === "live" || connection.status === "reconnecting";
    const { nodes, onNodesChange, error, isLoaded, addWidget, saveWidget } =
        useBoardWidgets(isMember ? boardId : null);
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
                </ReactFlow>
            </div>
        </SaveWidgetContext>
    );
}
