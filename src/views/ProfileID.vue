<template>
  <div>
    <img src="{{ picture }}" v-bind:alt="firstname + lastname " />
    <h2>{{ firstname }} {{ lastname }}</h2>
    <strong>{{ email }}</strong>
    <br>
    <FollowUser :id="id" />
    <div class="flex">
      <a v-bind:href="urlFollows + id">Ses follows</a>
      <a v-bind:href="urlFollowers + id">Ses followers</a>
    </div>
  </div>
</template>

<script>
import FollowUser from '@/components/FollowUser.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

function useProfileIDBlock(userId) {
  const urlFollows = '/profile/follows/';
  const urlFollowers = '/profile/followers/';
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
    urlFollows, urlFollowers, id, firstname, lastname, email, picture,
  };
}

export default {
  components: { FollowUser },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useProfileIDBlock(id) };
  },
};
</script>

<style>
.flex {
  display:flex;
  justify-content: space-around;
}
</style>
