<template>
  <el-container class="java-wrapper">
    <el-aside width="160px">
      <el-menu mode="vertical" :default-active="`/${defaultActive}`" router>
        <div class="java-sidebar-title">
          <i class="el-icon-takeaway-box" />
          JavaTools
        </div>

        <el-menu-item v-for="(i, k) in navList" :key="k" :index="i.index">
          {{ i.title }}
        </el-menu-item>

        <div class="java-sidebar-record">
          <el-tag size="mini">浙 ICP 备 20005026 号</el-tag>
          <el-tag size="mini">33060202000774</el-tag>
        </div>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="java-header">
          <i class="el-icon-s-platform"></i>
          JavaTools
        </div>
      </el-header>

      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="includeComp">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { table } from "@/router";
import TransformDecimal from "@/containers/TransformDecimal.vue";
import TransformAscii from "@/containers/TransformAscii.vue";
import GenerateMybatis from "@/containers/GenerateMybatis.vue";
import SetupByJava from "@/containers/SetupByJava.vue";
import SetupBySql from "@/containers/SetupBySql.vue";

const components = {
  TransformDecimal,
  TransformAscii,
  GenerateMybatis,
  SetupByJava,
  SetupBySql,
};

export default defineComponent({
  name: "App",
  components,
  data() {
    return {
      navList: table,
      defaultActive: Object.keys(components)[1],
      includeComp: Object.keys(components).join(", "),
    };
  },
});
</script>

<style lang="less">
@import "./styles/var.less";

.java-wrapper {
  height: 100vh;
}

.el-menu {
  height: 100%;

  li {
    font-weight: 500;
    font-size: 15px;
    text-align: right;

    &.is-active {
      padding-right: 18px;
      border-right: 2px solid #409eff;
      background-color: #ecf5ff;
    }
  }

  .java-sidebar-title {
    font-weight: bolder;
    font-size: 1.4em;
    cursor: pointer;
    height: 60px;
    line-height: 60px;
  }

  .java-sidebar-record {
    position: absolute;
    bottom: 1em;
  }
}

.el-header {
  padding: 0;
  box-shadow: 2px 2px 5px 2px #e4e9ee;

  .java-header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
    font-size: 1.4em;
    height: 100%;
  }
}
</style>
