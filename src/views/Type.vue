<template>
    <div v-if="posts.length !== 0">
        <FollowType :id="posts.id" />
        <UnfollowType :id="posts.id" />
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
import FollowType from '@/components/FollowType.vue';
import UnfollowType from '@/components/UnfollowType.vue';
import api from '../api';

function useTypeBlock(router, id) {
  const posts = ref([]);
  const followers = ref([]);

  api.getRequest(`/type/${id}`, (data) => {
    if (data !== 'error') {
      posts.value = data.types;
      followers.value = data.types.followers;
    } else {
      router.push({ path: '/' });
    }
  });

  return {
    posts, followers,
  };
}
export default defineComponent({
  components: { FollowType, UnfollowType },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useTypeBlock(useRouter(), id) };
  },
});
</script>
