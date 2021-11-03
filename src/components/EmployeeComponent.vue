<template>
  <div class="item-row">
    <h2>{{ employee.employeeName }}</h2>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
import { EmployeeItem } from '../types';

export default {
  props: {
    employee: Object,
  },
};
</script>

<style scoped>
.item-row {
  border-bottom: 1px solid lightgray;
  /*background-color: lightgray;*/
  cursor: pointer;
  margin-bottom: 18px;
  padding: 20px;
  width: 500px;
}
.item-row:hover {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
}
.item-row span {
  color: darkgrey;
}
.date-div {
  display: block;
  text-align: right;
  width: 100%;
}
</style>
