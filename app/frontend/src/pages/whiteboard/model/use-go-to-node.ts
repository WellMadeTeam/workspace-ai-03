import { useCallback } from "react";
import { useReactFlow, useStoreApi } from "@xyflow/react";
import type { WidgetNode } from "./widget-node";

const GO_TO_NODE_DURATION_MS = 300;

/**
 * Selects a block on its own and moves the view so the block is in the
 * center. The view zooms in to at least 100%, and out if the block does not
 * fit.
 */
export function useGoToNode() {
    const store = useStoreApi<WidgetNode>();
    const { fitView, getZoom } = useReactFlow<WidgetNode>();

    return useCallback(
        (nodeId: string) => {
            // Unselects the other blocks and the connections, like a click on the block.
            store.getState().addSelectedNodes([nodeId]);

            void fitView({
                nodes: [{ id: nodeId }],
                duration: GO_TO_NODE_DURATION_MS,
                maxZoom: Math.max(getZoom(), 1),
            });
        },
        [fitView, getZoom, store],
    );
}
