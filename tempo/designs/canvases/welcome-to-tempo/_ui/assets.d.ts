// Image asset module declarations for the welcome-to-tempo canvas (tsc-only;
// Vite resolves these at build time). The tutorial repo's base tsconfig
// doesn't pull `vite/client`, so declare the formats the canvas imports.
declare module "*.png" { const src: string; export default src; }
declare module "*.webp" { const src: string; export default src; }
declare module "*.jpg" { const src: string; export default src; }
declare module "*.svg" { const src: string; export default src; }
