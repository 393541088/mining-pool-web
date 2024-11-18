<template>
  <div class="miner-list">
    <h2>矿工列表</h2>
    <ul>
      <li v-for="miner in miners" :key="miner.address">
        <a href="#" @click.prevent="selectMiner(miner.address)">
          {{ miner.address }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    miners: {
      type: Array,
      required: true,
    },
  },
  emits: ["selectMiner"],
  methods: {
    selectMiner(address) {
      this.$emit("selectMiner", address);
    },
  },
};
</script>

<style>
.miner-list {
  background-color: #f1f3f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.miner-list ul {
  list-style-type: none;
  padding: 0;
}
.miner-list li {
  margin: 5px 0;
}
.miner-list a {
  color: #007bff;
  text-decoration: none;
}
.miner-list a:hover {
  text-decoration: underline;
}
</style>
