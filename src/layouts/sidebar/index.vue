<template>
  <el-aside class="java-sidebar">
    <el-menu
      class="java-sidebar__menu"
      mode="vertical"
      :default-active="defaultActive"
      router
    >
      <el-menu-item v-for="(i, k) in navList" :key="k" :index="i.index">
        {{ i.title }}
      </el-menu-item>
    </el-menu>

    <div class="java-sidebar__record">
      <el-tag>浙 ICP 备 20005026 号</el-tag>
      <el-tag>33060202000774</el-tag>
    </div>
  </el-aside>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {router, table} from "@/router";

export default defineComponent({
  name: "Sidebar",

  setup() {
    const urlParam =  router.currentRoute.value.path as string;
    return {
      navList: table,
      defaultActive: urlParam
    };
  },
});
</script>

<style lang="less" scoped>
.java-sidebar {
  width: 160px;

  &__menu {
    height: calc(100% - 76px);
    overflow-y: auto;

    li {
      font-weight: 500;
      font-size: 15px;
      user-select: none;
      justify-content: center;

      &.is-active {
        padding-right: 18px;
        border-right: 2px solid #409eff;
        background-color: #ecf5ff;
      }
    }
  }

  &__record {
    padding-bottom: 1em;
    width: calc(160px - 1px);
    border-right: solid 1px #e6e6e6;

    .el-tag + .el-tag {
      margin-top: 1em;
    }
  }
}
</style>
