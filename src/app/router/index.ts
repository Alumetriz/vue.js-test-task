import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../pages/Home.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../../pages/Game.vue'),
    }
  ],
});

export default router;
