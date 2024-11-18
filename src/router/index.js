import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import MinerDetails from "../components/MinerDetails.vue";

const routes = [
  { path: "/", component: App }, // 首页
  { path: "/miner/:address", component: MinerDetails, props: true }, // 用户详情页
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
