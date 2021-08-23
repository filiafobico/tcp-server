<template>
    <div class="chat overflow-y-auto">
        <div v-for="{ user, content } in messages" class="space-x-1">
            <span>&lt;{{ user }}&gt;</span>
            <span v-text="content"></span>
        </div>
    </div>
    <input type="text" v-model="message" @keyup="keyup" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Chat',
    setup() {
        const message = ref('');
        const messages = ref<any[]>([]);

        return { message, messages };
    },
    mounted() {
        this.$socket.on('data', message => {
            try {
                const object = JSON.parse(message);

                const user = object?.data?.ip;
                const content = object?.data?.message;

                this.messages.push({ user, content });
            } catch {
                alert('Erro ao processar resposta do servidor. Verifique o Console');
            }
        });
    },
    methods: {
        keyup(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                this.send();
            }
        },
        send() {
            if (this.message) {
                this.$socket.send({
                    id: 'chat',
                    data: {
                        message: this.message
                    }
                });

                this.message = '';
            }
        }
    }
});
</script>

<style lang="scss" scoped>
div.chat {
    @apply p-2 w-full h-full border-2 rounded break-all;
}
</style>
