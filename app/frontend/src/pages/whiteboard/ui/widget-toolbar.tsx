import { Button, Surface, Toolbar, Tooltip } from "@heroui/react";
import { useReactFlow } from "@xyflow/react";
import { Sparkles, Type, type LucideIcon } from "lucide-react";
import type { NewWidget, WidgetType } from "../api/widget";
import type { WidgetNode } from "../model/widget-node";

// An image block is added from a diagram in an AI answer, not from here.
type ToolbarWidgetType = Exclude<WidgetType, "image">;

const widgets: Record<ToolbarWidgetType, { label: string; icon: LucideIcon }> =
    {
        text: { label: "Text", icon: Type },
        ai: { label: "AI", icon: Sparkles },
    };

type WidgetToolbarProps = {
    onAddWidget: (widget: Omit<NewWidget, "board_id">) => void;
};

export function WidgetToolbar({ onAddWidget }: WidgetToolbarProps) {
    const { screenToFlowPosition } = useReactFlow<WidgetNode>();

    const addWidget = (widgetType: ToolbarWidgetType) => {
        // Place the new block in the center of the visible canvas.
        const position = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        onAddWidget({
            widget_type: widgetType,
            title: widgets[widgetType].label,
            ...position,
        });
    };

    return (
        <Surface className="rounded-2xl p-2 shadow-lg">
            <Toolbar aria-label="Whiteboard tools">
                {(Object.keys(widgets) as ToolbarWidgetType[]).map(
                    (widgetType) => {
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
                    },
                )}
            </Toolbar>
        </Surface>
    );
}
