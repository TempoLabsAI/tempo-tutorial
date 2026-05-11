import type { Config } from "tailwindcss";
import baseConfig from "../tailwind.config";

// Tempo sidecar Tailwind config.
//
// When Vite runs from tempo/, Tailwind looks for tailwind.config.ts in the cwd
// (tempo/) and won't find the parent's config. This file re-exports the
// parent's config but rewrites content paths to be relative to tempo/.
export default {
  ...baseConfig,
  content: [
    "../index.html",
    "../src/**/*.{ts,tsx}",
    "./**/*.{ts,tsx}",
  ],
} satisfies Config;
