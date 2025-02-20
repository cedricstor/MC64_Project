import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        hmr: {
            protocol: "ws",
            host: "localhost",
            port: 5173,
        },
        headers: {
            "Content-Security-Policy": "connect-src 'self' ws://4.248.203.4:3000 http://4.248.203.4:5000;"
        }
    },
});