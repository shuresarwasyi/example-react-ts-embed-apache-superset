import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/supersetdomain": {
        target: "https://report.vernoss.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supersetdomain/, ""),
      },
      "/static": {
        target: "https://report.vernoss.io/static",
        rewrite: (path) => path.replace(/^\/static/, ""),
      },
    },
  },
  plugins: [react()],
});
