import { Button } from "@heroui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

type DiagramCollapseToggleProps = {
    // The id of the element that this button hides and shows.
    contentId: string;
    isCollapsed: boolean;
    onCollapsedChange: (isCollapsed: boolean) => void;
};

/** A button that collapses a diagram and expands it again. */
export function DiagramCollapseToggle({
    contentId,
    isCollapsed,
    onCollapsedChange,
}: DiagramCollapseToggleProps) {
    return (
        <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Show diagram"
            aria-expanded={!isCollapsed}
            aria-controls={contentId}
            onPress={() => onCollapsedChange(!isCollapsed)}
        >
            {isCollapsed ? (
                <ChevronDown className="size-4" aria-hidden />
            ) : (
                <ChevronUp className="size-4" aria-hidden />
            )}
        </Button>
    );
}
