<template>
  <header class="header">
    <div class="header-content">
      <!-- 左侧：Logo 和网站名称 -->
      <div class="logo-section" @click="goToHome">
        <img src="/logo.png" alt="网站 Logo" class="site-logo" />
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
</template>

<script>
export default {
  name: 'HeaderTemplate',
  data() {
    return {
      walletAddress: '',
    };
  },
  methods: {
    // 返回首页的功能
    goToHome() {
      this.$router.push({ name: 'HomePage' }); // 假设首页的路由名称是 'Home'
    },
    searchMiner() {
      if (!this.walletAddress) {
        alert('请输入有效的钱包地址');
        return;
      }
      // 跳转到用户详情页面，并传递钱包地址作为参数
      this.$router.push({ name: 'UserDetails', params: { walletAddress: this.walletAddress } });
    },
  },
};
</script>

<style scoped>
/* 样式配置 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer; /* 添加鼠标指针 */
}

.site-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.site-name {
  font-size: 2rem;
  color: #5690cf;
  margin: 0;
}

.search-container {
  display: flex;
  justify-content: center;
}

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
</style>
