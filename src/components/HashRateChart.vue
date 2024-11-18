<template>
  <div class="chart-container">
    <h2>全网算力和矿池算力</h2>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chart = ref(null);

    const renderChart = () => {
      const chartDom = chart.value;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "全网算力 vs 矿池算力",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: props.data.map((item) => item.date),
          axisLabel: {
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          name: "算力 (H/s)",
        },
        legend: {
          data: ["全网算力", "矿池算力"],
          bottom: 0,
        },
        series: [
          {
            name: "全网算力",
            type: "bar",
            data: props.data.map((item) => item.globalHashRate),
            itemStyle: {
              color: "#4f81bd",
            },
          },
          {
            name: "矿池算力",
            type: "bar",
            data: props.data.map((item) => item.poolHashRate),
            itemStyle: {
              color: "#c0504d",
            },
          },
        ],
      };
      myChart.setOption(option);
    };

    onMounted(() => {
      renderChart();
    });

    return {
      chart,
    };
  },
};
</script>

<style>
.chart-container {
  margin-bottom: 20px;
  width: 100%;
}

.chart {
  width: 100%;
  height: 300px; /* 更适合小屏幕 */
}
</style>
