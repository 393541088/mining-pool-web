<template>
  <div class="pool-status">
    <h2>矿池状态</h2>
    <div class="status-info">
      <div class="status-row">
        <span class="label">总哈希率:</span>
        <span class="value">{{ poolData.totalHashRate }}</span>
      </div>
      <div class="status-row">
        <span class="label">矿工数量:</span>
        <span class="value">{{ poolData.minerCount }}</span>
      </div>
      <div class="status-row">
        <span class="label">总奖励:</span>
        <span class="value">{{ poolData.totalReward }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poolData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.pool-status {
  background: rgba(0, 0, 0, 0); /* 深色半透明背景 */
  color: #e0e0e0; /* 浅色文字 */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

h2 {
  font-size: 1.8rem;
  color: #5ca6f7; /* 浅蓝色的标题 */
  margin-bottom: 10px;
  border-bottom: 2px solid #5ca6f7;
  padding-bottom: 10px;
}

.status-info {
  padding-top: 10px;
}

.status-row {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  margin: 5px 0;
  font-size: 1.1rem;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.value {
  text-align: right; /* 右对齐文本 */
}
</style>
