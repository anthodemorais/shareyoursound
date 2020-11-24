<template>
  <form @submit='onSubmit'>
    <input type='text' placeholder='Firstname' required v-model='firstname' />
    <input type='text' placeholder='Lastname' required v-model='lastname' />
    <input type='email' placeholder='Email' required v-model='email' />
    <input type='password' placeholder='Password' required v-model='password' />
    <input type='submit' />
  </form>
</template>

<script>
import { ref, defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useUpdateProfileBlock(props) {
  const firstname = ref(props.pFirstname);
  const lastname = ref(props.pLastname);
  const email = ref(props.pEmail);
  const password = ref(props.pPassword);

  function onSubmit(e) {
    e.preventDefault();

    if (firstname.value !== '' && lastname.value !== '' && email.value !== '' && password.value !== '') {
      api.postOrPutRequest('PUT', '/user', {
        firstname, lastname, email, password,
      }, () => {
        console.log('updated');
      });
    } else {
      swal('Error', 'All fields are required', 'error');
    }
  }

  return {
    firstname, lastname, email, password, onSubmit,
  };
}

export default defineComponent({
  props: {
    pFirstname: String,
    pLastname: String,
    pEmail: String,
    pPassword: String,
  },
  setup(props) {
    return { ...useUpdateProfileBlock(props) };
  },
});
</script>

<style>

</style>
