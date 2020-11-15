<template>
  <div>
    <h2>{{ firstname }} {{ lastname }}</h2>
    <strong>{{ email }}</strong>
    <img v-bind:src="picture" v-bind:alt="firstname + lastname " />
    <UpdateProfile
      v-bind:firstname="firstname"
      v-bind:lastname="lastname"
      v-bind:email="email"
      v-bind:password="password" />
  </div>
</template>

<script>
import UpdateProfile from '@/components/UpdateProfile.vue';
import { ref } from 'vue';
import api from '../api';

function useMyProfileBlock() {
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const picture = ref('');
  const password = ref('');

  api.getRequest('/user', (data) => {
    if (data !== 'error') {
      firstname.value = data.user.firstname;
      lastname.value = data.user.lastname;
      email.value = data.user.email;
      picture.value = data.user.picture;
    }
  });

  return {
    firstname, lastname, email, picture, password,
  };
}
export default {
  components: { UpdateProfile },
  setup() {
    return { ...useMyProfileBlock() };
  },
};
</script>

<style>

</style>
