<template>
  <el-header class="java-header">
    <div class="header-logo"></div>
    <div class="header-label">{{ appName }}</div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Header",

  setup() {
    return {
      appName: computed(() => import.meta.env.VITE_APP_NAME),
    };
  },
});
</script>

<style lang="less" scoped>
.java-header {
  padding: 0;
  box-shadow: 2px 2px 5px 2px #e4e9ee;
  display: flex;

  .header-logo {
    width: 1.4em;
    height: 100%;
  }

  .header-label {
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: bolder;
    font-size: 1.4em;
  }
}
</style>
