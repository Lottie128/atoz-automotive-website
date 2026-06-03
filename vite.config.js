import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL(".", import.meta.url));
const partialsDir = resolve(root, "partials");

/**
 * Lightweight build-time HTML partials.
 * Use `<!-- @include header -->` in any page to inline partials/header.html.
 * Keeps the multi-page site DRY with zero runtime cost and no extra deps.
 */
function htmlPartials() {
  const read = (name) => readFileSync(resolve(partialsDir, `${name}.html`), "utf-8");
  const expand = (html) =>
    html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) => read(name));
  return {
    name: "html-partials",
    enforce: "pre",
    transformIndexHtml: { order: "pre", handler: expand },
    configureServer(server) {
      // Re-render pages when a partial changes.
      server.watcher.add(partialsDir);
      server.watcher.on("change", (file) => {
        if (file.startsWith(partialsDir)) server.ws.send({ type: "full-reload" });
      });
    },
  };
}

/**
 * Clean URLs locally (matches Vercel `cleanUrls`): map `/about` -> `/about.html`
 * so dev + preview behave like production with no `.html` in links.
 */
function cleanUrls() {
  const rewrite = (req, _res, next) => {
    const [path, query = ""] = (req.url || "/").split("?");
    if (path !== "/" && !/\.[a-z0-9]+$/i.test(path)) {
      req.url = path.replace(/\/$/, "") + ".html" + (query ? "?" + query : "");
    }
    next();
  };
  return {
    name: "clean-urls",
    configureServer(s) {
      s.middlewares.use(rewrite);
    },
    configurePreviewServer(s) {
      s.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  base: "/",
  appType: "mpa",
  plugins: [htmlPartials(), cleanUrls()],
  build: {
    outDir: "dist",
    target: "es2018",
    cssMinify: true,
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        about: resolve(root, "about.html"),
        services: resolve(root, "services.html"),
        parts: resolve(root, "parts.html"),
        contact: resolve(root, "contact.html"),
      },
    },
  },
  server: { port: 5173, open: true },
});
