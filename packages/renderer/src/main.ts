if (__DEV__) {
  import('@vue/devtools').then(devtool => {
    devtool.connect('http://localhost', '8098');
  });
}
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
