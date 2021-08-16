<template>
  <div class="w-full h-full flex">
    <div class="p-2 w-1/2 flex flex-col space-y-2">
      <div class="text-2xl text-center">Console</div>
      <Console></Console>
    </div>

    <div class="p-2 w-1/2">
      <div class="flex flex-col space-y-2 h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Console from '@/components/Console.vue';

export default defineComponent({
  name: 'App',
  components: {
    Console
  }
});
</script>

<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html {
  @apply overflow-hidden;
}

#app {
  @apply w-screen h-screen p-4;
}

input,
select {
  @apply w-full rounded border-2;
}

input,
select {
  &:focus {
    @apply outline-none border-green-300;
  }
}

button {
  line-height: 0;
  @apply rounded border-2 h-8 flex justify-center items-center;
}

button:hover {
  @apply border-green-300;
}

button:focus {
  @apply outline-none;
}
</style>
