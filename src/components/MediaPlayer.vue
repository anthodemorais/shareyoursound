<template>
  <div v-if="media !== ''">
    <audio controls="controls" :key="media">
      <source v-bind:src="media" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import { computed } from 'vue';
import store from '../store';

export default {
  setup() {
    const media = computed(() => store.getters.media);
    return { media };
  },
};
</script>

<style>
audio {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
