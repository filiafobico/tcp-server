<template>
    <v-form class="flex flex-wrap" @submit="create">
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
            <input type="text" v-model="value" v-maska="'#*.#*'" />
        </div>
        <div class="w-1/2 p-2">
            <span>Local do Serviço</span>
            <input type="text" v-model="user_client_place" />
        </div>
        <div class="w-1/2 p-2">
            <span>Dia Desejado</span>
            <v-field
                name="data"
                type="text"
                v-model="date"
                v-maska="'##/##/####'"
                :rules="dateValid"
            />
            <v-message name="data" />
        </div>
        <div class="w-1/2 p-2">
            <span>Horário Desejado</span>
            <v-field name="time" type="text" v-model="hour" v-maska="'##:##'" :rules="timeValid" />
            <v-message name="time" />
        </div>
        <div class="w-full p-2">
            <button class="w-full" type="submit">Criar</button>
        </div>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { format, isBefore, isValid, parse } from 'date-fns';

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
            const date = format(
                parse(this.date, 'dd/MM/yyyy', new Date()),
                'yyyy-MM-dd'
            );

            const hour = format(
                parse(this.hour, 'HH:mm', new Date()),
                'HH:mm:00'
            );

            this.$socket.send({
                id: 'service',
                type: 'create',
                data: {
                    type: this.type,
                    description: this.description,
                    value: this.value,
                    id_user_client: String(this.$socket.user),
                    user_client_place: this.user_client_place,
                    date,
                    hour,
                    status: 'aberto'
                }
            });
        },
        dateValid(value: string): boolean | string {
            const date = parse(value, 'dd/MM/yyyy', new Date());

            if (!isValid(date)) {
                return 'Data inválida';
            }

            if (isBefore(date, new Date())) {
                return 'Data anterior à atual';
            }

            return true;
        },
        timeValid(value: string): boolean | string {
            const time = parse(value, 'HH:mm', new Date());

            if (!isValid(time)) {
                return 'Horário inválido';
            }

            return true;
        }
    }
});
</script>