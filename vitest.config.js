import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  test: { dir: "tests", alias: { "~/": "/", "@/": "/" }, environment: "jsdom" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "#app": path.resolve(
        __dirname,
        "./node_modules/nuxt/dist/app/index.d.ts",
      ),
      "#head": path.resolve(
        __dirname,
        "./node_modules/nuxt/dist/app/index.d.ts",
      ),
    },
  },
  plugins: [vue()],
});
