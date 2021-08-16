<template>
    <div class="flex flex-col h-full space-y-2">
        <router-view class="h-full"></router-view>
        <button @click="back">Voltar</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Action',
    methods: {
        back() {
            this.$router.push({ name: 'menu' });
        }
    }
});
</script>
