<template>
  <form @submit='onSubmit'>
    <h2>Modification de ton profil</h2>
    <div class="form-group">
      <label for="inputFirstname">Firstname</label>
      <input type="text" class="form-control" placeholder="Firstname" required v-model='firstname'>
    </div>
    <div class="form-group">
      <label for="inputLastname">Lastname</label>
      <input type="text" class="form-control" placeholder="Lastname" required v-model='lastname'>
    </div>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input type="email" class="form-control" placeholder="Email" required v-model='email'>
    </div>
    <div class="form-group">
      <label for="inputPassword">Password</label>
      <input type="password" class="form-control" placeholder="Password"
        required v-model='password'
      >
    </div>
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
        swal('Done!', 'Successfully updated profile !', 'success');
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
h2 {
  margin-top: 2%;
}
</style>
