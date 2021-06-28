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
          <el-form :model="item">
            <el-form-item>
              <el-input v-model="item.tableName" placeholder="表名" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="item.className" placeholder="类名" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="item.packageName" placeholder="包名" />
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="1">
          <el-divider direction="vertical" />
        </el-col>

        <el-col :span="12">
          <el-tabs
            closable
            editable
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
              {{ op.type }}
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
  <el-button type="primary" size="mini">提 交</el-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

enum ESQLType {
  DELETE = "DELETE",
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  SELECT = "SELECT",
}

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
            type: ESQLType.INSERT,
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
            type: ESQLType.INSERT,
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
        type: ESQLType.INSERT,
        title: "New Series " + newTabName,
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
      activeTabName,
      seriesList,

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

  ::v-deep(.el-tabs__content) {
    margin: 0 30px;
    height: calc(100% - 40px - 30px);
  }
}

.el-tab-pane,
.el-textarea,
.el-row,
::v-deep(.el-textarea__inner) {
  height: 100%;
}

.el-divider {
  height: 100%;
}

.el-button {
  font-size: initial;
}
</style>
