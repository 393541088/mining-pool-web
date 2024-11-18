<template>
    <div class="chart-container">
      <h2>用户算力和奖励</h2>
      <div ref="chart" class="chart"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import { onMounted, ref } from 'vue';
  
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
            text: '用户算力和奖励',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: props.data.map(item => item.userName),
            axisLabel: {
              rotate: 45,
            },
          },
          yAxis: {
            type: 'value',
            name: '算力 / 奖励',
          },
          legend: {
            data: ['用户算力', '用户奖励'],
            bottom: 0,
          },
          series: [
            {
              name: '用户算力',
              type: 'bar',
              data: props.data.map(item => item.userHashRate),
              itemStyle: {
                color: '#9bbb59',
              },
            },
            {
              name: '用户奖励',
              type: 'bar',
              data: props.data.map(item => item.reward),
              itemStyle: {
                color: '#8064a2',
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
  }
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
  