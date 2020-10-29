<template>
    <h2>Login</h2>
    <form @submit='onSubmit'>
        <input type='email' placeholder='Email' required @change='updateEmail' />
        <input type='password' placeholder='Password' required @change='updatePassword' />
        <input type='submit' />
    </form>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function useLoginBlock() {
  const email = ref('');
  const password = ref('');

  function onSubmit(e) {
    e.preventDefault();

    if (email.value !== '' && password.value !== '') {
      api.login(email.value, password.value, () => {
        console.log(localStorage.getItem('token'));
      });
    }
  }

  return {
    email, password, onSubmit,
  };
}
export default {
  setup() {
    return { ...useLoginBlock() };
  },
};
</script>

<style>
</style>
