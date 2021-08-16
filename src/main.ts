import { createApp } from 'vue';

import '@fontsource/material-icons';

import router from './router';
import { SocketClient } from './ws-client';

import App from './App.vue';

const app = createApp(App);

app.config.globalProperties['$socket'] = new SocketClient(__WEBSOCKET__);

app.use(router).mount('#app');
