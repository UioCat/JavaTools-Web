import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// @ts-ignore
export default ({ mode }) =>
  defineConfig({
    base: `${loadEnv(mode, "").VITE_BASE_PATH}`,
    server: {
      port: 10000,
      proxy: {
        "/api": {
          target: "https://www.uiofield.top/server/",
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
