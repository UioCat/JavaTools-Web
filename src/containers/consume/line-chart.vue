<template>
  <div ref="lineChartRef" class="line-chart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  props: {
    chartDataX: {
      type: Array,
      default: () => [],
    },
    chartDataY: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const lineChartRef = ref<any>();
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          name: "类别",
          data: props.chartDataX,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "金额",
          nameTextStyle: {
            fontWeight: "bolder",
            fontSize: 16,
            padding: [0, 40, 20, 0],
          },
        },
      ],
      series: [
        {
          name: "金额",
          type: "bar",
          barWidth: "60%",
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#89BCFA" },
              { offset: 0.5, color: "#71AEF9" },
              { offset: 1, color: "#59A0F8" },
            ]),
            normal: {
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "black",
                  fontSize: 15,
                },
              },
            },
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: props.chartDataY,
        },
      ],
    };

    const drawChart = () => {
      const chart = echarts.init(lineChartRef.value);
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    };

    watch(
      () => option,
      () => {
        drawChart();
      },
      {
        deep: true,
      }
    );

    onMounted(() => {
      setTimeout(() => {
        drawChart();
      }, 500);
    });

    return {
      lineChartRef,
      drawChart,
    };
  },
});
</script>

<style lang="less" scoped>
.line-chart {
  height: 488px;
}
</style>
