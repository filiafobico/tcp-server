<template>
    <div class="flex flex-wrap">
        <div class="w-full lg:w-2/3 p-2">
            <span>Nome</span>
            <input type="text" v-model="name" />
        </div>
        <div class="w-full lg:w-1/3 p-2">
            <span>CPF</span>
            <input type="text" v-model="cpf" v-maska="'###.###.###-##'" />
        </div>
        <div class="w-1/2 p-2">
            <span>E-mail</span>
            <input type="text" v-model="email" />
        </div>
        <div class="w-1/2 p-2">
            <span>Senha</span>
            <input type="password" v-model="password" />
        </div>
        <div class="w-1/2 xl:w-3/4 p-2">
            <span>Endereço (Opcional)</span>
            <input type="text" v-model="address" />
        </div>
        <div class="w-1/2 xl:w-1/4 p-2">
            <span>Telefone (Opcional)</span>
            <input type="text" v-model="phone" />
        </div>
        <div class="w-full p-2">
            <button class="w-full" @click="register">Cadastrar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Register',
    data: () => ({
        name: '',
        cpf: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    }),
    methods: {
        register() {
            this.$socket.send({
                id: 'user',
                type: 'create',
                data: {
                    name: this.name,
                    cpf: this.cpf,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    phone: this.phone
                }
            });
        }
    }
});
</script>
