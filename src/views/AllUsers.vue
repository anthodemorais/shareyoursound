<template>
    <div>
        <div v-for="post in posts" :key="post.id" >
            <h2><router-link :to="url + post.id">{{ post.firstname}}</router-link></h2>
            <div>{{ post.lastname}}</div>
            <div>{{ post.email}}</div>
            <div>Il/Elle suit {{ post.follows }} personne(s) </div>
            <div>Il/Elle a {{ post.followers }} followers </div>
            <img v-bind:src="post.picture" v-bind:alt="post.firstname + post.lastname " />
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import api from '../api';

function AllUsers() {
  const posts = ref([]);
  const url = '/profile/';

  api.getRequest('/users', (data) => {
    if (data !== 'error') {
      posts.value = data.users;
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
