import { ref } from '@vue/runtime-core';

const currentTime = ref(new Date());

setInterval(() => {
  currentTime.value = new Date();
}, 1000);

export function useCurrentTime(): typeof currentTime {
  return currentTime;
}
