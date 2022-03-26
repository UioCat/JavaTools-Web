import { createRouter, createWebHistory } from "vue-router";

import TransformAscii from "@/containers/TransformAscii.vue";
import TransformDecimal from "@/containers/TransformDecimal.vue";
import CreateTable from "@/containers/CreateTable.vue";
import GenerateMybatis from "@/containers/GenerateMybatis.vue";
import SetupBySql from "@/containers/SetupBySql.vue";
import SetupByJava from "@/containers/SetupByJava.vue";

const { VITE_BASE_PATH: base } = import.meta.env;

export const table = [
  {
    index: "/TransformDecimal",
    icon: "el-icon-aim",
    title: "进制转换",
  },
  {
    index: "/TransformAscii",
    icon: "el-icon-discover",
    title: "ASCII 转换",
  },
  {
    index: "/CreateTable",
    icon: "el-icon-discover",
    title: "创建 Table",
  },
  {
    index: "/GenerateMybatis",
    icon: "el-icon-discover",
    title: "生成 MyBatis",
  },
  {
    index: "/SetupBySql",
    icon: "el-icon-discover",
    title: "Setup By SQL",
  },
  {
    index: "/SetupByJava",
    icon: "el-icon-discover",
    title: "Setup By Java",
  },
].map((item) => ({ ...item, index: `${base}${item.index}` }));

const routes = [
  { path: `${base}/`, redirect: `${base}/TransformAscii` },
  { path: `${base}/TransformAscii`, component: TransformAscii },
  { path: `${base}/TransformDecimal`, component: TransformDecimal },
  { path: `${base}/CreateTable`, component: CreateTable },
  { path: `${base}/GenerateMybatis`, component: GenerateMybatis },
  { path: `${base}/SetupBySql`, component: SetupBySql },
  { path: `${base}/SetupByJava`, component: SetupByJava },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
