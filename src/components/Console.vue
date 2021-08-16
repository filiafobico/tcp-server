<template>
    <div class="console overflow-y-auto">
        <div v-for="message in messages" v-text="message"></div>
    </div>
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
        });
    }
});
</script>

<style lang="scss" scoped>
div.console {
    color: green;
    @apply p-2 w-full h-full bg-black rounded break-all;
}
</style>
