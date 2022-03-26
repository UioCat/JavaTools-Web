<template>
  <Header />
  <el-container class="java-container">
    <Sidebar />
    <Main />
  </el-container>
  <Drawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/layouts/sidebar/index.vue";
import Header from "@/layouts/header/index.vue";
import Drawer from "@/layouts/drawer/index.vue";
import Main from "@/layouts/main/index.vue";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Sidebar,
    Main,
    Drawer,
  },

  setup() {},
});
</script>

<style lang="less" scoped>
@import "../../styles/var.less";

.java-header {
  width: 100%;
}

.java-container {
  height: calc(100% - 60px);
}
</style>
