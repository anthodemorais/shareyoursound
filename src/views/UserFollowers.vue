<template>
    <div>
        <h2>Ses followers: </h2>
        <div v-for="post in posts" :key="post.id" >
            <img v-bind:src="post.picture" v-bind:alt="post.firstname + post.lastname " />
            <h2>
              <router-link :to="url + post.id">{{ post.firstname}} {{ post.lastname}}</router-link>
            </h2>
            <hr>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function UserFollowers(router, userId) {
  const posts = ref([]);
  const url = '/profile/';

  api.getRequest(`/user/followers/${userId}`, (data) => {
    if (data !== 'error') {
      posts.value = data.followers;
    } else {
      router.push({ path: '/' });
    }
  });

  return {
    posts, url,
  };
}
export default defineComponent({
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...UserFollowers(useRouter(), id) };
  },
});
</script>
