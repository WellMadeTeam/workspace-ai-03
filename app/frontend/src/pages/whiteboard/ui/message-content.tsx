import { useMemo } from "react";
import { splitMessage } from "../lib/message-segments";
import { DiagramBlock } from "./diagram-block";

type MessageContentProps = {
    content: string;
};

/** The text of an AI answer, with its Mermaid diagrams rendered. */
export function MessageContent({ content }: MessageContentProps) {
    const segments = useMemo(() => splitMessage(content), [content]);

    // A message never changes, so the index is a stable key.
    return segments.map((segment, index) =>
        segment.kind === "text" ? (
            <span key={index}>{segment.text}</span>
        ) : (
            <DiagramBlock key={index} code={segment.code} />
        ),
    );
}
