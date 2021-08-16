import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Menu from '@/views/Menu.vue';
import Action from '@/views/Action.vue';

import Register from '@/views/action/Register.vue';
import Login from '@/views/action/Login.vue';
import Update from '@/views/action/Update.vue';

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
            {
                name: 'Login',
                path: '/login',
                component: Login
            },
            {
                name: 'Atualizar Dados',
                path: '/update',
                component: Update
            }
        ]
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
