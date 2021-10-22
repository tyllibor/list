<template>
  <div :class="$style.el">
    <div :class="$style.left">
      <div v-if="isExactMatch" :class="$style.match">
        <IconCheck />
      </div>
      <div :class="$style.left_text">
        <span :class="$style.value">{{ value }}</span>
        <span :class="$style.desc">
          <span v-if="isExactMatch" :class="$style.match_text">Exact match</span
          ><span :class="$style.id">
            <template v-if="isExactMatch">, </template>
            #{{ id }}
          </span>
        </span>
      </div>
    </div>
    <div :class="$style.right">
      <span :class="$style.date">{{ relativeDate }}</span>
      <div :class="$style.actions">
        <button
          type="button"
          :class="$style.delete"
          title="Delete"
          @click="onDelete">
          <IconTrash />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatDistance } from 'date-fns/esm';
import { useCurrentTime } from 'hooks/currentTime';
import { isNumber } from 'lodash';
import { computed, defineComponent } from 'vue';
import IconCheck from './IconCheck.vue';
import IconTrash from './IconTrash.vue';

export default defineComponent({
  name: 'ListItem',
  components: {
    IconCheck,
    IconTrash,
  },
  props: {
    date: {
      required: true,
      type: Date,
    },
    id: {
      required: true,
      type: Number,
    },
    isExactMatch: Boolean,
    value: {
      required: true,
      type: String,
    },
  },
  emits: {
    delete: (v: number) => {
      return isNumber(v);
    },
  },
  setup(props, { emit }) {
    const currentTime = useCurrentTime();

    const relativeDate = computed(() => {
      return formatDistance(props.date, currentTime.value, {
        addSuffix: true,
        includeSeconds: true,
      });
    });

    function onDelete() {
      emit('delete', props.id);
    }

    return {
      onDelete,
      relativeDate,
    };
  },
});
</script>

<style lang="scss" module>
@use 'sass/color';

$-height: 70px;
$-button: 46px;

.actions {
  display: none;
}

.el {
  align-items: center;
  border-radius: 6px;
  display: flex;
  height: $-height;
  justify-content: space-between;
  outline: 1px solid transparent;
  padding-left: 10px;
  padding-right: 10px;
  transition-duration: 300ms;
  transition-property: background-color, box-shadow, outline-color;

  &:hover {
    background-color: color.$bg;
    box-shadow: 0 0 40px rgba(#000, 0.05);
    outline-color: color.$bg;

    .actions {
      display: block;
    }
  }
}

.left {
  align-items: center;
  display: flex;

  &_text {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.match {
  align-items: center;
  color: color.$green;
  display: flex;
  height: $-button;
  justify-content: center;
  width: $-button;

  &_text {
    color: color.$green;
  }
}

.value {
  display: block;
}

.desc {
  display: block;
  font-size: 12px;
}

.id {
  color: color.$text-muted;
}

.right {
  align-items: center;
  column-gap: 10px;
  display: flex;
}

.date {
  font-size: 13px;
  padding-left: 10px;
  padding-right: 10px;
}

.delete {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: color.$red;
  cursor: pointer;
  display: flex;
  height: $-button;
  justify-content: center;
  padding: 0;
  width: $-button;

  &:active,
  &:focus,
  &:hover {
    background-color: color.$red;
    color: color.$bg;
  }
}
</style>
