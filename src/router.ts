import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import CarInput from './components/CarInput.vue';
import CarList from './components/CarList.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: CarInput },
  { path: '/car-list', component: CarList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;