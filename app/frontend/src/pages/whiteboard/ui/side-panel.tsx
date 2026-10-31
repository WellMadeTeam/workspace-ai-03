import {
    useRef,
    type KeyboardEvent,
    type PointerEvent,
    type ReactNode,
} from "react";
import { Surface } from "@heroui/react";
import {
    getSidePanelMaxWidth,
    SIDE_PANEL_MIN_WIDTH,
    useSidePanelWidth,
} from "../model/use-side-panel-width";

const KEYBOARD_STEP = 32;

type SidePanelProps = {
    label: string;
    children: ReactNode;
};

/**
 * The panel on the right of the board for the selected block, which a member
 * widens by dragging its left edge, such as to read a diagram's code.
 */
export function SidePanel({ label, children }: SidePanelProps) {
    const [width, setWidth] = useSidePanelWidth();
    const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

    const resizeByKey = (event: KeyboardEvent) => {
        const widths: Record<string, number> = {
            // The panel is on the right, so moving its edge left widens it.
            ArrowLeft: width + KEYBOARD_STEP,
            ArrowRight: width - KEYBOARD_STEP,
            Home: SIDE_PANEL_MIN_WIDTH,
            End: getSidePanelMaxWidth(),
        };

        if (event.key in widths) {
            event.preventDefault();
            setWidth(widths[event.key]);
        }
    };

    const resizeByPointer = (event: PointerEvent) => {
        const drag = dragRef.current;

        if (drag) {
            setWidth(drag.startWidth + drag.startX - event.clientX);
        }
    };

    // The browser can merge the last move into the release, so the release
    // applies its own position too.
    const endDrag = (event: PointerEvent) => {
        resizeByPointer(event);
        dragRef.current = null;
    };

    return (
        <Surface
            role="complementary"
            aria-label={label}
            style={{ width }}
            className="relative flex h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col rounded-2xl shadow-lg"
        >
            <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize panel"
                aria-valuemin={SIDE_PANEL_MIN_WIDTH}
                aria-valuemax={getSidePanelMaxWidth()}
                aria-valuenow={width}
                tabIndex={0}
                title="Drag to resize, double-click to reset"
                className="group absolute inset-y-4 left-0 z-10 flex w-3 -translate-x-1/2 cursor-col-resize touch-none justify-center outline-none"
                onPointerDown={(event) => {
                    // Keeps the drag from selecting text on the page.
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    dragRef.current = {
                        startX: event.clientX,
                        startWidth: width,
                    };
                }}
                onPointerMove={resizeByPointer}
                onPointerUp={endDrag}
                onPointerCancel={() => {
                    dragRef.current = null;
                }}
                onDoubleClick={() => setWidth(SIDE_PANEL_MIN_WIDTH)}
                onKeyDown={resizeByKey}
            >
                <span className="h-full w-1 rounded-full transition-colors group-hover:bg-(--accent) group-focus-visible:bg-(--focus) group-active:bg-(--accent)" />
            </div>
            {children}
        </Surface>
    );
}
