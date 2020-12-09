<template>
    <div>
        <h2>Il/Elle suit: </h2>
        <div v-for="post in posts" :key="post.id" >
            <img v-bind:src="post.picture" v-bind:alt="post.firstname + post.lastname " />
            <h2>
              <router-link :to="url + post.id">{{ post.firstname}} {{ post.lastname}}</router-link>
            </h2>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function useUserFollows(userId) {
  const posts = ref([]);
  const url = '/profile/';

  api.getRequest(`/user/follow/${userId}`, (data) => {
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
    const { id } = useRouter().currentRoute.value.params;
    return { ...useUserFollows(id) };
  },
});
</script>
