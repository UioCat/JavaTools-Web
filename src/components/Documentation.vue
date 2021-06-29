<template>
  <el-scrollbar height="calc(100vh - 52px)">
    <div v-html="markdown" class="java-docs line-numbers"></div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItTaskLists from "markdown-it-task-lists";

export default defineComponent({
  name: "documentation",
  props: {
    markdown: { type: String, required: true },
  },
  setup(props) {
    let markdownEngine: any;

    (() => {
      markdownEngine = new MarkdownIt({
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
    })();

    return {
      markdown: markdownEngine.render(props.markdown),
    };
  },
  mounted() {
    (window as any).Prism.highlightAll();
  },
});
</script>

<style scoped lang="less">
.java-docs {
  text-align: left;
  padding: 0 2em 2em 2em;
}

::v-deep(li) {
  list-style: square;
}
</style>
