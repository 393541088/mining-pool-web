<template>
  <div class="pool-status">
    <h2>矿池状态</h2>
    <div class="status-info">
      <p>总哈希率: {{ poolData.totalHashRate }}</p>
      <p>矿工数量: {{ poolData.minerCount }}</p>
      <p>总奖励: {{ poolData.totalReward }}</p>
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
  background-color: #f8f9fa;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.status-info p {
  margin: 0;
  padding: 5px 0;
}
</style>
