import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tempoVitePlugin } from "tempo-sdk";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    // Injects the data-tempo-* source annotations the Tempo canvas needs to
    // map route-storyboard DOM back to source for selection + editing. Route
    // storyboards load from this app dev server, so without it their elements
    // aren't clickable on the canvas. No-ops unless TEMPO=true (set by Tempo's
    // start script), so a standalone `npm run dev` is unaffected.
    tempoVitePlugin(),
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
