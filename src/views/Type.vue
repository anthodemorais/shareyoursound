<template>
    <div>
        <h1>{{posts.name}} est suivit par:</h1>
        <div v-for="follower in followers" :key="follower.id" >
            <h2>{{ follower.firstname }} {{ follower.lastname }}</h2>
            <div>{{ follower.email}}</div>
            <div>Il/Elle suit {{ follower.follows }} personne(s) </div>
            <div>Il/Elle est suivie par {{ follower.followers }} followers </div>
            <img v-bind:src="follower.picture" v-bind:alt="follower.firstname + follower.lastname"/>
            <hr/>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function useUserFollows(userId) {
  const posts = ref([]);
  const followers = ref([]);

  api.getRequest(`/type/${userId}`, (data) => {
    if (data !== 'error') {
      posts.value = data.types;
      followers.value = data.types.followers;
    }
  });

  console.log(posts);
  console.log(followers);

  return {
    posts, followers,
  };
}
export default defineComponent({
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useUserFollows(id) };
  },
});
</script>
