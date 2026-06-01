import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const tempoRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(tempoRoot, "..");

export default defineConfig(async () => {
  const { tempoVitePlugin } = await import("tempo-sdk");

  return {
    root: tempoRoot,
    css: {
      postcss: projectRoot,
    },
    plugins: [
      tempoVitePlugin(),
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
  };
});
