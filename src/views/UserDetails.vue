<template>
  <div class="user-dashboard">
    <!-- 引入公共头部组件 -->
    <HeaderTemplate />

    <!-- 用户详情区域 -->
    <div class="card">
      <section class="user-info">
        <h2 class="section-title">用户详情</h2>
        <div class="info-item">
          <span>用户地址：</span>
          <span class="value">{{ formattedAddress }}</span>
        </div>
        <div class="info-item">
          <span>总余额：</span>
          <span class="value">{{ user.balance }} QUAI</span>
        </div>
        <div class="info-item">
          <span>矿池总算力：</span>
          <span class="value">{{ poolStats.hashrate }} MH/s</span>
        </div>
      </section>
    </div>

    <!-- 总算力图表区域 -->
    <div class="card">
      <UserHashChar :data="hashrateData" />
    </div>

    <!-- 矿机列表区域 -->
    <div class="card">
      <section class="miner-list">

        <!-- 过滤按钮 -->
        <div class="filter-buttons">
          <button
            @click="filterStatus('all')"
            :class="{ active: filterType === 'all' }"
          >
            全部矿机
          </button>
          <button
            @click="filterStatus('online')"
            :class="{ active: filterType === 'online' }"
          >
            在线矿机
          </button>
          <button
            @click="filterStatus('offline')"
            :class="{ active: filterType === 'offline' }"
          >
            离线矿机
          </button>
        </div>

        <!-- 根据状态筛选的矿机 -->
        <div v-if="filteredMiners.length > 0">
          <div
            v-for="miner in filteredMiners"
            :key="miner.id"
            class="miner-item"
          >
            <span class="miner-name">{{ miner.name }}</span>
            <span class="miner-hashrate">{{ miner.hashrate }} H/s</span>
            <span :class="`miner-status ${miner.status}`">
              <i :class="`status-icon ${miner.status}`"></i>{{ miner.status }}
            </span>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">
            上一页
          </button>
          <span>第 {{ currentPage }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">
            下一页
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import UserHashChar from "@/components/UserHashChar"; // 引入 UserHashChar 组件
import HeaderTemplate from "../components/HeaderTemplate.vue";

export default {
  components: {
    HeaderTemplate,
    UserHashChar,
  },
  data() {
    return {
      user: {
        address:
          "0x005358915a45bB8e87dB8c47D54c5CeC035739eF", // 示例地址
        balance: 11234.51, // 示例余额
      },
      miners: [
        { id: 1, name: "矿机1", hashrate: 500, status: "运行中" },
        { id: 2, name: "矿机2", hashrate: 300, status: "暂停" },
        { id: 3, name: "矿机3", hashrate: 450, status: "运行中" },
        { id: 4, name: "矿机4", hashrate: 700, status: "暂停" },
        { id: 5, name: "矿机5", hashrate: 600, status: "运行中" },
        { id: 6, name: "矿机6", hashrate: 500, status: "暂停" },
        { id: 7, name: "矿机7", hashrate: 650, status: "运行中" },
        { id: 8, name: "矿机8", hashrate: 800, status: "暂停" },
        { id: 9, name: "矿机9", hashrate: 750, status: "运行中" },
        { id: 10, name: "矿机10", hashrate: 550, status: "暂停" },
        { id: 11, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 12, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 13, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 14, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 15, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 16, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 17, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 18, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 19, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 20, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 21, name: "矿机11", hashrate: 800, status: "运行中" },
        { id: 22, name: "矿机11", hashrate: 800, status: "运行中" },
      ],
      poolStats: {
        hashrate: 800, // 示例矿池总算力
      },
      hashrateData: [
        { time: "12:00", hashrate: 800 },
        { time: "12:10", hashrate: 850 },
        { time: "12:20", hashrate: 870 },
        // 示例图表数据
      ],
      currentPage: 1, // 当前页码
      filterType: "all", // 当前的筛选类型
    };
  },
  computed: {
    // 格式化用户地址，显示为前 4 位和后 4 位，中间用 "..." 省略
    formattedAddress() {
      const address = this.user.address;
      // 只显示 "0x" 开头的前 4 位和最后 4 位
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },
    // 过滤矿机并分页
    filteredMiners() {
      let filtered = this.miners;

      // 根据 filterType 过滤矿机
      if (this.filterType === "online") {
        filtered = this.miners.filter((miner) => miner.status === "运行中");
      } else if (this.filterType === "offline") {
        filtered = this.miners.filter((miner) => miner.status === "暂停");
      }

      // 分页：通过 currentPage 计算当前显示的数据
      const start = (this.currentPage - 1) * 10; // 当前页的开始索引
      const end = this.currentPage * 10; // 当前页的结束索引
      return filtered.slice(start, end); // 返回当前页需要显示的矿机数据
    },

    // 计算分页总页数
    totalPages() {
      let filtered = this.miners;

      // 根据 filterType 过滤矿机
      if (this.filterType === "online") {
        filtered = this.miners.filter((miner) => miner.status === "运行中");
      } else if (this.filterType === "offline") {
        filtered = this.miners.filter((miner) => miner.status === "暂停");
      }

      // 计算总页数，确保总页数至少为1
      return Math.max(1, Math.ceil(filtered.length / 10));
    },
  },
  methods: {
    // 切换过滤状态
    filterStatus(status) {
      this.filterType = status;
      this.currentPage = 1; // 切换过滤状态时重置为第一页
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

  <style scoped>
.user-dashboard {
  background: rgba(255, 255, 255, 0);
  padding: 10px; /* 增加内边距，适应小屏幕 */
}

/* 卡片样式保持透明风格 */
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
/* 标题样式 */
.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff; /* 统一为白色字体 */
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3); /* 边框颜色调整 */
  padding-bottom: 10px;
}

/* 子标题样式 */
.sub-title {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 12px;
}

/* 用户详情 */
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* 使用透明度为0.1的白色边框 */
}

.value {
  font-weight: 500;
  color: #3498db; /* 蓝色字体，突出显示 */
}

/* 矿机列表 */
.miner-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* 使用透明度为0.1的白色边框 */
}

.miner-name {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff; /* 统一字体颜色 */
}

.miner-hashrate {
  font-size: 14px;
  color: #2ecc71; /* 绿色字体 */
}

.miner-status {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.miner-status.运行中 {
  color: #27ae60;
}

.miner-status.暂停 {
  color: #e67e22;
}

.status-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.status-icon.运行中 {
  background-color: #27ae60;
}

.status-icon.暂停 {
  background-color: #e67e22;
}

/* 分页按钮样式 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
}

.pagination button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

/* 过滤按钮 */
.filter-buttons {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.filter-buttons button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
}

.filter-buttons button.active {
  background-color: #2ecc71;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .info-item {
    display: block; /* 在小屏幕上垂直布局 */
    padding: 12px 0;
  }

  .miner-item {
    flex-direction: column; /* 在小屏幕上垂直显示 */
    align-items: flex-start;
    padding: 12px 0;
  }

  .filter-buttons {
    flex-direction: column; /* 在小屏幕上垂直排列 */
    align-items: center;
  }

  .filter-buttons button {
    width: 100%; /* 占满宽度 */
    margin-bottom: 10px; /* 调整间距 */
  }

  .pagination {
    flex-direction: column; /* 在小屏幕上垂直显示 */
    align-items: center;
  }

  .pagination button {
    margin: 5px 0; /* 调整间距 */
  }
}
</style>
