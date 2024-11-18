<template>
    <div class="miner-details">
      <h2>矿工详细信息</h2>
      <div v-if="miner === null">
        <p>未找到该矿工的信息。</p>
      </div>
      <div v-else>
        <p>地址: {{ miner.address }}</p>
        <p>哈希率: {{ miner.hashRate }}</p>
        <p>最近支付: {{ miner.lastPayout }}</p>
        <h3>支付历史</h3>
        <ul>
          <li v-for="(payout, index) in miner.payouts" :key="index">
            支付金额: {{ payout.amount }} - 时间: {{ payout.date }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      miner: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .miner-details {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .miner-details p,
  .miner-details li {
    margin: 5px 0;
  }
  </style>
  