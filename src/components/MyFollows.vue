<template>
    <div>
        <h2>Je suis follow à: </h2>
        <div v-for="post in posts" :key="post.id" >
            <div class="card" style="width: 18rem;">
                <img v-bind:src="post.picture" v-bind:alt="post.firstname + post.lastname " />
                <h2>
                  <router-link :to="url + post.id">
                    {{ post.firstname}} {{ post.lastname}}
                  </router-link>
                </h2>
                <div>{{ post.email}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import api from '../api';

function useMyFollows() {
  const posts = ref([]);
  const url = '/profile/';

  api.getRequest('/user/follow', (data) => {
    if (data !== 'error') {
      posts.value = data.follows;
    }
  });

  console.log(posts);

  return {
    posts, url,
  };
}
export default defineComponent({
  setup() {
    return { ...useMyFollows() };
  },
});
</script>

<style>
img {
  height: 150px;
}

.card {
  margin: auto;
  margin-top: 7%;
}
</style>
