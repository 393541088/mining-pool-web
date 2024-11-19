<template>
  <div id="app" class="container">
    <!-- 全局科幻背景 -->
    <SciFiBackground />

    <!-- 路由视图，用于根据路由显示不同的页面 -->
    <router-view />
  </div>
</template>

<script>
import SciFiBackground from './components/SciFiBackground.vue';

export default {
  name: 'App',
  components: {
    SciFiBackground,
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
</style>
