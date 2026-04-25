import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite Configuration
 *
 * @see https://vitejs.dev/config/
 *
 * Key decisions:
 *  - Base path is read from VITE_APP_URL so the same build artifact can be
 *    deployed to a sub-path (e.g. GitHub Pages /repo-name/) without rebuilding.
 *  - Path aliases keep imports clean across deeply nested components.
 *  - Source maps are enabled only in development to avoid leaking source in prod.
 *  - chunk splitting separates vendor libs (react, framer-motion, icons) from
 *    app code, improving long-term browser caching.
 */
export default defineConfig(({ mode }) => {
  // Load env file based on current mode (development | production | preview)
  // so we can reference VITE_* variables inside this config file itself.
  const env = loadEnv(mode, process.cwd(), "");

  const isProd = mode === "production";

  /**
   * Derive the base path from VITE_APP_URL.
   * e.g. "https://yourportfolio.dev"        → "/"
   *      "https://user.github.io/dev-portfolio" → "/dev-portfolio/"
   * Falls back to "/" when the env var is absent.
   */
  const getBasePath = () => {
    if (!env.VITE_APP_URL) return "/";
    try {
      const { pathname } = new URL(env.VITE_APP_URL);
      // Ensure the path always ends with a trailing slash
      return pathname.endsWith("/") ? pathname : `${pathname}/`;
    } catch {
      return "/";
    }
  };

  return {
    // ─── Base public path ────────────────────────────────────────────────────
    base: getBasePath(),

    // ─── Plugins ─────────────────────────────────────────────────────────────
    plugins: [
      react({
        // Enables the faster Babel-based JSX transform shipped with React 17+.
        // @vitejs/plugin-react uses Babel under the hood by default, so no
        // additional babel.config is needed for basic usage.
        jsxRuntime: "automatic",

        // Fast Refresh configuration — ensures HMR works reliably for hooks
        // and context-heavy components.
        fastRefresh: true,
      }),
    ],

    // ─── Path aliases ────────────────────────────────────────────────────────
    resolve: {
      alias: {
        // Allows "import X from '@/components/X'" instead of long relative paths
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@data": path.resolve(__dirname, "./src/data"),
      },
    },

    // ─── Development server ──────────────────────────────────────────────────
    server: {
      port: 5173,
      strictPort: false,      // Increment the port automatically if 5173 is taken
      open: true,             // Open browser tab on `vite dev`
      cors: true,

      // Hot Module Replacement overlay — surfaces build errors directly in the
      // browser without needing to check the terminal.
      hmr: {
        overlay: true,
      },
    },

    // ─── Preview server (vite preview) ───────────────────────────────────────
    preview: {
      port: 4173,
      strictPort: false,
      open: true,
    },

    // ─── Build options ───────────────────────────────────────────────────────
    build: {
      // Target modern browsers — aligns with Tailwind's browserslist defaults.
      target: "es2020",

      outDir: "dist",
      assetsDir: "assets",

      // Only emit source maps in non-production builds to avoid exposing
      // unminified source code to end users.
      sourcemap: !isProd,

      // Warn when any individual chunk exceeds this size (in kB).
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          /**
           * Manual chunk splitting strategy:
           *
           *  - "vendor-react"   → react, react-dom, react-router-dom, react-scroll
           *  - "vendor-motion"  → framer-motion (large; rarely changes)
           *  - "vendor-icons"   → react-icons   (large icon set)
           *  - "vendor-misc"    → remaining third-party code
           *
           * Splitting on module origin (node_modules vs src) means the browser
           * can cache vendor chunks independently of app code changes.
           */
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;

            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router-dom/") ||
              id.includes("/react-scroll/") ||
              id.includes("/react-intersection-observer/") ||
              id.includes("/react-type-animation/")
            ) {
              return "vendor-react";
            }

            if (id.includes("/framer-motion/")) {
              return "vendor-motion";
            }

            if (id.includes("/react-icons/")) {
              return "vendor-icons";
            }

            return "vendor-misc";
          },

          // Deterministic file names with content hashes for cache busting.
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: isProd
            ? "assets/js/[name]-[hash].js"
            : "assets/js/[name].js",
          assetFileNames: ({ name }) => {
            if (!name) return "assets/[name]-[hash][extname]";

            // Route fonts, images, and stylesheets to dedicated sub-directories.
            if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(name)) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/i.test(name)) {
              return "assets/css/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },

      // Use esbuild for minification — faster than Terser with comparable output.
      minify: isProd ? "esbuild" : false,
    },

    // ─── CSS options ─────────────────────────────────────────────────────────
    css: {
      devSourcemap: !isProd,

      // PostCSS is configured via postcss.config.js (Tailwind + Autoprefixer).
      // No inline configuration needed here.
    },

    // ─── Optimisation ────────────────────────────────────────────────────────
    optimizeDeps: {
      // Pre-bundle heavy dependencies so initial cold-start in dev is fast.
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "react-icons",
        "react-scroll",
        "react-intersection-observer",
        "react-type-animation",
      ],
    },

    // ─── Environment variable exposure ───────────────────────────────────────
    // Only variables prefixed with VITE_ are injected into the client bundle
    // (Vite's default behaviour). No additional envPrefix override is needed.
    envPrefix: "VITE_",

    // ─── Logging ─────────────────────────────────────────────────────────────
    logLevel: env.VITE_DEBUG === "true" ? "info" : "warn",
  };
});