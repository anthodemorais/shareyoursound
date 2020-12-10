<template>
    <div>
      <h1>Vos musiques préférées :</h1>
      <div class="list">
        <div v-for="media in medias" :key="media.id" class="card" style="width: 18rem;">
            <h2>
                <router-link :to="url + media.id">
                    {{ media.name}}
                </router-link>
            </h2>
            <strong>Par : {{ media.author.firstname }} {{ media.author.lastname }}</strong>
            <button @click="() => onMediaPress(media.file)" class="btn btn-success">
              Play Media
            </button>
        </div>
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

<style scoped>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
  padding: 10px;
}
</style>
