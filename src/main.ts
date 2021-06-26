import { createApp } from "vue";
import ElementPlus from "element-plus";

import "element-plus/lib/theme-chalk/index.css";
import "element-plus/packages/theme-chalk/src/base.scss";

import { router } from "./router";
import { store } from "./stores";
import App from "./App.vue";

import "./styles/index.less";

const app = createApp(App);

app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
