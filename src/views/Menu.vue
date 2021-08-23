<template>
    <div class="text-2xl text-center">Menu</div>
    <button @click="register">Cadastrar usuário</button>
    <button @click="login">Fazer login</button>
    <button @click="update">Atualizar Usuários</button>
    <button @click="listService">Listar/Selecionar Serviços</button>
    <button @click="createService">Criar Serviço</button>
    <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Menu',
    methods: {
        register() {
            this.$router.push({ name: 'Cadastro' });
        },
        login() {
            this.$router.push({ name: 'Login' });
        },
        update() {
            this.$router.push({ name: 'Atualizar Dados' });
        },
        listService() {
            if (this.$socket.user === -1) {
                return alert('Faça login primeiro para escolher/listar serviços!');
            }

            this.$router.push({ name: 'Lista de Serviços' });
        },
        createService() {
            if (this.$socket.user === -1) {
                return alert('Faça login primeiro para criar um serviço!');
            }

            this.$router.push({ name: 'Criar Serviço' });
        },
        logout() {
            this.$socket.send({ id: 'logout' })
                .finally(() => {
                    this.$socket.user = -1;
                });
        }
    }
});
</script>
