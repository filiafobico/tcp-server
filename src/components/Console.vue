<template>
    <div class="console overflow-y-auto" ref="console">
        <div v-for="message in messages" v-text="message"></div>
    </div>
    <button @click="clear">Limpar</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Console',
    setup() {
        const messages = ref<Array<string>>([]);

        return { messages };
    },
    created() {
        this.$socket.on('data', message => {
            this.messages.push(message);

            this.$nextTick(() => {
                const element = this.$refs['console'] as HTMLElement;
                element.scrollTop = element.scrollHeight;
            });
        });
    },
    methods: {
        clear() {
            this.messages = [];
        }
    }
});
</script>

<style lang="scss" scoped>
div.console {
    color: green;
    @apply p-2 w-full h-full bg-black rounded break-all;
}
</style>
