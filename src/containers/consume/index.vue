<template>
  <el-row :gutter="10">
    <el-col :sm="12" :xs="24">
      <!-- 创建账单 -->
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            创建账单记录<i class="iconfont icon-bill"></i>
          </div>
        </template>
        <el-form
          ref="formRef"
          :rules="rules"
          :model="createBill"
          :hide-required-asterisk="true"
          status-icon
        >
          <el-form-item label="日期" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="date"
              placeholder="请选择日期"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="金额" prop="createMoney">
            <el-input
              v-model="createMoney"
              placeholder="请输入金额"
              @input="getConsumeType"
              @keyup.enter="submitForm(formRef, addBill)"
              ref="moneyRef"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="用途" prop="createPurpose">
            <el-input
              v-model="createPurpose"
              placeholder="请输入用途"
              @input="getConsumeType"
              @keyup.enter="submitForm(formRef, addBill)"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="createCategory">
            <el-autocomplete
              v-model="createCategory"
              placeholder="请输入类别"
              :fetch-suggestions="configTypeSearch"
              :trigger-on-focus="false"
              @keyup.enter="submitForm(formRef, addBill)"
              style="flex: 1"
            >
            </el-autocomplete>
          </el-form-item>
          <el-form-item class="control">
            <el-button @click="resetForm(formRef)">清空</el-button>
            <el-button
              type="primary"
              @click="submitForm(formRef, addBill)"
              :loading="billBtnLoading"
              >提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>

    <el-col :sm="12" :xs="24">
      <!-- 配置 -->
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            配置<i class="iconfont icon-jieguobiao"></i>
          </div>
        </template>
        <div class="config-wrapper">
          <div class="config-menu">
            <div
              class="config-menu-items"
              v-for="item in configList"
              :key="item"
            >
              <div>
                <span>类型：</span>
                <span style="margin-right: 20px">{{ item.category }}</span>
                <span>价格区间：</span>
                <span>{{ item.priceScope }}</span>
              </div>
              <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                title="是否删除此条配置?"
                @confirm="delBillConfig(item.configId)"
              >
                <template #reference>
                  <el-icon><circle-close-filled /></el-icon>
                </template>
              </el-popconfirm>
            </div>
          </div>
          <el-form
            ref="configFormRef"
            :rules="configRules"
            :model="addConfig"
            :hide-required-asterisk="true"
            status-icon
          >
            <el-form-item label="类别名称" prop="configName">
              <el-input
                v-model="configName"
                @keyup.enter="submitForm(configFormRef, addBillConfig)"
              ></el-input>
            </el-form-item>
            <el-form-item label="价格区间" prop="minPriceRange">
              <div style="display: flex; flex: 1">
                <el-input
                  v-model="minPriceRange"
                  @keyup.enter="submitForm(configFormRef, addBillConfig)"
                  style="flex: 1"
                ></el-input>
                <div style="margin: 0 10px">-</div>
                <el-form-item prop="maxPriceRange" style="flex: 1">
                  <el-input
                    v-model="maxPriceRange"
                    @keyup.enter="submitForm(configFormRef, addBillConfig)"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item class="control">
              <el-button @click="resetForm(configFormRef)">清空</el-button>
              <el-button
                type="primary"
                @click="submitForm(configFormRef, addBillConfig)"
                :loading="configBtnLoading"
                >提交
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>

    <el-col :sm="12" :xs="24">
      <!-- 表格 -->
      <el-card shadow="hover" style="height: 560px">
        <el-table
          :data="table"
          :height="440"
          v-loading="tableLoading"
          empty-text="暂无数据"
        >
          <el-table-column label="日期" prop="produceTime"></el-table-column>
          <el-table-column label="金额" prop="amount"></el-table-column>
          <el-table-column label="用途" prop="desc"></el-table-column>
          <el-table-column label="类别" prop="category"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="pageChange"
        ></el-pagination>
      </el-card>
    </el-col>

    <el-col :sm="12" :xs="24">
      <!-- 统计图 -->
      <el-card shadow="hover">
        <el-date-picker
          v-model="statisticsDate"
          type="month"
          @change="changeStatisticsDate"
          placeholder="请选择月份"
          :clearable="false"
        >
        </el-date-picker>
        <router-view v-if="showRouter">
          <line-chart
            :chartDataX="chartDataX"
            :chartDataY="chartDataY"
          ></line-chart>
        </router-view>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { debounce } from "@/utils/index";
import {
  AddBill,
  getBillList,
  getConsumptionType,
  AddBillConfig,
  getBillConfigList,
  deleteBillConfig,
  GetStatistics,
  UpdateBill,
} from "@/services/consume";
import lineChart from "./line-chart.vue";

interface OptionType {
  category: string;
}

export default defineComponent({
  name: "consume",

  components: {
    lineChart,
  },

  setup() {
    // 获取添加账单表单dom
    const formRef = ref<InstanceType<typeof ElForm>>();
    const configFormRef = ref<InstanceType<typeof ElForm>>();
    const moneyRef = ref();

    // 表单相关数据
    const createBill = reactive({
      createDate: "",
      createMoney: "",
      createPurpose: "",
      createCategory: "",
      fuzzySearchOption: [],
      billBtnLoading: false,
    });

    // 配置相关数据
    const addConfig = reactive({
      configName: "",
      minPriceRange: "",
      maxPriceRange: "",
      configBtnLoading: false,
    });
    const configData = reactive({
      configList: [],
      configListLoading: false,
    });

    // table相关数据
    const tableData = reactive({
      table: [],
      tableLoading: false,
    });
    // 分页器相关数据
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      total: 0,
    });
    // 统计图数据
    const chartDataInfo = reactive({
      chartDataX: ["", ""],
      chartDataY: [0, 0],
      statisticsDate: new Date(),
      showRouter: true,
    });
    // provide('chartDataInfo', chartDataInfo);
    // 自定义 金额 验证方式
    const moneyReg = (rule: any, value: string, callback: CallableFunction) => {
      if (!value) {
        callback(new Error("请输入金额"));
      }
      setTimeout(() => {
        if (!/^\d+[.]?\d{0,2}$/.test(value) && value) {
          callback(new Error("请输入正确的格式"));
        } else {
          callback();
        }
      }, 500);
    };

    // 自定义 配置表单 验证方法
    const priceRangeReg = (
      rule: any,
      value: string,
      callback: CallableFunction
    ) => {
      if (!value) {
        callback(new Error("请输入金额"));
      }
      setTimeout(() => {
        if (!/^\d+[.]?\d{0,3}$/.test(value) && value) {
          callback(new Error("请输入正确的格式"));
        } else if (
          addConfig.minPriceRange &&
          addConfig.maxPriceRange &&
          Number(addConfig.minPriceRange) > Number(addConfig.maxPriceRange)
        ) {
          callback(new Error("请输入正确的价格区间"));
        } else {
          callback();
        }
      }, 500);
    };

    // 添加账单 表单验证
    const rules = reactive({
      createDate: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
      ],
      createMoney: [
        {
          validator: moneyReg,
          trigger: "blur",
        },
      ],
      createCategory: [
        {
          required: true,
          message: "请输入类别",
          trigger: "blur",
        },
      ],
    });

    // 添加配置 表单验证
    const configRules = reactive({
      configName: [
        {
          required: true,
          message: "请输入配置名称",
          trigger: "blur",
        },
      ],
      minPriceRange: [
        {
          required: true,
          trigger: "blur",
          validator: priceRangeReg,
        },
      ],
      maxPriceRange: [
        {
          required: true,
          trigger: "blur",
          validator: priceRangeReg,
        },
      ],
    });

    /**
     * 清空表单
     */
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      // eslint-disable-next-line no-useless-return
      if (!formEl) return;
      formEl.resetFields();
    };

    /**
     * 获取表格数据
     */
    const getTableList = async () => {
      try {
        tableData.tableLoading = true;
        const res: any = await getBillList({
          pageNum: pagination.page,
          pageSize: pagination.pageSize,
          type: "CONSUME",
        });
        const { code, info } = res.data;
        if (code === 200) {
          pagination.total = info.total;
          tableData.table = info.list;
          tableData.tableLoading = false;
        }
      } catch (error) {
        tableData.tableLoading = false;
      }
    };

    /**
     * 删除表格的一条数据
     */
    const handleDelete = async (row: any) => {
      const { billId } = row;
      const updateBillUpdate = {
        billId: "",
        deleted: false,
      };
      updateBillUpdate.billId = billId;
      updateBillUpdate.deleted = true;
      const res: any = await UpdateBill(updateBillUpdate);
      const { code } = res.data;
      if (code === 200) {
        getTableList();
      }
    };

    /**
     * 创建账单
     */
    const addBill = async () => {
      createBill.billBtnLoading = true;
      const res: any = await AddBill({
        productTime: moment(createBill.createDate).format("YYYY-MM-DD"),
        billType: "CONSUME",
        amount: createBill.createMoney,
        desc: createBill.createPurpose,
        type: createBill.createCategory,
      });
      if (res.data.code === 200) {
        createBill.createMoney = "";
        createBill.createPurpose = "";
        createBill.createCategory = "";
        getTableList().then(() => {
          createBill.billBtnLoading = false;
        });
        ElMessage({
          type: "success",
          message: "创建成功",
        });
      }
    };

    /**
     * 获取账单配置数据列表
     */
    const getConfigList = async () => {
      const res: any = await getBillConfigList();
      const { code, info } = res.data;
      if (code === 200) {
        configData.configList = info;
        createBill.fuzzySearchOption = info.map((item: OptionType) => ({
          value: item.category,
        }));
      }
    };

    /**
     * 提交表单
     */
    const submitForm = (
      formEl: InstanceType<typeof ElForm> | undefined,
      cb: CallableFunction
    ) => {
      // eslint-disable-next-line no-useless-return
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          cb();
          if (cb === addBill) {
            moneyRef.value.focus();
          }
        }
      });
    };

    /**
     * 切换页码
     */
    const pageChange = (page: number) => {
      pagination.page = page;
      getTableList();
    };

    /**
     * 根据金额获取类型
     */
    const getConsumeType = debounce(async () => {
      if (
        !/^\d+[.]?\d{0,2}$/.test(createBill.createMoney) ||
        !createBill.createMoney
      ) {
        return;
      }
      const res: any = await getConsumptionType({
        amount: createBill.createMoney,
        desc: createBill.createPurpose,
      });
      const { code, info } = res.data;
      if (code === 200) {
        if (info) {
          createBill.createCategory = info;
        }
      }
    });

    /**
     * 添加配置
     */
    const addBillConfig = async () => {
      addConfig.configBtnLoading = true;
      const res: any = await AddBillConfig({
        category: addConfig.configName,
        priceScope: `${addConfig.minPriceRange}-${addConfig.maxPriceRange}`,
      });
      const { code } = res.data;
      if (code === 200) {
        getConfigList().then(() => {
          addConfig.configBtnLoading = false;
        });
        resetForm(configFormRef.value);
        ElMessage({
          type: "success",
          message: "创建成功",
        });
      }
    };

    /**
     * 模糊搜索 回调
     */
    const createFilter = (queryString: string) => (restaurant: any) =>
      restaurant.value?.toLowerCase().indexOf(queryString.toLowerCase()) === 0;

    /**
     * 模糊搜索
     */
    const configTypeSearch = (queryString: string, cb: CallableFunction) => {
      const results = queryString
        ? createBill.fuzzySearchOption.filter(createFilter(queryString))
        : createBill.fuzzySearchOption;
      cb(results);
    };

    /**
     * 删除配置
     */
    const delBillConfig = async (configId: string) => {
      const res: any = await deleteBillConfig({
        configId,
      });
      const { code } = res.data;
      if (code === 200) {
        getConfigList();
      }
    };

    /**
     * 获取账单统计数据
     */
    const getStatistics = async () => {
      // 取chartDataInfo.statisticsDate所在月份的第一天和最后一天
      const currentDate = new Date(chartDataInfo.statisticsDate.valueOf());
      const startDateTemp = new Date(chartDataInfo.statisticsDate.valueOf());
      const endDateTemp = new Date(chartDataInfo.statisticsDate.valueOf());
      startDateTemp.setDate(1);
      endDateTemp.setMonth(currentDate.getMonth() + 1);
      endDateTemp.setDate(1);
      endDateTemp.setTime(endDateTemp.getTime() - 1000 * 60 * 60 * 24);

      const res: any = await GetStatistics({
        startDate: startDateTemp.toLocaleDateString().replaceAll("/", "-"),
        endDate: endDateTemp.toLocaleDateString().replaceAll("/", "-"),
      });
      const { code, info } = res.data;
      if (code === 200) {
        // 清空数据
        chartDataInfo.chartDataX.length = 0;
        chartDataInfo.chartDataY.length = 0;
        if (info === null || info.length === 0) {
          // 后端返回为空时特殊case处理
          chartDataInfo.chartDataX.push("");
          chartDataInfo.chartDataY.push(0);
        }
        info.forEach((item: any) => {
          const { category, amount } = item;
          chartDataInfo.chartDataX.push(category);
          chartDataInfo.chartDataY.push(amount);
        });
      }
    };
    /**
     * 修改统计图的月份选项后 触发事件
     */
    const changeStatisticsDate = async () => {
      await getStatistics();
    };

    // 页面初始化获取数据
    onMounted(() => {
      getTableList();
      getConfigList();
      getStatistics();
    });

    return {
      moneyRef,
      ...toRefs(createBill),
      ...toRefs(tableData),
      ...toRefs(pagination),
      ...toRefs(addConfig),
      ...toRefs(configData),
      ...toRefs(chartDataInfo),
      createBill,
      addConfig,
      formRef,
      configFormRef,
      rules,
      configRules,
      resetForm,
      submitForm,
      pageChange,
      getConsumeType,
      addBill,
      addBillConfig,
      configTypeSearch,
      delBillConfig,
      changeStatisticsDate,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
@theme-color: #2d8cf0;

.card-header {
  display: flex;
  align-items: center;
  color: @theme-color;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 2px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  i {
    font-size: 20px;
  }
}

.el-form {
  .el-form-item:last-of-type {
    margin-bottom: 0;
  }
  :deep(.el-date-editor) {
    width: 100%;
  }
  .control {
    :deep(.el-form-item__content) {
      justify-content: flex-end;
    }
  }
}

.config-wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  height: 248px;

  .config-menu {
    min-height: 86px;
    box-sizing: border-box;
    border: 1px solid #ecf5ff;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: 20px;

    .config-menu-items {
      position: relative;
      font-size: 12px;
      border-radius: 4px;
      color: @theme-color;
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      padding: 4px;
      margin-bottom: 8px;
      cursor: pointer;
      div {
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      i {
        position: absolute;
        top: 5px;
        right: 4px;
        font-size: 14px;
        cursor: pointer;
        display: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &:hover i {
        display: block;
      }
    }
  }
}

.el-pagination {
  margin-top: 20px;
}

@media only screen and (min-width: 768px) {
  .el-col + .el-col {
    margin-bottom: 10px;
  }
  .el-col:nth-of-type(3),
  .el-col:nth-of-type(4) {
    margin-bottom: 0;
  }
}

@media only screen and (max-width: 768px) {
  .el-col + .el-col {
    margin-top: 10px;
  }
}
</style>