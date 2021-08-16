import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Menu from '@/views/Menu.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'menu',
        component: Menu
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
