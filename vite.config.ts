import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
