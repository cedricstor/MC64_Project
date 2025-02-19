import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";  // ✅ Ensure correct plugin

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,   // ✅ Ensures consistent dev server port
        strictPort: true,  // ✅ Prevents auto-switching ports
        watch: {
            usePolling: true,  // ✅ Fixes issues on some systems (WSL, Docker, MacOS)
        }
    },
    optimizeDeps: {
        include: ["react", "react-dom"],  // ✅ Ensures React modules are pre-optimized
    }
});