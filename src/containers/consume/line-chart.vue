<template>
  <div ref="lineChartRef" class="line-chart"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onDeactivated, onActivated } from "vue";
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
  emits: ['selectChartType', 'remove', 'reload'],

  setup(props, { emit }) {

    const lineChartRef = ref<any>();
    let chart: any;
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
      toolbox: {
        show: true,
        feature: {
          myReload: {
            icon: 'path://M969.916221 501.771031c-11.116175 0-20.128433 9.012258-20.128433 20.128433 0 57.860802-11.328 113.980961-33.668821 166.799934-21.583574 51.027164-52.485375 96.860025-91.848894 136.222521-39.362496 39.36352-85.195358 70.26532-136.222521 91.848894-52.819996 22.340821-108.940155 33.668821-166.800957 33.668821s-113.979938-11.328-166.79891-33.668821c-51.027164-21.583574-96.859002-52.485375-136.221498-91.847871-39.362496-39.36352-70.264297-85.195358-91.846848-136.223544-22.340821-52.818973-33.667797-108.939131-33.667797-166.799934s11.328-113.980961 33.667797-166.799934c21.582551-51.027164 52.485375-96.859002 91.846848-136.221498 39.362496-39.362496 85.194334-70.264297 136.221498-91.846848 52.818973-22.340821 108.939131-33.667797 166.79891-33.667797 88.588641 0 174.554548 27.421536 246.359944 77.895091L662.939711 188.895161c-10.961656 1.847068-18.351973 12.231579-16.503882 23.193235 1.655709 9.830903 10.17678 16.787338 19.824511 16.787338 1.110287 0 2.237971-0.092098 3.368724-0.283456l151.254889-25.487487c10.961656-1.847068 18.351973-12.230556 16.503882-23.193235L813.903981 40.545438c-1.847068-10.961656-12.229532-18.349927-23.193235-16.503882-10.961656 1.847068-18.351973 12.230556-16.503882 23.193235l15.182794 90.107227C711.11185 82.737376 617.58985 53.105498 521.246595 53.105498c-63.277162 0-124.673487 12.397355-182.482101 36.848233-55.82647 23.612791-105.95824 57.411571-149.005662 100.457969-43.046399 43.046399-76.845179 93.179193-100.457969 149.004639C64.851007 397.224953 52.453652 458.621279 52.453652 521.898441c0 63.277162 12.397355 124.673487 36.848233 182.483124 23.612791 55.82647 57.411571 105.959264 100.457969 149.006685 43.046399 43.046399 93.179193 76.846202 149.005662 100.458993 57.808614 24.451902 119.203916 36.849256 182.482101 36.849256 63.278185 0 124.674511-12.397355 182.483124-36.849256 55.82647-23.612791 105.959264-57.411571 149.006685-100.458993 43.046399-43.047422 76.846202-93.181239 100.458993-149.006685 24.451902-57.808614 36.849256-119.204939 36.849256-182.483124C990.044654 510.782266 981.032396 501.771031 969.916221 501.771031z',
            onclick: function (){
              emit('reload')
            }
          }
        }
      },
      xAxis: [
        {
          type: "category",
          name: "类别",
          data: props.chartDataX,
          triggerEvent: true,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
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
          borderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#89BCFA" },
            { offset: 0.5, color: "#71AEF9" },
            { offset: 1, color: "#59A0F8" },
          ]),
          label: {
            show: true,
            position: "top",
            color: "black",
            fontSize: 15,
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

    const handleResize = () => {
      chart.resize();
    }

    const drawChart = () => {
      if ( chart != null && chart !== "" && chart != undefined ) {
        chart.dispose();
      }
      chart = echarts.init(lineChartRef.value);
      chart.setOption(option);
      chart.off('click');
      chart.on('click', (params: any) => {
        if (params.componentType === 'xAxis') {
          emit('remove', params)
        }
      })
      chart.getZr().on('click', (params: any) => {
        let pointInPixel = [params.offsetX, params.offsetY];
        if (chart.containPixel('grid', pointInPixel)) {
          let pointInGrid = chart.convertFromPixel({
              seriesIndex: 0
          }, pointInPixel);
          let xIndex = pointInGrid[0];
          let handleIndex = Number(xIndex);
          const op: any = chart.getOption();
          const selectChartType = op.xAxis[0].data[handleIndex];
          emit('selectChartType', selectChartType);
        };
      })
    };

    onActivated(() => {
      window.addEventListener("resize", handleResize);
    })

    onDeactivated(() => {
      window.removeEventListener('resize', handleResize)
    })

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
