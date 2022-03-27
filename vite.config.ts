import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  base: "/tools-web-test/",
  server: {
    port: 10000,
    proxy: {
      "/api": {
        target: "https://www.uiofield.top/serve_test/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  plugins: [
    alias({
      entries: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
});
