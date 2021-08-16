import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Menu from '@/views/Menu.vue';
import Action from '@/views/Action.vue';

import Register from '@/views/action/Register.vue';

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
            {
                name: 'Cadastro',
                path: '/register',
                component: Register
            },
        ]
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
