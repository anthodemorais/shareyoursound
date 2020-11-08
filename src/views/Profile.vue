<template>
    <h2>Get Me</h2>
    <div class="text-md-center">
        <div v-for="post in posts" :key="post.id">
            <div class="card">
                <div class="card-body">
                    <p class="full-name">Utilisateur n° {{ post.id }}</p>
                    <p class="full-name">{{ post.firstname }}</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function getMe() {
  const id = ref('');
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const picture = ref('');

  api.getRequest('/user', (data) => {
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
    }
  });

  return {
    id, firstname, lastname, email, picture,
  };
}
export default {
  setup() {
    return { ...getMe() };
  },
};
</script>

<style>
</style>
