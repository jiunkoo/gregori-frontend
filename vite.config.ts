import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/features/components"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@models": path.resolve(__dirname, "./src/models"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
