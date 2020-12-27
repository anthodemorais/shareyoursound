<template>
  <div class="card" style="width: 18rem;">
    <img v-bind:src="picture" v-bind:alt="firstname + lastname " />
    <h2>{{ firstname }} {{ lastname }}</h2>
    <strong>{{ email }}</strong>
  </div>
  <div v-for="post in posts" :key="post.firstnameFollow" >
    <div>{{ post.firstname}} </div>
  </div>
  <UpdateProfile
    v-bind:firstname="firstname"
    v-bind:lastname="lastname"
    v-bind:email="email"
    v-bind:password="password" />
  <MyFollows/>
  <MyFollowers/>
</template>

<script>
import UpdateProfile from '@/components/UpdateProfile.vue';
import MyFollows from '@/components/MyFollows.vue';
import MyFollowers from '@/components/MyFollowers.vue';
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
  components: { UpdateProfile, MyFollows, MyFollowers },
  setup() {
    return { ...useMyProfileBlock() };
  },
};
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
