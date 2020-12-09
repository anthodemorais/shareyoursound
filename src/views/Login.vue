<template>
    <h2>Login</h2>
    <form @submit='onSubmit'>
        <input type='email' placeholder='Email' required v-model='email' />
        <input type='password' placeholder='Password' required v-model='password' />
        <input type='submit' />
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert';
import api from '../api';

function useLoginBlock(router) {
  const email = ref('');
  const password = ref('');

  if (localStorage.getItem('token') !== '') {
    router.push({ path: '/' });
  }
  function onSubmit(e) {
    e.preventDefault();

    if (email.value !== '' && password.value !== '') {
      api.login(email.value, password.value, () => {
        console.log(localStorage.getItem('token'));
        this.$router.push({ path: '/' });
      });
    } else {
      swal('Error', 'Email or password empty', 'error');
    }
  }

  return {
    email, password, onSubmit,
  };
}
export default {
  setup() {
    return { ...useLoginBlock(useRouter()) };
  },
};
</script>

<style>
</style>
