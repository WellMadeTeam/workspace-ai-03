import Markdown from "react-markdown";

type MarkdownContentProps = {
    content: string;
};

/** Render Markdown without enabling raw HTML parsing. */
export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <div className="markdown-content break-words [&_h1]:my-2 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:my-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:my-2 [&_h3]:font-semibold [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-black/10 [&_pre]:p-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
            <Markdown
                components={{
                    code: ({ children, className, ...props }) =>
                        className ? (
                            <code
                                className={`${className} font-mono`}
                                {...props}
                            >
                                {children}
                            </code>
                        ) : (
                            <code
                                className="rounded bg-black/10 px-1 font-mono"
                                {...props}
                            >
                                {children}
                            </code>
                        ),
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}
