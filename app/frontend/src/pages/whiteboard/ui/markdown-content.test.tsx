import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MarkdownContent } from "./markdown-content";

let container: HTMLDivElement;
let root: Root;

const show = async (content: string) => {
    await act(async () => root.render(<MarkdownContent content={content} />));
};

describe("MarkdownContent", () => {
    beforeEach(() => {
        Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
        container = document.createElement("div");
        document.body.append(container);
        root = createRoot(container);
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        container.remove();
    });

    it("renders basic formatting, lists, and code", async () => {
        await show(
            "# Heading\n\n**bold** and *italic*\n\n- one\n- two\n\n`inline`\n\n```\nconst x = 1\n```",
        );

        expect(container.querySelector("h1")?.textContent).toBe("Heading");
        expect(container.querySelector("strong")?.textContent).toBe("bold");
        expect(container.querySelector("em")?.textContent).toBe("italic");
        expect(container.querySelectorAll("ul li")).toHaveLength(2);
        expect(container.querySelector("p code")?.textContent).toBe("inline");
        expect(container.querySelector("pre code")?.textContent).toContain(
            "const x = 1",
        );
    });

    it("keeps plain and incomplete Markdown readable", async () => {
        await show("plain text\n\n**unfinished");

        expect(container.textContent).toContain("plain text");
        expect(container.textContent).toContain("**unfinished");
    });

    it("does not create elements from raw HTML or execute event handlers", async () => {
        await show('<script>alert(1)</script><img src="x" onerror="alert(2)">');

        expect(container.querySelector("script, img")).toBeNull();
        expect(container.textContent).toContain("onerror");
    });
});
