<template>
    <div>
        <h1>Tous les types de Musiques</h1>
        <div v-for="post in posts" :key="post.id" >
            <h2><a v-bind:href="url + post.id">{{ post.name}}</a></h2>
            <hr/>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import api from '../api';

function AllUsers() {
  const posts = ref([]);
  const url = '/music/types/';

  api.getRequest('/type', (data) => {
    if (data !== 'error') {
      posts.value = data.types;
    }
  });

  console.log(posts);

  return {
    posts, url,
  };
}
export default defineComponent({
  setup() {
    return { ...AllUsers() };
  },
});
</script>
