<template>
  <el-row>
    <el-col :span="20" :push="2">
      <div>
        <label>选择输入的进制：</label>
        <el-radio-group v-model="desc" size="small">
          <el-radio-button label="2" />
          <el-radio-button label="10" />
          <el-radio-button label="16" />
        </el-radio-group>
      </div>

      <el-divider />

      <el-card>
        <label>输入值</label>
        <el-input
          placeholder="请输入"
          v-model="input"
          clearable
          autofocus
          @keyup="handleChange($event)"
        />
      </el-card>

      <el-divider />

      <el-card>
        <label>二进制</label>
        <el-input
          placeholder="二进制输出"
          v-model="output_B"
          @focus="handleCopy($event)"
        />
      </el-card>

      <el-card>
        <label>十进制</label>
        <el-input
          placeholder="十进制输出"
          v-model="output_D"
          @focus="handleCopy($event)"
        />
      </el-card>

      <el-card>
        <label>十六进制</label>
        <el-input
          placeholder="十六进制输出"
          v-model="output_H"
          @focus="handleCopy($event)"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "transform-decimal",
  setup() {
    const desc = ref("10");
    const input = ref("");
    const output_B = ref("");
    const output_D = ref("");
    const output_H = ref("");

    function handleChange() {
      let val, pre;
      if (!input.value) {
        output_B.value = "";
        output_D.value = "";
        output_H.value = "";
        return;
      }
      switch (desc.value) {
        case "2":
          pre = input.value
            .split("")
            .map((i) => (i === "1" || i === "0" ? i : "N"))
            .join("");
          if (pre.search("N") !== -1) {
            ElMessage({
              message: "输入有误",
              type: "error",
              offset: 65,
            });
            return;
          }
          val = Number.parseInt(input.value, 2);
          output_B.value = input.value;
          output_D.value = val.toString(10);
          output_H.value = val.toString(16).toUpperCase();
          break;
        case "10":
          pre = input.value
            .split("")
            .map((i) => (i >= "0" && i <= "9" ? i : "N"))
            .join("");
          if (pre.search("N") !== -1) {
            ElMessage({
              message: "输入有误",
              type: "error",
              offset: 65,
            });
            return;
          }
          val = Number.parseInt(input.value, 10);
          output_B.value = val.toString(2);
          output_D.value = input.value;
          output_H.value = val.toString(16).toUpperCase();
          break;
        case "16":
          pre = input.value
            .split("")
            .map((i) => (!((i >= "G" && i <= "Z") || (i >= "g" && i <= "z")) ? i : "N"))
            .join("");
          if (pre.search("N") !== -1) {
            ElMessage({
              message: "输入有误",
              type: "error",
              offset: 65,
            });
            return;
          }
          val = Number.parseInt(pre, 16);
          output_B.value = val.toString(2);
          output_D.value = val.toString(10);
          output_H.value = input.value.toUpperCase();
          break;
      }
    }

    function handleCopy(e: any) {
      if (!input.value) return;

      e.target.select();
      document.execCommand("Copy");
      ElMessage.success({
        message: "成功复制到剪贴板",
        type: "success",
        offset: 65,
      });
    }

    return {
      desc,
      input,
      output_B,
      output_D,
      output_H,

      handleCopy,
      handleChange,
    };
  },
});
</script>

<style scoped lang="less">
.el-row {
  height: 100%;
}

.el-col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.el-input {
  margin-top: 5px;
}
</style>
