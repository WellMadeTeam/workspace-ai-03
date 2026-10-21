import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        // Resolves the "@/*" alias from tsconfig.app.json.
        tsconfigPaths: true,
    },
    server: {
        proxy: {
            // The backend has no CORS, so the API is served from the same origin.
            "/api": {
                target: "http://localhost:8000",
                rewrite: (path) => path.replace(/^\/api/, ""),
                // Also forwards the board WebSockets under /api/ws.
                ws: true,
            },
        },
    },
});
