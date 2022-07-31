import '@cylearun/polyfill';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Object.assign(console, window.logger);

const app = createApp(App);

app.config.globalProperties.rc = rc;
app.use(createPinia());
app.use(router);

app.mount('#app');
