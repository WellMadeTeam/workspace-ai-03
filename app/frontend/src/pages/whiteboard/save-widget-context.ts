import { createContext } from "react";
import type { WidgetUpdate } from "./api.ts";

export type SaveWidget = (widgetId: string, update: WidgetUpdate, delayMs?: number) => void;

/** Lets nodes persist their changes through the board's useBoardWidgets hook. */
export const SaveWidgetContext = createContext<SaveWidget>(() => {});
