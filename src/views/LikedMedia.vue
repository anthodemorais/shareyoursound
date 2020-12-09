<template>
    <div>
      <h1>Vos musiques préférées :</h1>
      <div v-for="media in medias" :key="media.id" >
          <h2>
              <router-link :to="url + media.id">
                  {{ media.name}}
              </router-link>
          </h2>
          <strong>Par : {{ media.author.firstname }} {{ media.author.lastname }}</strong>
          <button @click="() => onMediaPress(media.file)">Play Media</button>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import store from '../store';
import api from '../api';

function useLikedMediaBlock() {
  const medias = ref([]);
  const url = '/media/';

  api.getRequest('/media/liked', (data) => {
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
export default {
  setup() {
    return { ...useLikedMediaBlock() };
  },
};
</script>
