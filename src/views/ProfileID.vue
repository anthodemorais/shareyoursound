<template>
  <div>
    <h2>{{ firstname }} {{ lastname }}</h2>
    <!-- <a v-bind:href="url + id">Utilisateur n° {{ id }}</a></p> -->
    <strong>{{ email }}</strong>
    <br>
    <img src="{{ picture }}" v-bind:alt="firstname + lastname " />
    <br>
    <FollowUser :id="id" />
    <UserFollowers/>
    <UserFollows/>
  </div>
</template>

<script>
import FollowUser from '@/components/FollowUser.vue';
import UserFollowers from '@/components/UserFollowers.vue';
import UserFollows from '@/components/UserFollowsID.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function useProfileIDBlock(userId) {
  const id = ref('');
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const picture = ref('');

  api.getRequest(`/user/${userId}`, (data) => {
    if (localStorage.getItem('token') === undefined) {
      this.getAccessToken();
    }

    console.log(localStorage.getItem('token'));
    if (data !== 'error') {
      id.value = data.user.id;
      firstname.value = data.user.firstname;
      lastname.value = data.user.lastname;
      email.value = data.user.email;
      picture.value = data.user.picture;
    } else {
      this.$router.push({ path: '/' });
    }
  });

  return {
    id, firstname, lastname, email, picture,
  };
}

export default {
  components: { FollowUser, UserFollowers, UserFollows },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useProfileIDBlock(id) };
  },
};
</script>
