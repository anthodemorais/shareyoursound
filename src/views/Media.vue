<template>
    <div class="container">
      <AddMedia/>
      <h1>Toutes les musiques :</h1>
      <div class="list">
        <div v-for="media in medias" :key="media.id"
            class="card" style="width: 18rem; height: 150px;">
            <h2 class="card-title">
                <router-link :to="url + media.id">
                    {{ media.name}}
                </router-link>
            </h2>
            <button class="btn btn-success"
                    @click="() => onMediaPress(media.file)">Play Media</button>
        </div>
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

<style>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
}
</style>
