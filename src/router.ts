import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Menu from '@/views/Menu.vue';
import Action from '@/views/Action.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'menu',
        component: Menu
    },
    {
        path: '/action',
        component: Action,
        children: [

        ]
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
