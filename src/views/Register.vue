<template>
    <h2>Register</h2>
    <form @submit='onSubmit'>
        <input type='text' placeholder='Firstname' required :value='firstname' />
        <input type='text' placeholder='Lastname' required :value='lastname' />
        <input type='email' placeholder='Email' required :value='email' />
        <input type='password' placeholder='Password' required :value='password' />
        <input type='submit' />
    </form>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function useRegisterBlock() {
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const password = ref('');

  function onSubmit(e) {
    e.preventDefault();

    if (firstname.value !== '' && lastname.value !== '' && email.value !== '' && password.value !== '') {
      api.register(firstname.value, lastname.value, email.value, password.value, () => {
        console.log(localStorage.getItem('token'));
      });
    }
  }

  return {
    email, password, firstname, lastname, onSubmit,
  };
}
export default {
  setup() {
    return { ...useRegisterBlock() };
  },
};
</script>

<style>

</style>
