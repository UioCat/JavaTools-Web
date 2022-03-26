<template>
  <el-row class="create-sql">
    <el-col class="sql-left" :span="8">
      <el-input
        class="sql-raw"
        v-model="code"
        placeholder="代码"
        type="textarea"
        spellcheck="false"
        resize="none"
        autofocus
        :rows="5"
        @change="onParseCode($event)"
      />

      <el-form :model="form" label-position="left">
        <el-form-item label="表名">
          <el-input v-model="form.tableName" placeholder="输入表名" />
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="form.className" placeholder="输入类名" />
        </el-form-item>
        <el-form-item label="包名">
          <el-input v-model="form.packageName" placeholder="输入包名" />
        </el-form-item>
        <el-form-item label="主键">
          <el-input v-model="form.primaryKey" placeholder="输入主键" />
        </el-form-item>
      </el-form>
    </el-col>

    <el-col class="sql-right" :span="15" :push="1">
      <el-table
        ref="refSqlTable"
        class="sql-table"
        stripe
        table-layout="auto"
        tooltip-effect="dark"
        :data="paraList"
        @selection-change="onSelectionChange"
      >
        <template #empty>
          <div class="sql-table__empty">无解析数据</div>
        </template>

        <el-table-column header-align="center" type="selection" width="40" />
        <el-table-column align="center" property="type" label="类型" width="80" />
        <el-table-column
          align="center"
          property="datatype"
          label="类型（MySQL）"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          property="field"
          label="字段名"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          property="fieldInSql"
          label="字段名（MySQL）"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          property="comment"
          label="注解"
          width="90"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          v-if="showDefault"
          property="defaultValue"
          label="默认值"
          width="100"
          show-overflow-tooltip
        />
      </el-table>

      <div class="sql-operate">
        <el-select v-model="selectdUniqueKey" placeholder="唯一键" clearable multiple>
          <el-option
            v-for="(item, index) in uniqueKeyOption"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="primary" @click="clearSelection()">清空选择</el-button>
        <el-button type="primary" @click="onGenerateCode()">提交</el-button>
      </div>

      <el-input
        class="sql-code"
        v-model="output"
        placeholder="生成代码"
        type="textarea"
        spellcheck="false"
        resize="none"
        @focus="handleCopy($event)"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import type { ElTable } from "element-plus";
import { defineComponent, ref, computed } from "vue";

import { post } from "@/services/network";

export default defineComponent({
  name: "create-table",
  setup() {
    const refSqlTable = ref<InstanceType<typeof ElTable>>();
    const code = ref("");
    const form = ref<Omit<IParsedCreateTableResponse, "parameters">>({
      tableName: "",
      className: "",
      packageName: "",
      primaryKey: "",
    });

    const paraList = ref<IParsedCreateTableResponseParameter[]>([]);

    function onParseCode(code: string) {
      post("/tools/analysisText", { data: code, analysisType: "SYNTAX_JAVA" })
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
        .then((res: IParsedCreateTableResponse) => {
          const { parameters, ...rest } = res;
          form.value = rest;
          paraList.value = parameters;
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
    const selectdUniqueKey = ref<string[]>([]);
    const selectedParaList = ref<IParsedCreateTableResponseParameter[]>([]);
    function onSelectionChange(parameters: IParsedCreateTableResponseParameter[]) {
      selectedParaList.value = parameters;
    }

    function onGenerateCode() {
      post("/tools/createSQL", {
        ...form.value,
        parameterList: selectedParaList.value.map((para) => ({
          ...para,
          uniqueKey: selectdUniqueKey.value.includes(para.field),
        })),
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
      refSqlTable,

      paraList,
      output,
      showDefault: computed(
        () => !paraList.value.every((para) => para.defaultValue === null)
      ),

      handleCopy,
      selectdUniqueKey,
      uniqueKeyOption: computed(() => paraList.value.map((para) => para.field)),
      clearSelection: () => {
        refSqlTable.value?.clearSelection();
      },
      onParseCode,
      onGenerateCode,
      onSelectionChange,
    };
  },
});
</script>

<style scoped lang="less">
.create-sql {
  height: calc(100% - 20px);
  margin: 0 10px;
  padding: 15px;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.sql-left {
  display: flex;
  flex-direction: column;

  .sql-raw {
    height: 80%;
    padding-bottom: 20px;

    .el-textarea,
    ::v-deep(.el-textarea__inner) {
      height: 100%;
    }
  }
}

.sql-right {
  display: flex;
  flex-direction: column;
  height: 100%;

  .sql-table {
    width: 100%;
    height: 80%;

    &__empty {
      font-weight: 500;
      text-align: center;
      height: 80%;
      width: 100%;
    }

    ::v-deep(.el-table) {
      &__inner-wrapper {
        height: 100%;
      }

      &__body-wrapper {
        height: 100%;
        overflow-y: auto;
      }
    }
  }

  .sql-operate {
    height: 5%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ::v-deep(.el-select) {
      width: 60%;

      .el-select-tags-wrapper {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .el-input {
        font-family: monospace, Courier;
      }
    }
  }

  .sql-code {
    height: 15%;
    padding-bottom: 15px;

    ::v-deep(.el-textarea__inner) {
      height: 100%;
    }
  }
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
</style>
