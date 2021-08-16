<template>
    <div class="text-2xl text-center">Menu</div>
    <button @click="register">Cadastrar usuário</button>
    <button @click="login">Fazer login</button>
    <button @click="update">Atualizar dados</button>
    <button @click="listService">Listar Serviços</button>
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
            this.$router.push({ name: 'Lista de Serviços' });
        },
        createService() {
            this.$router.push({ name: 'Criar Serviço' });
        },
        logout() {
            this.$socket.send({ id: 'logout' })
                .then(() => {
                    this.$socket.user = -1;
                });
        }
    }
});
</script>
