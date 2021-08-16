<template>
    <div class="flex flex-wrap">
        <div class="w-1/4 p-2">
            <span>Tipo</span>
            <input type="text" v-model="type" />
        </div>
        <div class="w-3/4 p-2">
            <span>Descrição</span>
            <input type="text" v-model="description" />
        </div>
        <div class="w-1/2 p-2">
            <span>Preço</span>
            <input type="text" v-model="value" />
        </div>
        <div class="w-1/2 p-2">
            <span>Local do Serviço</span>
            <input type="text" v-model="user_client_place" />
        </div>
        <div class="w-1/2 p-2">
            <span>Dia Desejado</span>
            <input type="text" v-model="date" />
        </div>
        <div class="w-1/2 p-2">
            <span>Horário Desejado</span>
            <input type="text" v-model="hour" />
        </div>
        <div class="w-full p-2">
            <button class="w-full" @click="create">Criar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Service',
    data: () => ({
        type: '',
        description: '',
        value: '',
        user_client_place: '',
        date: '',
        hour: '',
    }),
    methods: {
        create() {
            this.$socket.send({
                id: 'service',
                type: 'create',
                data: {
                    type: this.type,
                    description: this.description,
                    value: this.value,
                    id_user_client: this.$socket.user,
                    user_client_place: this.user_client_place,
                    date: this.date,
                    hour: this.hour,
                    status: 'aberto'
                }
            });
        }
    }
});
</script>