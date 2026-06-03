import { defineConfig } from "vite";

// A to Z Automotive — static marketing site.
// Vanilla Vite (no framework) keeps the runtime tiny: just bundled,
// minified, content-hashed CSS + a few KB of JS. Vercel auto-detects
// this config and serves the `dist/` output from its global CDN.
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    target: "es2018",
    cssMinify: true,
    minify: "esbuild",
    sourcemap: false,
    // Inline small assets as data URIs to cut request count.
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
