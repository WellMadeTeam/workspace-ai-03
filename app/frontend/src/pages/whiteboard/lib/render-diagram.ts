type Mermaid = typeof import("mermaid").default;

export type DiagramResult = { svg: string } | { error: string };

export type DiagramTheme = "default" | "dark";

let mermaidPromise: Promise<Mermaid> | undefined;

// Mermaid is large, so it is loaded only when the first diagram shows up.
function loadMermaid() {
    mermaidPromise ??= import("mermaid").then(
        ({ default: mermaid }) => mermaid,
        (error: unknown) => {
            // Lets the next diagram try to load it again.
            mermaidPromise = undefined;
            throw error;
        },
    );

    return mermaidPromise;
}

/**
 * Renders Mermaid code to an SVG whose element ids start with `id`, or
 * returns why it could not be rendered. Without a theme, the diagram follows
 * the app's theme.
 */
export async function renderDiagram(
    id: string,
    code: string,
    theme?: DiagramTheme,
): Promise<DiagramResult> {
    try {
        const mermaid = await loadMermaid();

        mermaid.initialize({
            startOnLoad: false,
            // Sanitizes the SVG, which is then inserted as HTML.
            securityLevel: "strict",
            // Keeps Mermaid from adding its own error picture to the page.
            suppressErrorRendering: true,
            // Read on each render, so a new diagram follows the app's theme.
            theme:
                theme ??
                (document.documentElement.classList.contains("dark")
                    ? "dark"
                    : "default"),
        });

        const { svg } = await mermaid.render(id, code);

        return { svg };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
