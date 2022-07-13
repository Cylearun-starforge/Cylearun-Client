import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useGameMaps } from './stores/game-maps';

const app = createApp(App);

app.use(createPinia());
const maps = useGameMaps();
app.use(router);

app.mount('#app');
