<template>
  <div id="app" class="container">
    <!-- 全局科幻背景 -->
    <SciFiBackground />  <!-- 通用背景组件 -->
    
    <!-- 头部，采用更具视觉层次的样式 -->
    <header class="header">
      <h1>矿池前端界面</h1>
    </header>

    <!-- 查询区，优化输入框和按钮样式 -->
    <div class="search-container">
      <input
        v-model="walletAddress"
        type="text"
        placeholder="输入钱包地址查询挖矿信息"
        @keyup.enter="searchMiner"
        class="search-input"
      />
      <button @click="searchMiner" class="search-button">查询</button>
    </div>

    <!-- 矿池状态，卡片样式 -->
    <div class="card">
      <h2>矿池状态</h2>
      <p>总哈希率: {{ poolData.totalHashRate }}</p>
      <p>矿工数量: {{ poolData.minerCount }}</p>
      <p>总奖励: {{ poolData.totalReward }}</p>
    </div>

    <!-- 图表区域，卡片样式 -->
    <div class="card">
      <HashRateChart :data="hashRateData" />
    </div>

    <!-- 矿工列表，卡片样式 -->
    <div class="card">
      <h2>矿工列表</h2>
      <MinerList :miners="miners" @selectMiner="fetchMinerDetails" />
    </div>

    <!-- 用户统计图表 -->
    <div class="card" v-if="selectedMiner">
      <UserStatsChart :data="userStatsData" />
      <MinerDetails :miner="selectedMiner" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MinerList from './components/MinerList.vue';
import MinerDetails from './components/MinerDetails.vue';
import HashRateChart from './components/HashRateChart.vue';
import UserStatsChart from './components/UserStatsChart.vue';
import SciFiBackground from './components/SciFiBackground.vue';
import axios from 'axios';

export default {
  components: {
    MinerList,
    MinerDetails,
    HashRateChart,
    UserStatsChart,
    SciFiBackground, // 引入 SciFiBackground 组件
  },
  setup() {
    const poolData = ref({});
    const miners = ref([]);
    const selectedMiner = ref(null);
    const walletAddress = ref('');

    // 假数据
    const hashRateData = ref([
      { date: '2024-11-01', globalHashRate: 5000, poolHashRate: 1200 },
      { date: '2024-11-02', globalHashRate: 5200, poolHashRate: 1300 },
      { date: '2024-11-03', globalHashRate: 5400, poolHashRate: 1100 },
    ]);
    const fakeMinerData = {
      address: walletAddress.value,
      hashRate: 2000,
      lastPayout: '2024-11-10',
      payouts: [
        { amount: 10, date: '2024-11-01' },
        { amount: 5, date: '2024-11-05' },
      ],
      stats: [
        { date: '2024-11-01', hashrate: 1000, earnings: 10 },
        { date: '2024-11-02', hashrate: 1200, earnings: 12 },
      ],
    };

    const userStatsData = ref([]);

    const fetchPoolStatus = async () => {
      const response = await axios.get('/api/pool-status');
      poolData.value = response.data;
    };

    const fetchMiners = async () => {
      const response = await axios.get('/api/miners');
      miners.value = response.data;
    };

    const fetchMinerDetails = async (address) => {
      const response = await axios.get(`/api/miner/${address}`);
      selectedMiner.value = response.data;
      userStatsData.value = selectedMiner.value.stats;
    };

    // 修改后的 searchMiner 方法，使用假数据
    const searchMiner = async () => {
      if (!walletAddress.value) {
        alert('请输入有效的钱包地址');
        return;
      }

      try {
        // 模拟 API 调用，正常情况下应该是这个：
        // const response = await axios.get(`/api/miner/${walletAddress.value}`);

        // 使用假数据代替接口调用
        selectedMiner.value = fakeMinerData;
        userStatsData.value = selectedMiner.value.stats;
      } catch (error) {
        alert('未找到该钱包地址的挖矿信息');
      }
    };

    onMounted(() => {
      fetchPoolStatus();
      fetchMiners();
    });

    return {
      poolData,
      miners,
      selectedMiner,
      hashRateData,
      userStatsData,
      walletAddress,
      searchMiner,
      fetchMinerDetails,
    };
  },
};
</script>

<style>
/* 基础容器样式 */
.container {
  font-family: 'Open Sans', sans-serif;
  color: #f0f0f0;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #5690cf;
  margin-bottom: 10px;
}

/* 输入框和按钮样式 */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 300px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-right: 10px;
  font-size: 1rem;
}

.search-button {
  padding: 10px 20px;
  background-color: #5690cf;
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #5670ff;
}

.search-button:active {
  transform: scale(0.98); /* 点击时轻微缩放效果 */
}

/* 卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
</style>
