import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";
import { tempoVitePlugin } from "tempo-sdk";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const tempoRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(tempoRoot, "..");

export default defineConfig({
  root: tempoRoot,
  optimizeDeps: {
    entries: ["index.html", "designs/**/index.canvas.tsx"],
    include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  css: {
    postcss: {
      // Tailwind v4 is CSS-first: theme + sources live in
      // ../src/styles/globals.css (imported by ./globals.css).
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      react: path.resolve(tempoRoot, "node_modules/react"),
      "react-dom": path.resolve(tempoRoot, "node_modules/react-dom"),
      "react/jsx-dev-runtime": path.resolve(
        tempoRoot,
        "node_modules/react/jsx-dev-runtime.js",
      ),
      "react/jsx-runtime": path.resolve(
        tempoRoot,
        "node_modules/react/jsx-runtime.js",
      ),
      "framer-motion": path.resolve(tempoRoot, "node_modules/framer-motion"),
    },
    dedupe: ["react", "react-dom", "framer-motion", "react-router-dom"],
  },
  plugins: [
    tempoVitePlugin({ sourceIdentityRoot: projectRoot }),
    react(),
    tsconfigPaths({
      projectDiscovery: "lazy",
    }),
  ],
  server: {
    fs: {
      allow: [".."],
    },
  },
});
