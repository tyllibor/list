<template>
  <div class="items">
    <!-- Html -->
    <!-- <h1>Test</h1>
    <h2>{{ title }}</h2>
    <p>{{ total }}</p>
    <button @click="total += 1">Navyseni</button> -->
    <input
      v-model="newItemText"
      type="text"
      placeholder="Search or Add..."
      @keyup.enter="filter" />

    <button class="btn btn-primary"
      :disabled="newItemText.length === 0"
      @click="addNewItem">
      Add
    </button>

    <EmployeeComponent
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EmployeeComponent from './components/EmployeeComponent.vue';
import { EmployeeItem } from './types';

export default defineComponent({
  name: 'App',
  components: {
    EmployeeComponent,
  },
  setup() {
    // Setup
    const title = ref('My Title');
    return {
      title,
      }

  },
  data() {
    return {
      total: 0,
      newItemText: '',
    };
  },
  methods: {
    addNewItem() {
      this.employees.push({
id: this.employees.length + 1,
name: this.newItemText,

      });
    }
  }
});
</script>

<style lang="scss" module>
// Style
.items {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
