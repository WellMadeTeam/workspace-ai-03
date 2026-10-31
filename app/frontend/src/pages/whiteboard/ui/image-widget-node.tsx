import { use, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { DEFAULT_IMAGE_TITLE, MAX_TITLE_LENGTH } from "../config/widget-title";
import { editableFieldClassName, useFocusOnEdit } from "../lib/editable-field";
import { SaveWidgetContext } from "../model/save-widget";
import { useRenderedDiagram } from "../model/use-rendered-diagram";
import type { ImageWidgetData, WidgetNode } from "../model/widget-node";
import { DiagramError } from "./diagram-error";
import { DiagramModal } from "./diagram-modal";

// Every member sees the same picture, whatever their own theme, as with an
// image pasted on a board.
const BOARD_DIAGRAM_THEME = "default";
const PICTURE_CLASS_NAME = "rounded bg-white p-2";

type ImageWidgetNodeProps = {
    id: string;
    data: ImageWidgetData;
    selected: boolean;
};

/** A diagram added to the board from an AI answer, shown as a picture. */
export function ImageWidgetNode({ id, data, selected }: ImageWidgetNodeProps) {
    const { updateNodeData } = useReactFlow<WidgetNode>();
    const saveWidget = use(SaveWidgetContext);
    const diagram = useRenderedDiagram(data.code, BOARD_DIAGRAM_THEME);
    const titleInputRef = useRef<HTMLInputElement>(null);
    // The title becomes editable only after a double click on it, as on the
    // other blocks; a double click on the picture opens it instead.
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");
    const [isExpanded, setExpanded] = useState(false);

    useFocusOnEdit(titleInputRef, isEditingTitle);

    const startEditingTitle = () => {
        if (isEditingTitle) return;
        setTitleDraft(data.label);
        setIsEditingTitle(true);
    };

    const commitTitle = () => {
        setIsEditingTitle(false);

        const label = titleDraft.trim() || DEFAULT_IMAGE_TITLE;
        if (label === data.label) return;

        updateNodeData(id, { label });
        saveWidget(id, { title: label });
    };

    return (
        <div
            className={`w-80 rounded-md [border:var(--xy-node-border-default)] border-emerald-500! bg-(--xy-node-background-color-default) p-2 text-xs text-(--xy-node-color-default) ${
                selected ? "ring-2 ring-purple-500" : ""
            }`}
        >
            <div className="mb-1 flex items-center gap-1">
                <input
                    ref={titleInputRef}
                    className={`${isEditingTitle ? editableFieldClassName(true) : "block w-full cursor-default bg-transparent outline-none"} min-w-0 flex-1 truncate font-semibold`}
                    readOnly={!isEditingTitle}
                    tabIndex={isEditingTitle ? 0 : -1}
                    maxLength={MAX_TITLE_LENGTH}
                    placeholder={DEFAULT_IMAGE_TITLE}
                    aria-label="Image block title"
                    value={isEditingTitle ? titleDraft : data.label}
                    onDoubleClick={startEditingTitle}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    onBlur={commitTitle}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape")
                            event.currentTarget.blur();
                    }}
                />
                {diagram.status === "rendered" && (
                    // "nodrag" lets the button be pressed without moving the block.
                    <div className="nodrag">
                        <DiagramModal
                            renderId={diagram.id}
                            svg={diagram.svg}
                            code={data.code}
                            isOpen={isExpanded}
                            onOpenChange={setExpanded}
                            pictureClassName={PICTURE_CLASS_NAME}
                        />
                    </div>
                )}
            </div>
            {diagram.status === "rendered" && (
                <div
                    className={PICTURE_CLASS_NAME}
                    onDoubleClick={() => setExpanded(true)}
                    dangerouslySetInnerHTML={{ __html: diagram.svg }}
                />
            )}
            {diagram.status === "rendering" && (
                <p className="opacity-60" role="status">
                    Rendering the diagram…
                </p>
            )}
            {diagram.status === "failed" && (
                <DiagramError error={diagram.error} />
            )}
        </div>
    );
}
