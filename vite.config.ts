import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Import DGA (@platformscode/icons) SVGs as React components via `?react`.
    // `icon: true` sizes them to 1em so Tailwind h-*/w-* controls the size,
    // and the source SVGs use fill="currentColor" so they inherit text color.
    svgr({
      include: "**/*.svg?react",
      svgrOptions: { icon: true },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
