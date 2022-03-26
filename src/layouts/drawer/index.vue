<template>
  <el-tooltip effect="dark" content="帮助" placement="left">
    <div
      class="java-docs__tips"
      :v-show="!showDrawer"
      @click="showDrawer = true"
    />
  </el-tooltip>

  <el-drawer
    modal-class="java-docs__drawer"
    size="40%"
    :title="`${appName} 说明文档`"
    direction="rtl"
    v-model="showDrawer"
  >
    <el-scrollbar height="calc(100vh - 52px)">
      <div v-html="markdownText" class="java-docs__inner line-numbers" />
    </el-scrollbar>
  </el-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { ElMessage } from "element-plus";
import MarkdownIt from "markdown-it";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItTaskLists from "markdown-it-task-lists";
import { get } from "@/utils/network";

const markdownEngine = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const BAD_PROTO_RE = /^(vbscript|javascript|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

markdownEngine.validateLink = (url: string) => {
  let str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? !!GOOD_DATA_RE.test(str) : true;
};

markdownEngine.use(MarkdownItSup);
markdownEngine.use(MarkdownItSub);
markdownEngine.use(MarkdownItMark);
markdownEngine.use(MarkdownItTaskLists, {
  label: true,
  labelAfter: true,
});

export default defineComponent({
  name: "documentation",

  setup() {
    const markdownText = ref("");

    onMounted(() => {
      get("/mock/document.md", true)
        .then((res) => res.text())
        .then((res) => {
          markdownText.value = markdownEngine.render(res);
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "文档加载失败",
            showClose: true,
          });
        });
    });

    const showDrawer = ref(false);

    watch(showDrawer, (value) => {
      if (!value) {
        return;
      }

      nextTick(() => {
        (window as any).Prism.highlightAll();
      });
    });

    return {
      appName: computed(() => import.meta.env.VITE_APP_NAME),
      showDrawer,
      markdownText,
    };
  },
});
</script>

<style lang="less">
.java-docs {
  &__tips {
    position: fixed;
    top: 50%;
    width: 50px;
    right: -25px;
    height: 50px;
    border-radius: 50%;
    background-color: #ecf5ff;
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

  &__drawer {
    .el-drawer__title {
      margin-bottom: 0;
    }

    .el-drawer__body {
      padding: 0;
    }

    .java-docs__inner {
      text-align: left;
      padding: 0 2em 2em 2em;

      li {
        list-style: square;
      }

      code {
        font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      }
    }
  }
}
</style>
