<template>
  <div class="event-card">
    <span>@ {{ event.time }} on {{ event.category }}</span>
    <h4>{{ event.title }}</h4>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';

// export default defineComponent({
export default {
  name: 'EventCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    event: Object,
  },
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid rgb(141, 130, 115);
  margin-bottom: 18px;
}
</style>
