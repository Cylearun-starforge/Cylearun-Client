import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/home-view.vue';
import CampaignView from '@/views/campaign-view.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/campaign',
      name: 'campaign',
      component: CampaignView,
    },
  ],
});

export default router;
