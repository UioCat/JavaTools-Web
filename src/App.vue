<template>
  <el-container class="java-wrapper">
    <el-aside width="160px" class="java-sidebar">
      <div class="java-sidebar-title"></div>

      <el-menu mode="vertical" :default-active="`${basePath}/${defaultActive}`" router>
        <el-menu-item v-for="(i, k) in navList" :key="k" :index="i.index">
          {{ i.title }}
        </el-menu-item>
      </el-menu>

      <div class="java-sidebar-record">
        <el-tag>浙 ICP 备 20005026 号</el-tag>
        <el-tag>33060202000774</el-tag>
      </div>
    </el-aside>

    <el-container>
      <el-header>
        <div class="java-header">
          <i class="el-icon-coffee-cup" style="margin-right: 0.5em" />
          {{ appName }}
        </div>
      </el-header>

      <el-main class="java-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>

    <el-tooltip effect="dark" content="帮助" placement="left">
      <div class="java-docs__tips" :v-show="!showDrawer" @click="showDrawer = true"></div>
    </el-tooltip>

    <el-drawer
      modal-class="java-docs__drawer"
      size="40%"
      :title="`${appName} 说明文档`"
      direction="rtl"
      destroy-on-close
      v-model="showDrawer"
    >
      <Documentation :markdown="docData" />
    </el-drawer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { table } from "@/router";
import { get } from "@/services/network";
import Documentation from "@/components/Documentation.vue";
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
  components: {
    ...components,
    Documentation,
  },
  data() {
    return {
      docData: "",
      navList: table,
      showDrawer: false,
      defaultActive: Object.keys(components)[0],
    };
  },
  mounted() {
    get("/mock/document.md", true)
      .then((res) => res.text())
      .then((res) => {
        this.docData = res;
      })
      .catch((err) => {});
  },
  computed: {
    appName() {
      return import.meta.env.VITE_APP_NAME;
    },
    basePath() {
      return import.meta.env.VITE_BASE_PATH;
    },
  },
});
</script>

<style lang="less">
@import "./styles/var.less";

.java-wrapper {
  height: 100vh;
  min-height: 600px;
}

.java-docs__tips {
  position: fixed;
  top: 50%;
  width: 50px;
  right: -25px;
  height: 50px;
  border-radius: 50%;
  background-color: aliceblue;
  box-shadow: -1px 0 5px 2px #d4eaec;
  cursor: pointer;
  text-align: left;

  &::before {
    content: "<";
    position: absolute;
    width: 25px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}

.java-sidebar {
  .java-sidebar-title {
    font-weight: bolder;
    font-size: 1.4em;
    cursor: pointer;
    height: 60px;
    line-height: 60px;
    border-right: solid 1px #e6e6e6;
  }

  .el-menu {
    height: calc(100% - 60px - 76px);
    overflow-y: auto;

    li {
      font-weight: 500;
      font-size: 15px;
      text-align: right;
      user-select: none;

      &.is-active {
        padding-right: 18px;
        border-right: 2px solid #409eff;
        background-color: #ecf5ff;
      }
    }
  }

  .java-sidebar-record {
    position: absolute;
    padding-bottom: 1em;
    width: calc(160px - 1px);
    border-right: solid 1px #e6e6e6;

    .el-tag + .el-tag {
      margin-top: 1em;
    }
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

  i {
    font-weight: bolder;
  }
}

.java-docs__drawer .el-drawer__body {
  padding: 0;
}
</style>
