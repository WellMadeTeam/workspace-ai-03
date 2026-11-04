import { use, useEffect, useId, useRef, useState } from "react";
import { Button, Tabs } from "@heroui/react";
import { Check, ImagePlus } from "lucide-react";
import { AddDiagramContext } from "../model/add-diagram";
import { useRenderedDiagram } from "../model/use-rendered-diagram";
import { DiagramCode } from "./diagram-code";
import { DiagramCollapseToggle } from "./diagram-collapse-toggle";
import { DiagramError } from "./diagram-error";
import { DiagramModal } from "./diagram-modal";

const ADDED_FEEDBACK_MS = 2000;

type DiagramBlockProps = {
    code: string;
};

/**
 * A Mermaid diagram in an AI answer: the picture, which opens in a modal or
 * goes on the board as an image block, and its source; or the source and the
 * error if it could not be rendered. All of it can be collapsed.
 */
export function DiagramBlock({ code }: DiagramBlockProps) {
    const diagram = useRenderedDiagram(code);
    const addDiagram = use(AddDiagramContext);
    const [isExpanded, setExpanded] = useState(false);
    const [isAdded, setAdded] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const contentId = useId();
    const resetTimerRef = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

    const addToBoard = async () => {
        if (!addDiagram || !(await addDiagram(code))) {
            return;
        }

        setAdded(true);
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = window.setTimeout(
            () => setAdded(false),
            ADDED_FEEDBACK_MS,
        );
    };

    return (
        <figure className="relative my-1 whitespace-normal">
            {isCollapsed && (
                <figcaption className="flex h-8 items-center pr-26 text-xs opacity-60">
                    Diagram
                </figcaption>
            )}
            {/* Hidden rather than removed, so the selected tab stays. */}
            <div id={contentId} hidden={isCollapsed}>
                {diagram.status === "failed" ? (
                    <div className="flex flex-col gap-2">
                        <div className="pr-10">
                            <DiagramError error={diagram.error} />
                        </div>
                        <DiagramCode code={code} className="max-h-64" />
                    </div>
                ) : (
                    <Tabs
                        variant="secondary"
                        align="start"
                        defaultSelectedKey="diagram"
                    >
                        <Tabs.ListContainer className="pr-26">
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
                            {diagram.status === "rendered" ? (
                                // A click on the picture opens it too, as it is
                                // often too small to read in the panel; from the
                                // keyboard, the "Open diagram" button opens it.
                                <div
                                    className="cursor-zoom-in"
                                    onClick={() => setExpanded(true)}
                                    dangerouslySetInnerHTML={{
                                        __html: diagram.svg,
                                    }}
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
                )}
            </div>
            {/* Outside the tabs, whose tab list would take the modal's tabs. */}
            <div className="absolute top-0 right-0 flex">
                {diagram.status === "rendered" && (
                    <>
                        {addDiagram && (
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                aria-label="Add to board"
                                onPress={addToBoard}
                            >
                                {isAdded ? (
                                    <Check className="size-4" aria-hidden />
                                ) : (
                                    <ImagePlus className="size-4" aria-hidden />
                                )}
                            </Button>
                        )}
                        <span className="sr-only" role="status">
                            {isAdded ? "Added to the board" : ""}
                        </span>
                        <DiagramModal
                            renderId={diagram.id}
                            svg={diagram.svg}
                            code={code}
                            isOpen={isExpanded}
                            onOpenChange={setExpanded}
                        />
                    </>
                )}
                <DiagramCollapseToggle
                    contentId={contentId}
                    isCollapsed={isCollapsed}
                    onCollapsedChange={setCollapsed}
                />
            </div>
        </figure>
    );
}
