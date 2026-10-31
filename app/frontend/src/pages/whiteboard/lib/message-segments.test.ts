import { describe, expect, it } from "vitest";

import { splitMessage } from "./message-segments";

const fence = (code: string) => `\`\`\`mermaid\n${code}\n\`\`\``;

describe("splitMessage", () => {
    it("keeps a message without a diagram as one text", () => {
        expect(splitMessage("Just text")).toEqual([
            { kind: "text", text: "Just text" },
        ]);
    });

    it("separates a diagram from the text around it", () => {
        const content = `Here it is:\n\n${fence("graph TD\n  A --> B")}\n\nDone.`;

        expect(splitMessage(content)).toEqual([
            { kind: "text", text: "Here it is:" },
            { kind: "diagram", code: "graph TD\n  A --> B" },
            { kind: "text", text: "Done." },
        ]);
    });

    it("finds every diagram in a message", () => {
        const content = `${fence("graph TD\n  A --> B")}\n${fence("sequenceDiagram\n  A->>B: Hi")}`;

        expect(splitMessage(content)).toEqual([
            { kind: "diagram", code: "graph TD\n  A --> B" },
            { kind: "diagram", code: "sequenceDiagram\n  A->>B: Hi" },
        ]);
    });

    it("leaves other code blocks as text", () => {
        const content = "```python\nprint('hi')\n```";

        expect(splitMessage(content)).toEqual([
            { kind: "text", text: content },
        ]);
    });

    it("leaves an unclosed diagram block as text", () => {
        const content = "```mermaid\ngraph TD\n  A --> B";

        expect(splitMessage(content)).toEqual([
            { kind: "text", text: content },
        ]);
    });

    it("accepts an indented fence and Windows line breaks", () => {
        const content = "Steps:\r\n  ```mermaid\r\n  graph TD\r\n  ```\r\n";

        expect(splitMessage(content)).toEqual([
            { kind: "text", text: "Steps:" },
            { kind: "diagram", code: "  graph TD" },
        ]);
    });
});
