<template>
    <div>
      <AddMedia/>
      <h1>Toutes les musiques :</h1>
      <div v-for="media in medias" :key="media.id" >
          <h2>
              <router-link :to="url + media.id">
                  {{ media.name}}
              </router-link>
          </h2>
          <button @click="() => onMediaPress(media.file)">Play Media</button>
      </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import AddMedia from '@/components/AddMedia.vue';
import store from '../store';
import api from '../api';

function allMedia() {
  const medias = ref([]);
  const url = '/media/';

  api.getRequest('/media', (data) => {
    if (data !== 'error') {
      medias.value = data.media;
    }
  });

  function onMediaPress(mediaUrl) {
    store.commit('readMedia', mediaUrl);
  }

  return {
    medias, url, onMediaPress,
  };
}
export default defineComponent({
  components: { AddMedia },
  setup() {
    return { ...allMedia() };
  },
});
</script>
