<template>
  <el-row :gutter="10">
    <el-col :sm="12" :xs="24">
      <!-- 创建账单 -->
      <el-card shadow="hover" style="height: 100%">
        <template #header>
          <div class="card-header">
            创建账单记录&nbsp;&nbsp;&nbsp;
            <el-select v-model="choseBookKeepingType" class="m-2"
                       placeholder="选择记录账单类型" size="large"
                       @change="changeBookKeepingTypeValue">
              <el-option v-for="item in bookKeepingTypeList" :key="item.value"
                         :label="item.label"
                         :value="item.value"/>
            </el-select>
          </div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="createBill"
                 :hide-required-asterisk="true" :label-width="70"
                 status-icon>
          <template v-if="choseBookKeepingType === 'onceBill'">
            <el-form-item label="日期" prop="createDate">
              <el-date-picker v-model="createDate" type="date"
                              placeholder="请选择日期" :clearable="false">
              </el-date-picker>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="每月日期" prop="generateDay">
              <el-input-number v-model="generateDay" placeholder="请输入持续月份"
                               controls-position="right" :min="1" :max="28"
                               style="width: 100%"/>
            </el-form-item>
            <el-form-item label="持续月份" prop="generateCount">
              <el-input-number v-model="generateCount" placeholder="请输入持续月份"
                               controls-position="right" :min="1"
                               style="width: 100%"/>
            </el-form-item>
          </template>
          <el-form-item label="金额" prop="createMoney">
            <el-input v-model="createMoney" placeholder="请输入金额"
                      @input="getConsumeType"
                      @keyup.enter="submitForm(formRef, choseBookKeepingType === 'onceBill' ? addBill : addPeriodBill)"
                      ref="moneyRef" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="用途" prop="createPurpose">
            <el-input v-model="createPurpose" placeholder="请输入用途"
                      @input="getConsumeType"
                      @keyup.enter="submitForm(formRef, choseBookKeepingType === 'onceBill' ? addBill : addPeriodBill)"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="createCategory">
            <el-autocomplete v-model="createCategory" placeholder="请输入类别"
                             :fetch-suggestions="configTypeSearch"
                             :trigger-on-focus="false"
                             @keyup.enter="submitForm(formRef, choseBookKeepingType === 'onceBill' ? addBill : addPeriodBill)"
                             style="flex: 1">
            </el-autocomplete>
          </el-form-item>
          <el-form-item class="control">
            <el-button @click="nextDay(formRef)">Next Day</el-button>
            <el-button @click="resetForm(formRef)">清空</el-button>
            <el-button type="primary"
                       @click="submitForm(formRef, choseBookKeepingType === 'onceBill' ? addBill : addPeriodBill)"
                       :loading="billBtnLoading">提交
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
            <div class="config-menu-items" v-for="item in configList"
                 :key="item">
              <div>
                <span>类型：</span>
                <span style="margin-right: 20px">{{ item.category }}</span>
                <span>价格区间：</span>
                <span>{{ item.priceScope }}</span>
              </div>
              <el-popconfirm confirm-button-text="是" cancel-button-text="否"
                             title="是否删除此条配置?"
                             @confirm="delBillConfig(item.configId)">
                <template #reference>
                  <el-icon>
                    <circle-close-filled/>
                  </el-icon>
                </template>
              </el-popconfirm>
            </div>
          </div>
          <el-form ref="configFormRef" :rules="configRules" :model="addConfig"
                   :hide-required-asterisk="true"
                   status-icon>
            <el-form-item label="类别名称" prop="configName">
              <el-input v-model="configName"
                        @keyup.enter="submitForm(configFormRef, addBillConfig)"></el-input>
            </el-form-item>
            <el-form-item label="价格区间" prop="minPriceRange">
              <div style="display: flex; flex: 1">
                <el-input v-model="minPriceRange"
                          @keyup.enter="submitForm(configFormRef, addBillConfig)"
                          style="flex: 1"></el-input>
                <div style="margin: 0 10px">-</div>
                <el-form-item prop="maxPriceRange" style="flex: 1">
                  <el-input v-model="maxPriceRange"
                            @keyup.enter="submitForm(configFormRef, addBillConfig)"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item class="control">
              <el-button @click="resetForm(configFormRef)">清空</el-button>
              <el-button type="primary"
                         @click="submitForm(configFormRef, addBillConfig)"
                         :loading="configBtnLoading">提交
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>

    <el-col :sm="12" :xs="24">
      <!-- 表格 -->
      <el-card shadow="hover" style="height: 650px">
        <el-tabs v-model="tableTypeTab">
          <el-tab-pane label="普通账单" name="onceBill">
            <el-table :data="table" style="width: 100%"
                      @sort-change='tableSortChange'
                      max-height="500" @filter-change="filterChange"
                      ref="tableRef" v-loading="tableLoading"
                      empty-text="暂无数据">
              <el-table-column label="日期" prop="produceTime"></el-table-column>
              <el-table-column label="金额" prop="amount"
                               sortable='custom'></el-table-column>
              <el-table-column label="用途" prop="desc"></el-table-column>
              <el-table-column label="类别" prop="category"
                               column-key="filterConsumeType"
                               :filter-multiple="false"
                               :filters="filterConsumeTypeArr">
              </el-table-column>
              <el-table-column label="操作" prop="largeItem" width="150">
                <template #default="scope">
                  <el-button size="small" @click="handleDelete(scope.row)">
                    删除
                  </el-button>
                  <!--                  <el-button size="small" @click="setLargeItem(scope.row)">-->
                  <!--                    {{ scope.row.largeItem === true ? '非大件' : '大件' }}-->
                  <!--                  </el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="周期账单" name="periodBill">
            <el-table :data="periodBillTable" :height="420"
                      v-loading="tableLoading">
              <el-table-column label="每月日期" prop="generateDay"/>
              <el-table-column label="持续月份" prop="generateCount"/>
              <el-table-column label="金额" prop="amount"/>
              <el-table-column label="用途" prop="description"/>
              <el-table-column label="类别" prop="category"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-pagination small layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="pageChange"></el-pagination>
      </el-card>
    </el-col>

    <el-col :sm="12" :xs="24">
      <!-- 统计图 -->
      <el-card shadow="hover">
        <el-date-picker v-if="!showPeriodItemStatistics"
                        v-model="statisticsDate" type="daterange"
                        placeholder="请选择月份"
                        start-placeholder="开始时间" end-placeholder="结束时间"
                        style="width: 300px" :clearable="false"
                        :shortcuts="shortcuts"
                        @change="changeStatisticsDate">
        </el-date-picker>
        <el-switch class="showLargeItemStatistics-switch"
                   v-model="showPeriodItemStatistics" inactive-text="查看周期账单统计"
                   @change="showPeriodItemStatisticsEvent"/>

        <router-view v-if="showRouter">
          <line-chart ref="chartRef" :chartDataX="chartDataX"
                      :chartDataY="chartDataY"
                      @selectChartType="selectChartType" @remove="handleRemove"
                      @reload="() => getStatistics()"></line-chart>
        </router-view>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from "vue";
import type {ElForm} from "element-plus";
import {ElMessage} from "element-plus";
import {CircleCloseFilled} from '@element-plus/icons-vue';
import {debounce} from "@/utils/index";
import {
  AddBill,
  getBillList,
  getConsumptionType,
  AddBillConfig,
  getBillConfigList,
  deleteBillConfig,
  GetStatistics,
  UpdateBill,
  getAllConsumptionType,
  AddPeriodBill,
  queryPeriodBillList
} from "@/services/consume";
import lineChart from "./line-chart.vue";
import {formatTime} from "@/utils/time";
import dayjs from 'dayjs'

interface OptionType {
  category: string;
}

export default defineComponent({
  name: "consume",

  components: {
    lineChart,
    CircleCloseFilled,
  },

  setup() {
    // 获取添加账单表单dom
    const formRef = ref<InstanceType<typeof ElForm>>();
    const configFormRef = ref<InstanceType<typeof ElForm>>();
    const moneyRef = ref();
    const tableRef = ref();
    const chartRef = ref()

    // 记账类型
    const bookKeepingType = reactive({
      bookKeepingTypeList: [
        {
          label: "普通账单",
          value: "onceBill"
        },
        {
          label: "周期账单",
          value: "periodBill"
        }
      ],
      // 默认记录单条账单
      choseBookKeepingType: "onceBill",
      bookKeepingTypeOnLoading: true
    })

    // 表单相关数据
    const createBill = reactive({
      // 普通账单日期
      createDate: "",
      // 周期账单日期
      generateDay: 1,
      // 周期账单持续时间
      generateCount: 1,
      createMoney: "",
      createPurpose: "",
      createCategory: "",
      fuzzySearchOption: [],
      billBtnLoading: false,
    });

    const createPeriodBill = reactive({
      generateDay: "",
      generateCount: "",
      createMoney: "",
      createPurpose: "",
      createCategory: "",
      fuzzySearchOption: [],
      billBtnLoading: false,
    })

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
      tableTypeTab: 'onceBill',
      periodBillTable: [],
      table: [],
      tableLoading: false,
      filterConsumeTypeArr: [],
      selectConsumeType: '',
      filterQueryList: false, // 是否根据右侧数据来过滤左侧列表,点击柱状图后为true
      startTime: dayjs().startOf('M').format('YYYY-MM-DD'),
      endTime: dayjs().endOf('M').format('YYYY-MM-DD'),
      orderBy: '',
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
      statisticsDate: [dayjs().startOf('M'), dayjs().endOf('M')],
      showRouter: true,
      showPeriodItemStatistics: false,
    });

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
      generateDay: [
        {
          required: true,
          message: '请输入日期',
        }
      ],
      generateCount: [
        {
          required: true,
          message: '请输入持续月份',
        }
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

    const changeBookKeepingTypeValue = (value: string) => {
      formRef.value?.resetFields()
    }

    //  格式化日期
    const formatDate = (date: Date | any) => {
      return dayjs(date).format('YYYY-MM-DD')
    }

    // 日期快速选择
    const shortcuts = [
      {
        text: '当月',
        value: [dayjs().startOf('M'), dayjs().endOf('M')],
      },
      {
        text: '近两个月',
        value: [dayjs().startOf('M').subtract(1, 'M'), dayjs().endOf('M')],
      },
      {
        text: '近3月',
        value: [dayjs().startOf('M').subtract(2, 'M'), dayjs().endOf('M')],
      },
      {
        text: '近半年',
        value: [dayjs().startOf('M').subtract(5, 'M'), dayjs().endOf('M')],
      },
      {
        text: '今年',
        value: [dayjs().startOf('y'), dayjs().endOf('y')],
      }
    ]


    /**
     * 下一天
     * @param formEl
     */
    const nextDay = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (createBill.createDate !== '') {
        let chooseDate = new Date(createBill.createDate)
        let nextDay = +chooseDate + 24 * 60 * 60 * 1000
        let newDate = new Date(nextDay)
        createBill.createDate = formatTime(newDate);
      }
    };


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
        let startTime = "";
        let endTime = "";
        if (tableData.filterQueryList) {
          startTime = tableData.startTime;
          endTime = tableData.endTime;
        }
        tableData.tableLoading = true;
        const res: any = await getBillList({
          pageNum: pagination.page,
          pageSize: pagination.pageSize,
          type: "CONSUME",
          category: tableData.selectConsumeType,
          startTime,
          endTime,
          largeItem: chartDataInfo.showPeriodItemStatistics ?
            chartDataInfo.showPeriodItemStatistics : null,
          orderBy: tableData.orderBy
        });
        const {code, info} = res.data;
        if (code === 200) {
          pagination.total = info.total;
          tableData.table = info.list;
          tableData.tableLoading = false;
        }
      } catch (error) {
        tableData.tableLoading = false;
      }
    };

    const handleRemove = (params: any) => {
      if (params.dataIndex === 0) {
        return
      }
      chartDataInfo.chartDataX.splice(params.dataIndex, 1)
      chartDataInfo.chartDataY[0] = (Math.ceil(chartDataInfo.chartDataY[0] * 100) - Math.ceil(chartDataInfo.chartDataY[params.dataIndex] * 100)) / 100
      chartDataInfo.chartDataY.splice(params.dataIndex, 1)
      chartRef.value.drawChart()
    }

    /**
     * 删除表格的一条数据
     */
    const handleDelete = async (row: any) => {
      const {billId, largeItem, billType} = row;
      const updateBillUpdate = {
        billId: "",
        largeItem,
        deleted: false,
        billType,
      };
      updateBillUpdate.billId = billId;
      updateBillUpdate.deleted = true;
      const res: any = await UpdateBill(updateBillUpdate);
      const {code} = res.data;
      if (code === 200) {
        getTableList();
        getStatistics();
      }
    };

    // /**
    //  * 设置账单为大件类型
    //  */
    // const setLargeItem = async (row: any) => {
    //   const { billId, largeItem, deleted, billType } = row;
    //   const updateBillUpdate = {
    //     billId,
    //     largeItem,
    //     deleted,
    //     billType,
    //   };
    //   updateBillUpdate.largeItem = !largeItem;
    //   const res: any = await UpdateBill(updateBillUpdate);
    //   const { code } = res.data;
    //   if (code === 200) {
    //     getTableList();
    //     getStatistics();
    //   }
    // }

    /**
     * 获取所有类别
     */
    const getAllConsumption = async () => {
      const res = await getAllConsumptionType();
      const {code, info} = res.data;
      if (code === 200) {
        tableData.filterConsumeTypeArr = info.map((item: string) => ({
          text: item, value: item
        }))
      }
    }

    /**
     * 创建账单
     */
    const addBill = async () => {
      createBill.billBtnLoading = true;
      const res: any = await AddBill({
        productTime: formatTime(new Date(createBill.createDate)),
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
        getStatistics();
        ElMessage({
          type: "success",
          message: "创建成功",
        });
      }
    };

    /**
     * 创建周期账单
     */
    const addPeriodBill = async () => {
      const res: any = await AddPeriodBill({
        generateDay: createBill.generateDay,
        generateCount: createBill.generateCount,
        // 先默认写死支持，后续支持收入记录
        billType: "CONSUME",
        // 暂不做途径，后续等待前端扩展
        produceWayType: "ALI_PAY",
        amount: createBill.createMoney,
        desc: createBill.createPurpose,
        type: createBill.createCategory
      });
      if (res.data.code === 200) {
        formRef.value?.resetFields()
        getTableList().then(() => {
          createPeriodBill.billBtnLoading = false;
        });
        getStatistics();
        ElMessage({
          type: "success",
          message: "创建成功",
        });
      }
    }

    /**
     * 获取账单配置数据列表
     */
    const getConfigList = async () => {
      const res: any = await getBillConfigList();
      const {code, info} = res.data;
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
    const submitForm = async (
      formEl: InstanceType<typeof ElForm> | undefined,
      cb: CallableFunction
    ) => {
      // eslint-disable-next-line no-useless-return
      try {
        if (!formEl) return;
        formEl.validate(async (valid) => {
          if (valid) {
            await cb();
            if (cb === addBill) {
              moneyRef.value.focus();
            }
            if (cb === addPeriodBill) {
              queryPeriodBillListRequest()
            }
          }
        });
      } catch (error) {
        console.log(error);

      }
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
      const {code, info} = res.data;
      if (code === 200) {
        if (info) {
          createBill.createCategory = info[0];
          createBill.fuzzySearchOption = info.map((item: string) => ({
            value: item
          }))
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
      const {code} = res.data;
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
      const {code} = res.data;
      if (code === 200) {
        getConfigList();
      }
    };

    /**
     * 获取账单统计数据
     */
    const getStatistics = async () => {
      const res: any = await GetStatistics({
        startDate: tableData.startTime,
        endDate: tableData.endTime,
        largeItem: false,
        periodBill: chartDataInfo.showPeriodItemStatistics
      });
      const {code, info} = res.data;
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
          const {category, amount} = item;
          chartDataInfo.chartDataX.push(category);
          chartDataInfo.chartDataY.push(amount);
        });
        chartRef.value.drawChart()
      }
    };

    /**
     * 修改统计图的月份选项后 触发事件
     */
    const changeStatisticsDate = async ([startDate, endDate]: any[]) => {
      //本月的开始时间
      tableData.startTime = formatDate(startDate)
      //本月的结束时间
      tableData.endTime = formatDate(endDate)
      await getStatistics();
    };

    /**
     * 表格过滤
     */
    const filterChange = (item: any) => {
      tableData.selectConsumeType = item.filterConsumeType[0];
      if (!item.filterConsumeType[0]) {
        tableData.selectConsumeType = '';
        tableData.startTime = '';
        tableData.endTime = '';
      }
      getTableList();
    }

    /**
     * 大件统计数据查看开关
     */
    const showPeriodItemStatisticsEvent = async () => {
      // chartDataInfo.showPeriodItemStatistics = !chartDataInfo.showPeriodItemStatistics;
      await getStatistics();
    }

    /**
     * 柱形图点击事件
     */
    const selectChartType = (selectChartType: string) => {
      tableData.tableTypeTab = 'onceBill';
      tableData.filterQueryList = true;
      if (chartDataInfo.showPeriodItemStatistics) {
        tableData.selectConsumeType = '';
        // tableData.startTime = '';
        // tableData.endTime = '';
      } else {
        // 本月的开始时间
        tableData.startTime = formatDate(chartDataInfo.statisticsDate[0])
        // 本月的结束时间
        tableData.endTime = formatDate(chartDataInfo.statisticsDate[1])

        tableRef.value!.clearFilter();
        if (selectChartType === '总金额') {
          tableData.selectConsumeType = '';
        } else {
          tableData.selectConsumeType = selectChartType;
        }
      }
      getTableList();
    }

    const tableSortChange = ({column, prop, order}) => {
      console.log("tableSortChange touched, " + order);
      console.log("tableSortChange touched, " + prop);
      if (prop === 'amount') {
        if (order === 'ascending') {
          tableData.orderBy = 'amount ASC'
        } else if (order === 'descending') {
          tableData.orderBy = 'amount DESC'
        } else {
          console.log("CANCEL")
          tableData.orderBy = ''
        }
      } else {
        tableData.orderBy = ''
      }
      getTableList();
    }

    /**
     * 获取周期账单列表
     */
    const queryPeriodBillListRequest = async () => {
      try {
        tableData.tableLoading = true
        const res: any = await queryPeriodBillList();
        // tableData.tableLoading = false
        if (res.data.code === 200) {
          tableData.periodBillTable = res.data.info
        }
      } catch (error) {
        console.log(error);
      }
    }

    // 页面初始化获取数据
    onMounted(() => {
      getTableList();
      getConfigList();
      getStatistics();
      getAllConsumption();
      queryPeriodBillListRequest()
    });

    return {
      shortcuts,
      moneyRef,
      tableRef,
      chartRef,
      ...toRefs(createBill),
      ...toRefs(tableData),
      ...toRefs(pagination),
      ...toRefs(addConfig),
      ...toRefs(configData),
      ...toRefs(chartDataInfo),
      ...toRefs(bookKeepingType),
      createBill,
      createPeriodBill,
      addConfig,
      formRef,
      configFormRef,
      rules,
      configRules,
      resetForm,
      nextDay,
      submitForm,
      pageChange,
      getConsumeType,
      addBill,
      addPeriodBill,
      addBillConfig,
      configTypeSearch,
      delBillConfig,
      changeStatisticsDate,
      handleDelete,
      getAllConsumption,
      filterChange,
      selectChartType,
      showPeriodItemStatisticsEvent,
      changeBookKeepingTypeValue,
      handleRemove,
      getStatistics,
      tableSortChange,
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

.showLargeItemStatistics-switch {
  margin-left: 20px;
}

@media only screen and (min-width: 768px) {
  .el-col {
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
