import { useCallback, useEffect, useState } from "react";

// The width the side panel had before it could be resized, and the narrowest
// it gets.
export const SIDE_PANEL_MIN_WIDTH = 320;
// The board stays visible next to the widest panel.
const VIEWPORT_MARGIN = 32;
const STORAGE_KEY = "side-panel-width";

// The panel remounts for every selected block, so its width lives here, and
// in the browser storage to survive a reload where that storage works.
let lastWidth: number | undefined;

function readStoredWidth() {
    try {
        const stored = Number(localStorage.getItem(STORAGE_KEY));
        return stored > 0 ? stored : SIDE_PANEL_MIN_WIDTH;
    } catch {
        return SIDE_PANEL_MIN_WIDTH;
    }
}

export const getSidePanelMaxWidth = () =>
    Math.max(SIDE_PANEL_MIN_WIDTH, window.innerWidth - VIEWPORT_MARGIN);

const clampWidth = (width: number) =>
    Math.round(
        Math.min(Math.max(width, SIDE_PANEL_MIN_WIDTH), getSidePanelMaxWidth()),
    );

/** The width of the side panel, shared by the panels of every block. */
export function useSidePanelWidth() {
    const [width, setStateWidth] = useState(() =>
        clampWidth((lastWidth ??= readStoredWidth())),
    );

    const setWidth = useCallback((next: number) => {
        const clamped = clampWidth(next);
        lastWidth = clamped;
        setStateWidth(clamped);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(width));
        } catch {
            // The width is still kept until the page is reloaded.
        }
    }, [width]);

    return [width, setWidth] as const;
}
