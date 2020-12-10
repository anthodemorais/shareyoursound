<template>
    <div>
        <h1>Vos types de musique préférés</h1>
        <div class="list">
          <div v-for="post in posts" :key="post.id" class="card">
              <strong><router-link :to="url + post.id">{{ post.name }}</router-link></strong>
          </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function useLikedTypesBlock() {
  const posts = ref([]);
  const url = '/music/types/';

  api.getRequest('/type/followed', (data) => {
    if (data !== 'error') {
      posts.value = data.types;
    }
  });

  return {
    posts, url,
  };
}
export default {
  setup() {
    return { ...useLikedTypesBlock() };
  },
};
</script>

<style scoped>
.card {
  margin: 5px;
  padding: 5px;
}
</style>
