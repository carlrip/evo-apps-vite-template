import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "src/App.tsx",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom/client",
        "react/jsx-runtime",
        "i18next",
        "react-i18next",
      ],
      input: {
        "access-app": "src/index.tsx",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "access-app") return "index.js";
          return "[name].js";
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "style.css";
          return "[name][extname]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
