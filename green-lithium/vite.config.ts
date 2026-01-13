import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ensure assets are loaded correctly
  build: {
    outDir: "dist", // default, just to be explicit
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000", // ONLY used in dev
    },
  },
});
