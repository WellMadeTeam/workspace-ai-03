import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./styles/color-scheme";
import "./styles/index.css";
import { router } from "./router";

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
