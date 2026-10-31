import { useEffect, useState } from "react";
import { randomUUID } from "@/shared/lib";
import { renderDiagram, type DiagramTheme } from "../lib/render-diagram";

export type RenderedDiagram =
    | { status: "rendering" }
    | { status: "rendered"; id: string; svg: string }
    | { status: "failed"; error: string };

/**
 * Renders Mermaid code to an SVG, again whenever the code changes. Without a
 * theme, the diagram follows the app's theme.
 */
export function useRenderedDiagram(code: string, theme?: DiagramTheme) {
    const [diagram, setDiagram] = useState<RenderedDiagram>({
        status: "rendering",
    });

    useEffect(() => {
        let isCurrent = true;
        // Unique, as every diagram on the page styles its elements by this id.
        const id = `diagram-${randomUUID()}`;

        void renderDiagram(id, code, theme).then((result) => {
            if (!isCurrent) {
                return;
            }

            setDiagram(
                "svg" in result
                    ? { status: "rendered", id, svg: result.svg }
                    : { status: "failed", error: result.error },
            );
        });

        return () => {
            isCurrent = false;
        };
    }, [code, theme]);

    return diagram;
}
