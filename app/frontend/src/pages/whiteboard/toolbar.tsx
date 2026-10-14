import { Button, Surface, Toolbar, Tooltip } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { Sparkles, Type, type LucideIcon } from "lucide-react";
import { createWidget } from "./api.ts";
import type { WidgetNode, WidgetType } from "./types.ts";

const widgets: Record<WidgetType, { label: string; icon: LucideIcon }> = {
    text: { label: "Text", icon: Type },
    ai: { label: "AI", icon: Sparkles },
};

type WhiteboardToolbarProps = {
    boardId: string;
    onWidgetCreated: () => void;
};

export function WhiteboardToolbar({ boardId, onWidgetCreated }: WhiteboardToolbarProps) {
    const { screenToFlowPosition } = useReactFlow<WidgetNode>();

    const addWidget = async (widgetType: WidgetType) => {
        // Place the new block in the center of the visible canvas.
        const position = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        await createWidget({
            board_id: boardId,
            widget_type: widgetType,
            title: widgets[widgetType].label,
            ...position,
        });
        onWidgetCreated();
    };

    return (
        <Surface className="rounded-2xl p-2 shadow-lg">
            <Toolbar aria-label="Whiteboard tools">
                {(Object.keys(widgets) as WidgetType[]).map((widgetType) => {
                    const { label, icon: Icon } = widgets[widgetType];

                    return (
                        <Tooltip key={widgetType}>
                            <Button
                                isIconOnly
                                variant="secondary"
                                aria-label={`Add ${label} block`}
                                onPress={() => addWidget(widgetType)}
                            >
                                <Icon className="size-5" />
                            </Button>
                            <Tooltip.Content>{`Add ${label} block`}</Tooltip.Content>
                        </Tooltip>
                    );
                })}
            </Toolbar>
        </Surface>
    );
}
