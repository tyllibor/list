<template>
  <!-- Html -->
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </div>
    <router-view />
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
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
h4 {
  font-size: 20px;
}
</style>
