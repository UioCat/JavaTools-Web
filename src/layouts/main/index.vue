<template>
  <el-main class="java-main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransformDecimal from "@/containers/transform-decimal/index.vue";
import CreateTable from "@/containers/create-table/index.vue";
import GenerateMybatis from "@/containers/generate-mybatis/index.vue";
import SetupBySql from "@/containers/setup-by-sql/index.vue";
import SetupByJava from "@/containers/setup-by-java/index.vue";

export default defineComponent({
  name: "Main",

  components: {
    TransformDecimal,
    GenerateMybatis,
    CreateTable,
    SetupByJava,
    SetupBySql,
  },

  setup() {},
});
</script>

<style lang="less" scoped>
.java-main {
  padding: 30px;
}
</style>
