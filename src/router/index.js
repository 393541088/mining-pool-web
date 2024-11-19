import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import UserDetails from "../views/UserDetails.vue"; // 确保路径正确

const routes = [
  {
    path: "/",
    name: "HomePage", // 路由名称也更新
    component: HomePage,
  },
  {
    path: "/user/:walletAddress", // 添加用户详情页面路由
    name: "UserDetails",
    component: UserDetails,
    props: true, // 允许通过路由参数传递 props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
