<template>
    <div class="flex flex-wrap">
        <div class="w-1/2 p-2">
            <span>E-mail</span>
            <input type="text" v-model="email" />
        </div>
        <div class="w-1/2 p-2">
            <span>Senha</span>
            <input type="password" v-model="password" />
        </div>
        <div class="w-full p-2">
            <button class="w-full" @click="doLogin">Entrar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Login',
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        login() {
            return this.$socket.send({
                id: 'login',
                data: {
                    email: this.email,
                    password: this.password
                }
            }).then(JSON.parse);
        },
        doLogin() {
            this.login()
                .then(({ data }) => {
                    this.$socket.user = data.id;
                })
                .catch(() =>
                    alert('Falha ao realizar login, verificar console')
                );
        }
    }
});
</script>
