import { createRouter, createWebHistory } from "vue-router";

import TransformAscii from "@/containers/TransformAscii.vue";
import TransformDecimal from "@/containers/TransformDecimal.vue";
import GenerateMybatis from "@/containers/GenerateMybatis.vue";
import SetupBySql from "@/containers/SetupBySql.vue";
import SetupByJava from "@/containers/SetupByJava.vue";

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
];

const routes = [
  { path: "/", redirect: "/TransformAscii" },
  { path: "/TransformAscii", component: TransformAscii },
  { path: "/TransformDecimal", component: TransformDecimal },
  { path: "/SetupBySql", component: SetupBySql },
  { path: "/SetupByJava", component: SetupByJava },
  { path: "/GenerateMybatis", component: GenerateMybatis },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
