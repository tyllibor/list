<template>
  <div class="home">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
//import { defineComponent } from 'vue';
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'Home',
  components: {
    EventCard,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      events: [
        {
          id: 1,
          category: 'Prvni',
          title: 'Prvni title',
          time: '11'
        },
        {
          id: 2,
          category: 'Druhy',
          title: 'Druhy title',
          time: '22'
        },
      ],
    };
  },
};
</script>
