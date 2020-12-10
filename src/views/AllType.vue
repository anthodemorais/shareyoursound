<template>
    <div class="container">
        <h1>Tous les types de Musiques</h1>
        <AddType />
        <div class="list">
          <div v-for="post in posts" :key="post.id" class="card">
              <strong><router-link :to="url + post.id">{{ post.name }}</router-link></strong>
          </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import AddType from '@/components/AddType.vue';
import api from '../api';

function AllUsers() {
  const posts = ref([]);
  const url = '/media/type/';

  api.getRequest('/type', (data) => {
    if (data !== 'error') {
      posts.value = data.types;
    }
  });

  return {
    posts, url,
  };
}
export default defineComponent({
  components: { AddType },
  setup() {
    return { ...AllUsers() };
  },
});
</script>

<style scoped>
.card {
  margin: 5px;
  padding: 5px;
}
</style>
