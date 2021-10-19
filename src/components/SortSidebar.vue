<template>
  <ul :class="$style.el">
    <li>
      <button
        type="button"
        :class="[$style.button, { 'is-active': value === 'value' }]"
        @click="$emit('update:value', 'value')">
        <span>
          Sort by
          <span :class="$style.value">Value</span>
        </span>
      </button>
    </li>
    <li>
      <button
        type="button"
        :class="[$style.button, { 'is-active': value === 'date' }]"
        @click="$emit('update:value', 'date')">
        <span>
          Sort by
          <span :class="$style.value">Added Date</span>
        </span>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { SortBy } from 'types/SortBy';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SortSidebar',
  props: {
    value: {
      required: true,
      type: String as PropType<SortBy>,
    },
  },
  emits: {
    ['update:value']: (v: SortBy) => {
      return v === 'date' || v === 'value';
    },
  },
});
</script>

<style lang="scss" module>
@use 'sass/color';

$-height: 40px;

.el {
  list-style: none;
  margin: 0;
  padding: 0;
  position: sticky;
  top: 30px;

  & > li {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

.button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  color: color.$text-muted;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 13px;
  height: $-height;
  justify-content: space-between;
  padding: 0 15px;
  transition-duration: 300ms;
  transition-property: background-color;
  width: 100%;

  &:active,
  &:focus,
  &:hover {
    background-color: color.$bg;
  }

  &:global(.is-active) {
    background-color: color.$bg;

    &::after {
      background-color: color.$green;
      border-radius: 50%;
      content: '';
      display: block;
      height: 4px;
      width: 4px;
    }
  }
}

.value {
  color: color.$text;
}
</style>
