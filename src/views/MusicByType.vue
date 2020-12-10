<template>
  <div>
    <button class="btn btn-primary">
      <router-link :to="'/music/types/' + typeId" style="color: white; text-decoration: none;">
        Voir les followers du type
      </router-link>
    </button>
    <h2>Musiques pour le type {{ type }}</h2>
    <div class="list">
      <div v-for="media in medias" v-bind:key="media.id" class="card" style="width: 18rem;">
        <h2 class="card-title">
            <router-link :to="'/media/' + media.id">
                {{ media.name }}
            </router-link>
        </h2>
        <p>
          By <router-link v-bind:to="'/profile/' + media.author.id ">
                {{ media.author.firstname }} {{ media.author.lastname }}
            </router-link>
        </p>
        <button class="btn btn-success" @click="() => onMediaPress(media.file)">Play Media</button>
      </div>
    </div>
    <strong v-if="medias.length === 0">Aucune musique pour ce type</strong>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import store from '../store';

function useMusicByTypeBlock(router, typeId) {
  const medias = ref([]);
  const type = ref('');

  api.getRequest(`/media/type/${typeId}`, (data) => {
    if (data !== 'error') {
      medias.value = data.media;
      type.value = data.type.name;
    } else {
      router.push({ path: '/' });
    }
  });

  function onMediaPress(mediaUrl) {
    store.commit('readMedia', mediaUrl);
  }

  return {
    type, medias, onMediaPress, typeId,
  };
}

export default {
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useMusicByTypeBlock(useRouter(), id) };
  },
};
</script>

<style>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.card {
  margin: 20px;
}
</style>
