<template>
  <div>
    <!-- Html -->
    <h1>Test</h1>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    // Setup
    const title = ref('My Title');
    return {
      title,
    };
  },
});
</script>

<style lang="scss" module>
// Style
</style>
