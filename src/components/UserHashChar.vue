<template>
    <div ref="chartContainer" class="chart-container"></div>
</template>
  
  <script>
  import * as echarts from "echarts";
  
  export default {
    props: {
      data: Array,
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const chart = echarts.init(this.$refs.chartContainer);
  
        const option = {
          title: {
            text: '总算力 (H/s)',
            textStyle: {
              color: '#ffffff', // 标题颜色统一为白色
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          xAxis: {
            type: 'category',
            data: this.data.map(item => item.time), // 时间轴
            axisLabel: {
              color: '#ffffff', // X轴标签颜色统一为白色
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff', // X轴线条颜色统一为白色
              },
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff', // Y轴标签颜色统一为白色
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff', // Y轴线条颜色统一为白色
              },
            },
          },
          series: [
            {
              data: this.data.map(item => item.hashrate), // 算力数据
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#00A9FF', // 线条颜色保持为蓝色
              },
              symbol: 'none', // 不显示数据点
              areaStyle: {
                color: 'rgba(0, 169, 255, 0.2)', // 图表背景色透明蓝色渐变
              },
            },
          ],
        };
  
        // 使用刚指定的配置项和数据显示图表
        chart.setOption(option);
  
        // 监听窗口变化，调整图表大小
        window.addEventListener('resize', () => {
          chart.resize();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 300px;
    background: transparent; /* 完全透明背景 */
    border-radius: 12px; /* 保持卡片风格一致 */
    backdrop-filter: none; /* 移除背景模糊效果 */
    box-shadow: none; /* 去除阴影效果 */
  }
  </style>
  