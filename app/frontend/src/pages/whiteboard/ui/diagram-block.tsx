import { useEffect, useState } from "react";
import { Tabs } from "@heroui/react";
import { CircleAlert } from "lucide-react";
import { randomUUID } from "@/shared/lib";
import { renderDiagram } from "../lib/render-diagram";
import { DiagramCode } from "./diagram-code";
import { DiagramModal } from "./diagram-modal";

type RenderState =
    | { status: "rendering" }
    | { status: "rendered"; id: string; svg: string }
    | { status: "failed"; error: string };

type DiagramBlockProps = {
    code: string;
};

/**
 * A Mermaid diagram in an AI answer: the picture, which opens in a modal, and
 * its source; or the source and the error if it could not be rendered.
 */
export function DiagramBlock({ code }: DiagramBlockProps) {
    const [state, setState] = useState<RenderState>({ status: "rendering" });
    const [isExpanded, setExpanded] = useState(false);

    useEffect(() => {
        let isCurrent = true;
        // Unique, as every diagram on the page styles its elements by this id.
        const id = `diagram-${randomUUID()}`;

        void renderDiagram(id, code).then((result) => {
            if (!isCurrent) {
                return;
            }

            setState(
                "svg" in result
                    ? { status: "rendered", id, svg: result.svg }
                    : { status: "failed", error: result.error },
            );
        });

        return () => {
            isCurrent = false;
        };
    }, [code]);

    if (state.status === "failed") {
        return (
            <figure className="my-1 flex flex-col gap-2 whitespace-normal">
                <figcaption className="flex items-start gap-2 text-xs text-danger">
                    <CircleAlert
                        className="mt-px size-4 shrink-0"
                        aria-hidden
                    />
                    <span>
                        This diagram could not be rendered:
                        <span className="mt-1 block max-h-32 overflow-auto font-mono whitespace-pre-wrap">
                            {state.error}
                        </span>
                    </span>
                </figcaption>
                <DiagramCode code={code} className="max-h-64" />
            </figure>
        );
    }

    return (
        <figure className="relative my-1 whitespace-normal">
            <Tabs
                variant="secondary"
                align="start"
                defaultSelectedKey="diagram"
            >
                <Tabs.ListContainer className="pr-9">
                    <Tabs.List aria-label="Diagram view">
                        <Tabs.Tab id="diagram">
                            Diagram
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="code">
                            Code
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel id="diagram" className="pt-2">
                    {state.status === "rendered" ? (
                        // A click on the picture opens it too, as it is often
                        // too small to read in the panel; from the keyboard,
                        // the "Open diagram" button opens it.
                        <div
                            className="cursor-zoom-in"
                            onClick={() => setExpanded(true)}
                            dangerouslySetInnerHTML={{ __html: state.svg }}
                        />
                    ) : (
                        <p className="text-xs opacity-60" role="status">
                            Rendering the diagram…
                        </p>
                    )}
                </Tabs.Panel>
                <Tabs.Panel id="code" className="pt-2">
                    <DiagramCode code={code} className="max-h-64" />
                </Tabs.Panel>
            </Tabs>
            {/* Outside the tabs, whose tab list would take the modal's tabs. */}
            {state.status === "rendered" && (
                <div className="absolute top-0 right-0">
                    <DiagramModal
                        renderId={state.id}
                        svg={state.svg}
                        code={code}
                        isOpen={isExpanded}
                        onOpenChange={setExpanded}
                    />
                </div>
            )}
        </figure>
    );
}
