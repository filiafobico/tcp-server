import { createApp } from 'vue';

import '@fontsource/material-icons';

import router from './router';
import App from './App.vue';

createApp(App).use(router).mount('#app');
