<template>
  <div v-for="media in medias" v-bind:key="media.id">
    <strong>{{ media.name }}</strong>
    <audio v-bind:src="media.file" autoplay>
      Votre navigateur ne supporte pas l'élément audio.
    </audio>
    <p>
      By <router-link v-bind:to="'/profile/' + media.author.id ">
            {{ media.author.firstname }} {{ media.author.lastname }}
        </router-link>
    </p>
  </div>
  <strong v-if="medias.length === 0">Aucune musique pour ce type</strong>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

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

  return { type, medias };
}

export default {
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useMusicByTypeBlock(useRouter(), id) };
  },
};
</script>

<style>

</style>
