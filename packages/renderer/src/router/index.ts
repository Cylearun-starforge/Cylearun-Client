import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/home-view.vue';
import CampaignView from '@/views/campaign-view.vue';
import SkirmishView from '@/views/skirmish-view.vue';
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
    {
      path: '/skirmish',
      name: 'skirmish',
      component: SkirmishView,
    },
  ],
});

export default router;
