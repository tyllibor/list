<template>
  <div :class="$style.el">
    <input
      ref="inputRef"
      :class="$style.input"
      :value="value"
      placeholder="Search or Add..."
      type="search"
      @input="$emit('update:value', $event.target.value)"
      @keydown.esc="onClear"
      @keydown.enter="onAdd" />
    <div v-if="hasValue" :class="$style.buttons">
      <ul :class="$style.buttons_in">
        <li>
          <button
            :class="[$style.button, $style.clear]"
            title="Clear"
            type="button"
            @click="onClear">
            <IconCancel />
          </button>
        </li>
        <li>
          <button
            :class="[$style.button, $style.add, { disabled: isAddDisabled }]"
            :disabled="isAddDisabled"
            title="Add"
            type="button"
            @click="onAdd">
            <IconAdd />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { isString } from 'lodash';
import { computed, defineComponent, ref } from 'vue';
import IconAdd from './IconAdd.vue';
import IconCancel from './IconCancel.vue';

export default defineComponent({
  name: 'SearchBar',
  components: {
    IconCancel,
    IconAdd,
  },
  props: {
    canAdd: Boolean,
    value: {
      default: '',
      type: String,
    },
  },
  emits: {
    ['update:value']: (v: string) => {
      return isString(v);
    },
    add: (v: unknown) => {
      return isString(v);
    },
  },
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();

    const hasValue = computed(() => {
      return props.value.length > 0;
    });

    const isAddDisabled = computed(() => {
      return hasValue.value && !props.canAdd;
    });

    function onClear() {
      emit('update:value', '');
      inputRef.value?.focus();
    }

    function onAdd() {
      if (props.canAdd && hasValue.value) {
        emit('add', props.value);
        onClear();
      }
    }

    return {
      hasValue,
      inputRef,
      isAddDisabled,
      onAdd,
      onClear,
    };
  },
});
</script>

<style lang="scss" module>
@use 'sass:math';
@use 'sass/color';

$-height: 60px;
$-button: 46px;

.el {
  background-color: color.$aux;
  border-radius: 6px;
  display: flex;
}

.input {
  background-color: transparent;
  border: none;
  flex-grow: 1;
  font-family: inherit;
  font-size: 14px;
  height: $-height;
  padding-left: 20px;
  padding-right: 20px;

  &::-webkit-search-cancel-button {
    display: none;
  }

  &::placeholder {
    color: color.$disabled;
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
}

.buttons {
  align-items: center;
  display: flex;
  padding: 0 10px;

  &_in {
    align-items: center;
    background-color: rgba(color.$bg, 0.25);
    border-radius: math.div($-button, 2);
    display: flex;
    height: $-button;
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: $-button;
  justify-content: center;
  padding: 0;
  width: $-button;

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
}

.clear {
  color: color.$red;

  &:active,
  &:focus,
  &:hover {
    background-color: color.$red;
    color: color.$bg;
  }
}

.add {
  color: color.$primary;

  &:global(.disabled) {
    color: color.$disabled;
    cursor: not-allowed;
  }

  &:global(:not(.disabled)) {
    &:active,
    &:focus,
    &:hover {
      background-color: color.$primary;
      color: color.$bg;
    }
  }
}
</style>
