import { createContext } from "react";

/** Adds a diagram to the board as an image block; resolves to whether it did. */
export type AddDiagram = (code: string) => Promise<boolean>;

/** Provided by the panel of the AI block whose answers hold the diagrams. */
export const AddDiagramContext = createContext<AddDiagram | null>(null);
