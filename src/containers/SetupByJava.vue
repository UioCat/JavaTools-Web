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
        <el-col :span="6">
          <el-input
            v-model="item.code"
            placeholder="Java 代码"
            type="textarea"
            :rows="10"
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

        <el-col :span="12" class="java-operate">
          <el-tabs
            closable
            tab-position="left"
            v-model="item.active"
            @tab-add="addOperateTab(idx)"
            @tab-remove="removeOperateTab(idx, $event)"
          >
            <el-tab-pane
              v-for="op in item.operateList"
              :key="op.key"
              :name="op.key"
              :label="op.title"
            >
              <el-form label-position="right" label-width="100px" :model="op">
                <el-form-item label="操作">
                  <el-select v-model="op.type" placeholder="选择操作">
                    <el-option
                      v-for="item in typeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="字段">
                  <el-select v-model="op.parameterList" multiple placeholder="选择字段">
                    <el-option
                      v-for="item in paraList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关键字段">
                  <el-select
                    v-model="op.keyParameterList"
                    :disabled="op.type === 'INSERT'"
                    multiple
                    placeholder="选择关键字段"
                  >
                    <el-option
                      v-for="item in keyParaList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "setup-by-java",
  setup() {
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
            title: "Operate",
            type: "INSERT",
            parameterList: [],
            keyParameterList: [],
          },
        ],
      },
    ]);

    const activeTabName = ref("0");

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
            title: "Operate",
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
      for (let i = 0; i < list.length; i++) {
        if (list[i].key === tname) {
          list.splice(i, 1);
          break;
        }
      }
    }

    return {
      seriesList,
      activeTabName,

      typeList: ["INSERT", "DELETE", "UPDATE", "SELECT"],
      paraList: [],
      keyParaList: [],

      addSeriesTab,
      removeSeriesTab,

      addOperateTab,
      removeOperateTab,
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
    font-weight: bolder;
  }
}

.el-divider {
  height: 100%;
}

.el-button {
  font-size: initial;
}
</style>
