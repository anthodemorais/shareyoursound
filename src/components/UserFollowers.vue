<template>
    <div>
        <h2>Ses followers: </h2>
        <div v-for="post in posts" :key="post.id" >
            <h2><a v-bind:href="url + post.id">{{ post.firstname}}</a></h2>
            <div>{{ post.lastname}}</div>
            <div>{{ post.email}}</div>
            <img v-bind:src="post.picture" v-bind:alt="post.firstname + post.lastname " />
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function UserFollowers(userId) {
  const posts = ref([]);
  const url = '/profile/';

  api.getRequest(`/user/followers/${userId}`, (data) => {
    if (data !== 'error') {
      posts.value = data.followers;
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
    return { ...UserFollowers(id) };
  },
});
</script>
