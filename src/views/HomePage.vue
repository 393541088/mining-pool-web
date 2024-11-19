<template>
  <div class="home-page">
    <!-- 引入公共头部组件 -->
    <HeaderTemplate />

    <!-- 矿池状态，卡片样式 -->
    <div class="card">
      <PoolStatus :poolData="poolData" />
    </div>

    <!-- 图表区域，卡片样式 -->
    <div class="card">
      <HashRateChart :data="hashRateData" />
    </div>
  </div>
</template>

<script>
import HeaderTemplate from '../components/HeaderTemplate.vue';
import PoolStatus from '../components/PoolStatus.vue';
import HashRateChart from '../components/HashRateChart.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderTemplate,
    PoolStatus,
    HashRateChart,
  },
  data() {
    return {
      poolData: {
        totalHashRate: '4500 GH/s',
        minerCount: 120,
        totalReward: '1000 ETH',
      },
      hashRateData: [
        { date: '2024-11-01', globalHashRate: 5000, poolHashRate: 1200 },
        { date: '2024-11-02', globalHashRate: 5200, poolHashRate: 1300 },
        { date: '2024-11-03', globalHashRate: 5400, poolHashRate: 1100 },
      ],
    };
  },
};
</script>

<style scoped>
/* 样式保留，可以根据需要调整 */
.home-page{
  background: rgba(255, 255, 255, 0);
  padding: 10px; /* 增加内边距，适应小屏幕 */
}
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
</style>
