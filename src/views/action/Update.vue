<template>
    <div class="p-2">
        <template v-if="users.length">
            <span>Usuário</span>
            <select v-model="user">
                <option v-for="user in users" :value="user" v-text="user.name"></option>
            </select>
        </template>
        <div
            v-else
            class="text-center"
        >Não há usuários cadastrados. Cadastre ao menos um para realizar a atualização</div>
    </div>

    <div class="flex flex-wrap" v-if="user">
        <div class="w-full lg:w-2/3 p-2">
            <span>Nome</span>
            <input type="text" v-model="user.name" />
        </div>
        <div class="w-full lg:w-1/3 p-2">
            <span>CPF</span>
            <input type="text" v-model="user.cpf" v-maska="'###.###.###-##'" />
        </div>
        <div class="w-1/2 p-2">
            <span>E-mail</span>
            <input type="text" v-model="user.email" />
        </div>
        <div class="w-1/2 p-2">
            <span>Senha</span>
            <input type="password" v-model="user.password" />
        </div>
        <div class="w-1/2 xl:w-3/4 p-2">
            <span>Endereço</span>
            <input type="text" v-model="user.address" />
        </div>
        <div class="w-1/2 xl:w-1/4 p-2">
            <span>Telefone</span>
            <input type="text" v-model="user.phone" />
        </div>
        <div class="w-full p-2">
            <button class="w-full" @click="update">Atualizar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Update',
    setup() {
        const user = ref();
        const users = ref<any[]>([]);

        return { user, users };
    },
    mounted() {
        this.getUsers()
            .then(({ data: { users } }) => {
                this.users = users;
            })
            .catch(() =>
                alert('Erro ao obter lista de usuários. Verificar retorno no console (R)')
            );
    },
    methods: {
        getUsers() {
            return this.$socket.send({
                id: 'user',
                type: 'list'
            }).then(JSON.parse);
        },
        update() {
            this.$socket.send({
                id: 'user',
                type: 'update',
                data: this.user
            });
        }
    },
});
</script>
