import { useMemo } from "react";
import { splitMessage } from "../lib/message-segments";
import { DiagramBlock } from "./diagram-block";
import { MarkdownContent } from "./markdown-content";

type MessageContentProps = {
    content: string;
};

/** Markdown text and Mermaid diagrams in an AI conversation. */
export function MessageContent({ content }: MessageContentProps) {
    const segments = useMemo(() => splitMessage(content), [content]);

    // A message never changes, so the index is a stable key.
    return segments.map((segment, index) =>
        segment.kind === "text" ? (
            <MarkdownContent key={index} content={segment.text} />
        ) : (
            <DiagramBlock key={index} code={segment.code} />
        ),
    );
}
