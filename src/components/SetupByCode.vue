<template>
  <el-tabs
    closable
    editable
    type="border-card"
    class="java-series"
    v-model="activeTabName"
    @tab-add="addSeriesTab()"
    @tab-remove="removeSeriesTab($event)"
  >
    <el-tab-pane
      v-for="(item, idx) in seriesList"
      :key="idx"
      :name="item.key"
      :label="item.title"
    >
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            v-model="item.code"
            placeholder="Java 代码"
            type="textarea"
            spellcheck="false"
            resize="none"
            :rows="10"
            @change="parseCode(idx, $event)"
          />
        </el-col>

        <el-col :span="5">
          <el-form :model="item" label-position="top">
            <el-form-item label="表名">
              <el-input v-model="item.tableName" placeholder="输入表名" />
            </el-form-item>
            <el-form-item label="类名">
              <el-input v-model="item.className" placeholder="输入类名" />
            </el-form-item>
            <el-form-item label="包名">
              <el-input v-model="item.packageName" placeholder="输入包名" />
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="1">
          <el-divider direction="vertical" />
        </el-col>

        <el-col :span="10" class="java-operate">
          <el-tabs
            closable
            tab-position="left"
            v-model="item.active"
            @tab-add="addOperateTab(idx)"
            @tab-remove="removeOperateTab(idx, $event)"
          >
            <el-tab-pane
              v-for="(op, i) in item.operateList"
              :key="op.key"
              :name="op.key"
              :label="op.title"
            >
              <el-form label-position="right" label-width="100px" :model="op">
                <el-form-item label="操作">
                  <el-select
                    v-model="op.type"
                    placeholder="选择操作"
                    @change="updateTabTitle(idx, i)"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="字段">
                  <el-select
                    v-model="op.parameterList"
                    multiple
                    placeholder="选择字段"
                    @change="updateTabTitle(idx, i)"
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
                    v-model="op.keyParameterList"
                    multiple
                    placeholder="选择关键字段"
                    :disabled="op.type === 'INSERT'"
                    @change="updateTabTitle(idx, i)"
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
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="addOperateTab(idx)"
                  >
                    下一项
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
  <el-button size="mini" type="primary" icon="el-icon-check">提 交</el-button>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";

import { get, post } from "@/services/request";

export default defineComponent({
  name: "setup-by-java",
  props: {
    parsePath: { type: String, required: true },
    genPath: { type: String, required: true },
  },
  setup(props) {
    const seriesCnt = ref(0);
    const seriesList = ref<ISeriesTab[]>([
      {
        key: "0",
        title: "Example",
        code: "",
        active: "0",
        counter: 0,
        tableName: "",
        className: "",
        fieldList: [],
        packageName: "",
        operateList: [
          {
            key: "0",
            title: "INSERT field",
            type: "INSERT",
            parameterList: [],
            keyParameterList: [],
          },
        ],
      },
    ]);

    const activeTabName = ref("0");

    function updateTabTitle(sIdx: number, tIdx: number) {
      seriesList.value[sIdx].operateList[tIdx].title =
        seriesList.value[sIdx].operateList[tIdx].type +
          " " +
          seriesList.value[sIdx].operateList[tIdx].parameterList[0] || "";
    }

    function addSeriesTab() {
      let newTabName = ++seriesCnt.value + "";

      seriesList.value.push({
        key: newTabName,
        code: "",
        title: "New Series " + newTabName,
        active: "0",
        counter: 0,
        tableName: "",
        className: "",
        fieldList: [],
        packageName: "",
        operateList: [
          {
            key: "0",
            title: "INSERT field",
            type: "INSERT",
            parameterList: [],
            keyParameterList: [],
          },
        ],
      });

      activeTabName.value = newTabName;
    }

    function removeSeriesTab(tname: string) {
      let tabs = seriesList.value;
      let activeName = activeTabName.value;

      if (tabs.length === 1) return;

      if (activeName === tname) {
        tabs.forEach((tab, index) => {
          if (tab.key === tname) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) activeName = nextTab.key;
          }
        });
      }

      activeTabName.value = activeName;
      seriesList.value = tabs.filter((tab) => tab.key !== tname);
    }

    function addOperateTab(idx: number) {
      let newTabName = ++seriesList.value[idx].counter + "";

      seriesList.value[idx].active = newTabName;
      seriesList.value[idx].operateList.push({
        key: newTabName,
        type: "INSERT",
        title: "INSERT " + newTabName,
        parameterList: [],
        keyParameterList: [],
      });
    }

    function removeOperateTab(idx: number, tname: string) {
      const list = seriesList.value[idx].operateList;
      if (list.length === 1) return;

      for (let i = 0; i < list.length; i++) {
        if (list[i].key === tname) {
          let nextTab = list[i + 1] || list[i - 1];
          if (nextTab) seriesList.value[idx].active = nextTab.key;
          list.splice(i, 1);
          break;
        }
      }
    }

    const paraList = ref<string[]>([]);

    function parseCode(idx: number, code: string) {
      // post(props.parsePath, { data: code })
      get("/mock/parseJava.json")
        .then((res) => res.json())
        .then((res) => {
          if (res.code === "200") {
            ElMessage.success({
              type: "success",
              message: res.message,
              offset: 65,
            });
            return res.info;
          } else {
            throw new Error(res.message);
          }
        })
        .then((res: IParseJavaResponse) => {
          seriesList.value[idx].tableName = res.tableName;
          seriesList.value[idx].className = res.className;
          seriesList.value[idx].packageName = res.packageName;
          seriesList.value[idx].fieldList = res.fieldList;
          paraList.value = res.fieldList;
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err,
            offset: 65,
          });
        });
    }

    return {
      seriesList,
      activeTabName,

      paraList,
      typeList: ["INSERT", "DELETE", "UPDATE", "SELECT"],

      addSeriesTab,
      removeSeriesTab,

      updateTabTitle,
      addOperateTab,
      removeOperateTab,

      parseCode,
    };
  },
});
</script>

<style scoped lang="less">
.java-series {
  height: calc(100% - 6px - 20px - 40px);
  position: relative;
  margin: 10px;

  & > ::v-deep(.el-tabs__header) {
    background-color: aliceblue;
  }

  & > ::v-deep(.el-tabs__content) {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .java-operate {
    height: 100%;
    position: relative;

    .el-tabs {
      height: 100%;
    }

    ::v-deep(.el-tabs__header) {
      width: 14em;
    }

    ::v-deep(.el-tabs__nav-wrap) > span {
      left: 0;
      right: 0;
    }
  }

  ::v-deep(.el-tabs__item) {
    user-select: none;
  }
}

.el-tab-pane,
.el-textarea,
.el-row,
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

.el-divider {
  height: 100%;
}

.el-button {
  font-size: initial;
}
</style>
