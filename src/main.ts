import { createApp } from 'vue';

import Maska from 'maska';
import { Field, Form, ErrorMessage } from 'vee-validate';

import '@fontsource/material-icons';

import router from './router';
import { SocketClient } from './ws-client';

import App from './App.vue';

const app = createApp(App);

app.config.globalProperties['$socket'] = new SocketClient(__WEBSOCKET__);

app.component('v-field', Field);
app.component('v-form', Form);
app.component('v-message', ErrorMessage);

app.use(router).use(Maska).mount('#app');
