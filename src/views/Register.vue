<template>
    <h2>Register</h2>
    <form @submit='onSubmit'>
        <input type='text' placeholder='Firstname' required v-model='firstname' />
        <input type='text' placeholder='Lastname' required v-model='lastname' />
        <input type='email' placeholder='Email' required v-model='email' />
        <input type='password' placeholder='Password' required v-model='password' />
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
    else {
      swal('Error', `All fields are required`, 'error');
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
