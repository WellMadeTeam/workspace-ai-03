export type MessageSegment =
    | { kind: "text"; text: string }
    | { kind: "diagram"; code: string };

// A Mermaid diagram in a fenced code block. The system prompt asks the AI to
// put each fence on its own line, but it does not always do so, so a fence may
// start anywhere and the code may follow on the same line. Other code blocks
// stay text.
const DIAGRAM_PATTERN =
    /[ \t]*```mermaid(?:[ \t]*\r?\n|[ \t]+)([\s\S]*?\S)\s*```[ \t]*/gi;

/** Splits a message into its text and the Mermaid diagrams inside it. */
export function splitMessage(content: string): MessageSegment[] {
    const segments: MessageSegment[] = [];
    let textStart = 0;

    for (const match of content.matchAll(DIAGRAM_PATTERN)) {
        pushText(segments, content.slice(textStart, match.index));
        segments.push({ kind: "diagram", code: match[1] });
        textStart = match.index + match[0].length;
    }

    pushText(segments, content.slice(textStart));

    return segments;
}

// The line breaks around a diagram would show as blank lines next to it.
function pushText(segments: MessageSegment[], text: string) {
    const trimmed = text.replace(/^(\r?\n)+|(\r?\n)+$/g, "");

    if (trimmed.trim()) {
        segments.push({ kind: "text", text: trimmed });
    }
}
