<template>
  <div>
    <!-- Html -->
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
