import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  plugins: [
    vue(),
    alias({
      entries: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    }),
  ],
});
