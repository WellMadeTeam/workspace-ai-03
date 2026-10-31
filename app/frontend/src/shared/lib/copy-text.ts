// navigator.clipboard exists only in a secure context, and the VM serves the
// product over plain HTTP, where only execCommand is left. The text is
// selected inside `container`, so a dialog's focus trap does not take the
// focus, and the selection with it, away before it is copied.
export async function copyText(
    text: string,
    container: HTMLElement = document.body,
): Promise<boolean> {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Falls back to execCommand below.
        }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    container.append(textarea);
    textarea.focus();
    textarea.select();

    try {
        return document.execCommand("copy");
    } catch {
        return false;
    } finally {
        textarea.remove();
    }
}
