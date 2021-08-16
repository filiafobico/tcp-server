<template>
    <div class="relative">
        <div role="button" class="absolute select-none right-0">
            <span @click="back" class="material-icons">close</span>
        </div>
        <div class="w-full text-2xl text-center" v-text="$route.name"></div>
    </div>

    <div class="h-full">
        <router-view></router-view>
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
