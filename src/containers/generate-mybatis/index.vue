<template>
  <el-row class="java-mybatis">
    <el-col :span="7">
      <el-input
        v-model="code"
        placeholder="代码"
        type="textarea"
        spellcheck="false"
        resize="none"
        autofocus
        :rows="10"
        @change="parseCode($event)"
      />
    </el-col>

    <el-col :span="5" :push="2">
      <el-form :model="form" label-position="top">
        <el-form-item label="表名">
          <el-input v-model="form.tableName" placeholder="输入表名" />
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="form.className" placeholder="输入类名" />
        </el-form-item>
        <el-form-item label="包名">
          <el-input v-model="form.packageName" placeholder="输入包名" />
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="10" :push="2">
      <el-form label-position="right" label-width="120px" :model="operate">
        <el-form-item label="操作">
          <el-select v-model="operate.type" placeholder="选择操作">
            <el-option
              v-for="item in ['INSERT', 'DELETE', 'UPDATE', 'SELECT']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="字段">
          <el-select
            v-model="operate.parameterList"
            multiple
            placeholder="选择字段"
          >
            <el-option
              v-for="item in paraList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="关键字段">
          <el-select
            v-model="operate.keyParameterList"
            multiple
            placeholder="选择关键字段"
            :disabled="operate.type === 'INSERT'"
          >
            <el-option
              v-for="item in paraList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="generateCode()">提 交</el-button>
        </el-form-item>

        <el-form-item label="代码">
          <el-input
            v-model="output"
            placeholder="生成代码"
            type="textarea"
            spellcheck="false"
            resize="none"
            :autosize="{ minRows: 10, maxRows: 15 }"
            @focus="handleCopy($event)"
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import { post } from "@/utils/network";

export default defineComponent({
  name: "generate-mybatis",

  setup() {
    const code = ref("");
    const form = ref<{
      tableName: string;
      className: string;
      packageName: string;
    }>({
      tableName: "",
      className: "",
      packageName: "",
    });
    const operate = ref<{
      type: ESQLType;
      parameterList: string[];
      keyParameterList: string[];
    }>({
      type: "INSERT",
      parameterList: [],
      keyParameterList: [],
    });
    const paraList = ref<string[]>([]);

    function parseCode(code: string) {
      post("/tools/wordIdentify", { data: code })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: "success",
              message: res.message,
              offset: 65,
              showClose: true,
            });
            return res.info;
          } else {
            throw new Error(res.message);
          }
        })
        .then((res: IParsedJavaResponse) => {
          paraList.value = res.fieldList;
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err,
            offset: 65,
            showClose: true,
          });
        });
    }

    const output = ref("");
    function generateCode() {
      const PATH = {
        INSERT: "/tools/insertMsg",
        DELETE: "/tools/deleteMsg",
        UPDATE: "/tools/updateTable",
        SELECT: "/tools/selectTable",
        CREATE: "",
      };

      const path = PATH[operate.value.type];

      post(path, {
        tbName: form.value.tableName,
        parameter: operate.value.parameterList,
        keyParameter: operate.value.keyParameterList,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: "success",
              message: res.message,
              offset: 65,
              showClose: true,
            });
            output.value = res.info;
          } else {
            throw new Error(res.message);
          }
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err,
            offset: 65,
            showClose: true,
          });
        });
    }

    function handleCopy(e: any) {
      if (!output.value) return;
      e.target.select();
      document.execCommand("Copy");
      ElMessage({
        message: "成功复制到剪贴板",
        type: "success",
        offset: 65,
        showClose: true,
      });
    }

    return {
      code,
      form,
      operate,
      paraList,
      output,

      handleCopy,
      parseCode,
      generateCode,
    };
  },
});
</script>

<style scoped lang="less">
.java-mybatis {
  height: calc(100% - 20px);
  padding: 15px;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.el-textarea,
::v-deep(.el-textarea__inner) {
  height: 100%;
}

.el-form {
  ::v-deep(.el-form-item__content) {
    text-align: left;
  }

  ::v-deep(.el-input__inner) {
    text-align: center;
    font-weight: bold;
    font-family: monospace, Courier;
  }
}

.el-button {
  font-size: initial;
}

.el-select {
  width: 100%;
}
</style>
