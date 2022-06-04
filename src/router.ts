import { createRouter, createWebHashHistory } from "vue-router";

const { VITE_BASE_PATH = "" } = import.meta.env;

export const table = [
  {
    index: "transform-decimal",
    // icon: "el-icon-aim",
    title: "进制转换",
  },
  {
    index: "create-table",
    // icon: "el-icon-discover",
    title: "创建 Table",
  },
  {
    index: "consume",
    // icon: "el-icon-discover",
    title: "账单",
  },
].map((item) => ({ ...item, index: `/app/${item.index}` }));

export const router = createRouter({
  history: createWebHashHistory(VITE_BASE_PATH),
  routes: [
    {
      path: "/",
      redirect: "/app",
    },
    {
      path: "/login",
      component: () => import("@/pages/login/index.vue"),
    },
    {
      path: "/app",
      redirect: table[0].index,
      component: () => import("@/pages/app/index.vue"),
      children: [
        {
          path: "transform-decimal",
          component: () => import("@/containers/transform-decimal/index.vue"),
        },
        {
          path: "create-table",
          component: () => import("@/containers/create-table/index.vue"),
        },
        {
          path: "generate-mybatis",
          component: () => import("@/containers/generate-mybatis/index.vue"),
        },
        {
          path: "setup-by-sql",
          component: () => import("@/containers/setup-by-sql/index.vue"),
        },
        {
          path: "setup-by-java",
          component: () => import("@/containers/setup-by-java/index.vue"),
        },
        {
          path: "consume",
          component: () => import("@/containers/consume/index.vue"),
        },
      ],
    },
  ],
});

export const authRoutes = ["/app/consume"];

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem("token");

  if (to.path === "/login" && isLogin) {
    return next("/app");
  }

  if (authRoutes.includes(to.path) && !isLogin) {
    return next("/login");
  }

  return next();
});
