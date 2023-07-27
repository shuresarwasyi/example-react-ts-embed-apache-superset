import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8081,
    proxy: {
      "/supersetdomain": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supersetdomain/, ""),
      },
      "/static": {
        target: "http://localhost:8080/static",
        rewrite: (path) => path.replace(/^\/static/, ""),
      },
    },
  },
  plugins: [react()],
});
