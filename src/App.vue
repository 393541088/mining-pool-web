<template>
  <div id="app" class="container">
    <!-- 全局科幻背景 -->
    <SciFiBackground />  <!-- 通用背景组件 -->
    
    <!-- 头部，采用更具视觉层次的样式 -->
    <!-- 头部和搜索框调整后的结构 -->
    <!-- 头部和搜索框调整后的结构 -->
    <header class="header">
      <div class="header-content">
        <!-- 左侧：网站 Logo 和名称 -->
        <div class="logo-section">
          <img src="/logo.png" alt="pool Logo" class="site-logo" />
          <h1 class="site-name">矿池前端界面</h1>
        </div>
        
        <!-- 右侧：搜索框和按钮 -->
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
      </div>
    </header>

    <!-- 矿池状态，卡片样式 -->
    <div class="card">
      <PoolStatus :poolData="fakePoolData" />
    </div>

    <!-- 图表区域，卡片样式 -->
    <div class="card">
      <HashRateChart :data="hashRateData" />
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import HashRateChart from './components/HashRateChart.vue';
import SciFiBackground from './components/SciFiBackground.vue';
import PoolStatus from './components/PoolStatus.vue';
// import axios from 'axios';

export default {
  components: {
    HashRateChart,
    SciFiBackground, // 引入 SciFiBackground 组件
    PoolStatus,
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
    // 提供一些临时假数据
    const fakePoolData = {
      totalHashRate: '4500 GH/s',
      minerCount: 120,
      totalReward: '1000 ETH',
    };

    const userStatsData = ref([]);

    // const fetchPoolStatus = async () => {
    //   // const response = await axios.get('/api/pool-status');
    //   poolData.value = fakePoolData;
    // };

    // const fetchMiners = async () => {
    //   const response = await axios.get('/api/miners');
    //   miners.value = response.data;
    // };

    // const fetchMinerDetails = async (address) => {
    //   const response = await axios.get(`/api/miner/${address}`);
    //   selectedMiner.value = response.data;
    //   userStatsData.value = selectedMiner.value.stats;
    // };

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
      // fetchPoolStatus();
      // fetchMiners();
    });

    return {
      poolData,
      miners,
      selectedMiner,
      hashRateData,
      userStatsData,
      walletAddress,
      searchMiner,
      // fetchMinerDetails,
      fakePoolData,
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap; /* 允许内容换行 */
}

/* Flex 布局，用于将左侧和右侧对齐 */
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap; /* 在小屏幕上内容可以换行 */
}

/* 左侧：Logo 区域 */
.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 在小屏幕上和下方内容有间隔 */
}

.site-logo {
  width: 50px; /* 根据你的 Logo 大小调整 */
  height: 50px;
  margin-right: 10px;
}

.site-name {
  font-size: 2rem;
  color: #5690cf;
  margin: 0;
}

/* 右侧：搜索框和按钮 */
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* 默认搜索框和按钮样式 */
.search-input {
  padding: 12px;
  width: 350px;
  border-radius: 12px;
  border: 2px solid #5ca6f7;
  background: rgba(20, 20, 40, 0.8);
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 0 10px rgba(92, 166, 247, 0.5);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-button {
  padding: 12px 25px;
  background: linear-gradient(135deg, #5ca6f7 0%, #5670ff 100%);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  box-shadow: 0 0 15px rgba(92, 166, 247, 0.6);
  transition: background 0.3s, transform 0.2s;
}

/* 卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

/* 媒体查询 - 移动端适配 */
@media only screen and (max-width: 768px) {
  /* 调整 Logo 区域和网站名称的大小 */
  .logo-section {
    width: 100%;
    justify-content: center;
  }

  .site-logo {
    width: 40px; /* 缩小 Logo */
    height: 40px;
  }

  .site-name {
    font-size: 1.5rem; /* 调整字体大小 */
  }

  /* 搜索框和按钮样式调整 */
  .search-container {
    width: 100%;
    justify-content: center;
    flex-direction: column; /* 竖直排列搜索框和按钮 */
    align-items: center;
  }

  .search-input {
    width: 90%; /* 搜索框宽度适应屏幕 */
    margin-bottom: 10px; /* 和按钮之间的间隔 */
    font-size: 1rem;
  }

  .search-button {
    width: 50%; /* 按钮宽度适应屏幕 */
    font-size: 1rem;
    margin-left: 0; /* 去掉左边距 */
  }
}

</style>
