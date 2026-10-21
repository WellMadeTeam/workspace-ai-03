import { useEffect, type RefObject } from "react";

/** Focuses the field with the caret at the end once editing starts. */
export function useFocusOnEdit(
    fieldRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    isEditing: boolean,
) {
    useEffect(() => {
        const field = fieldRef.current;
        if (!isEditing || !field) return;

        field.focus();
        field.setSelectionRange(field.value.length, field.value.length);
    }, [fieldRef, isEditing]);
}

// While editing, "nodrag" lets the user select text and place the caret
// instead of dragging the node around. Otherwise the field ignores the
// mouse, so the block can be dragged by it.
export const editableFieldClassName = (isEditing: boolean) =>
    `block w-full bg-transparent outline-none placeholder:opacity-50 ${
        isEditing ? "nodrag cursor-text" : "pointer-events-none"
    }`;
