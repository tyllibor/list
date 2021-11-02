<template>
  <div>
    <!-- Html -->
    <h1>Test</h1>
    <h2>{{ title }}</h2>
    <p>{{ total }}</p>
    <button @click="total += 1">Navyseni</button>
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
  data() {
    return {
      total: 0,
    }
  },
});
</script>

<style lang="scss" module>
// Style
</style>
