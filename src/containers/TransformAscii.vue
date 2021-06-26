<template>
  <el-row>
    <el-col :span="9" :push="2">
      <el-card>
        <label>输入字符：</label>
        <el-input
          :rows="5"
          type="textarea"
          placeholder="输入字符"
          v-model="stringVal"
          @focus="handleCopy($event)"
          @keyup="handleString()"
        />
      </el-card>
    </el-col>

    <el-col :span="9" :push="4">
      <el-card>
        <label>输出 ASCII：</label>
        <el-input
          :rows="5"
          type="textarea"
          placeholder="输出数值"
          v-model="numberVal"
          @focus="handleCopy($event)"
          @keypress="handleNumber()"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "transform-ascii",
  setup() {
    const stringVal = ref("");
    const numberVal = ref("");

    function handleString() {
      if (stringVal.value !== "" && stringVal.value !== " ") {
        numberVal.value = stringVal.value
          .split("")
          .map((i) => i.charCodeAt(0))
          .join(" ");
      } else {
        ElMessage({
          message: "转换失败",
          type: "error",
        });
      }
    }

    function handleNumber() {
      let pre = numberVal.value.split("");
      pre.filter((i) => (i >= "a" && i <= "z") || (i >= "A" && i <= "Z"));
      stringVal.value = pre.map((i) => i.charCodeAt(0)).join(" ");
    }

    function handleCopy(e: any) {
      if (!stringVal.value || !numberVal.value) return;
      e.target.select();
      document.execCommand("Copy");
      ElMessage({
        message: "成功复制到剪贴板",
        type: "success",
      });
    }

    return {
      stringVal,
      numberVal,
      handleString,
      handleNumber,
      handleCopy,
    };
  },
});
</script>

<style scoped lang="less">
.el-row {
  height: 100%;
}

.el-card {
  height: 100%;

  ::v-deep(.el-card__body) {
    height: calc(100% - 75px);
  }
}

.el-textarea,
::v-deep(.el-textarea__inner) {
  height: 100%;
}

.el-textarea {
  margin-top: 5px;
}
</style>
