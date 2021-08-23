<template>
    <div class="p-2">
        <template v-if="services.length">
            <span>Serviço</span>
            <select v-model="service">
                <option v-for="service in services" :value="service">
                    <span v-text="['[', service.status, ']'].join('').toUpperCase()"></span>
                    {{ service.date }} - {{ service.type }}: {{ service.description }}
                </option>
            </select>
        </template>
        <div v-else class="text-center">Não há serviços cadastrados.</div>
    </div>

    <div class="w-full p-2" v-if="service && canSelect">
        <button class="w-full" @click="select">Selecionar serviço</button>
    </div>

    <div class="w-full p-2" v-if="service && canFinalize">
        <button class="w-full" @click="finalize">Finalizar serviço</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ListService',
    setup() {
        const service = ref();
        const services = ref<any[]>([]);

        return { service, services };
    },
    mounted() {
        this.getServices()
            .then(({ data: { services } }) => {
                this.services = services;
            })
            .catch(() =>
                alert('Erro ao obter lista de serviços. Verificar retorno no console (R)')
            );
    },
    computed: {
        canSelect(): boolean {
            return this.service.status === 'aberto';
        },
        canFinalize(): boolean {
            return this.service.id_user_provider === this.$socket.user && this.service.status === 'andamento';
        }
    },
    methods: {
        getServices() {
            return this.$socket.send({
                id: 'service',
                type: 'list',
                data: {
                    id: '',
                    type: '',
                    description: '',
                    id_user_provider: '',
                    id_user_client: '',
                    status: ''
                }
            }).then(JSON.parse);
        },
        finalize() {
            this.service.status = 'fechado';

            this.$socket.send({
                id: 'service',
                type: 'update',
                data: {
                    id: this.service.id,
                    status: this.service.status
                }
            });
        },
        select() {
            this.service.id_user_provider = String(this.$socket.user);
            this.service.status = 'andamento';

            this.$socket.send({
                id: 'service',
                type: 'update',
                data: {
                    id: this.service.id,
                    id_user_provider: this.service.id_user_provider,
                    status: this.service.status
                }
            });
        }
    }
});
</script>