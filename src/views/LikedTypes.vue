<template>
    <div>
        <h1>Vos types de musique préférés</h1>
        <div v-for="post in posts" :key="post.id" >
            <h2><router-link :to="url + post.id">{{ post.name }}</router-link></h2>
            <hr/>
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
