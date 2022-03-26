import { createRouter, createWebHistory } from "vue-router";

const { VITE_BASE_PATH: base } = import.meta.env;

export const table = [
  {
    index: "transform-ascii",
    icon: "el-icon-aim",
    title: "进制转换",
  },
  {
    index: "transform-decimal",
    icon: "el-icon-discover",
    title: "ASCII 转换",
  },
  {
    index: "create-table",
    icon: "el-icon-discover",
    title: "创建 Table",
  },
  {
    index: "generate-mybatis",
    icon: "el-icon-discover",
    title: "生成 MyBatis",
  },
  {
    index: "setup-by-sql",
    icon: "el-icon-discover",
    title: "Setup By SQL",
  },
  {
    index: "setup-by-java",
    icon: "el-icon-discover",
    title: "Setup By Java",
  },
  {
    index: "consume",
    icon: "el-icon-discover",
    title: "账单",
  },
].map((item) => ({ ...item, index: `${base}/app/${item.index}` }));

export const router = createRouter({
  history: createWebHistory(),
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
      redirect: "/app/transform-ascii",
      component: () => import("@/pages/app/index.vue"),
      children: [
        {
          path: "transform-ascii",
          component: () => import("@/containers/transform-ascii/index.vue"),
        },
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

if (import.meta.env.PROD) {
  router.beforeEach((to, from, next) => {
    const isLogin = !!localStorage.getItem("token");
    if (to.path === "/login") {
      if (isLogin) {
        next("/");
      } else {
        next();
      }
    }

    if (to.path !== "/login") {
      if (!isLogin) {
        next("/login");
      } else {
        next();
      }
    }
  });
}
