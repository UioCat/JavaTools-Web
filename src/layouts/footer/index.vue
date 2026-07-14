<template>
  <footer class="java-footer">
    <a
      class="java-footer__link"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
    >
      浙ICP备20005026号-1
    </a>
    <span class="java-footer__divider" aria-hidden="true">|</span>
    <span>33060202000774</span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style lang="less" scoped>
.java-footer {
  box-sizing: border-box;
  height: 48px;
  border-top: solid 1px #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  font-size: 13px;

  &__link {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: #409eff;
      text-decoration: underline;
    }
  }

  &__divider {
    margin: 0 12px;
    color: #c0c4cc;
  }
}
</style>
