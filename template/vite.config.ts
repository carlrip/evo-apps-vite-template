import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { accessReactAppBuildConfig } from "tbcaccess-app-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: accessReactAppBuildConfig(),
});
