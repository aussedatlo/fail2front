import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@view": path.resolve(__dirname, "./src/view/"),
      "@data": path.resolve(__dirname, "/src/data/"),
      "@domain": path.resolve(__dirname, "./src/domain/"),
      "@types": path.resolve(__dirname, "./src/types/"),
    },
  },
});
