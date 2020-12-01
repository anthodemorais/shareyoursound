<template>
  <form @submit='onSubmit'>
    <strong>Ajouter un nouveau type de musique : </strong>
    <input type='text' placeholder='Name' required v-model='name' />
    <input type='submit' value='Ajouter' />
  </form>
</template>

<script>
import { ref, defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useAddTypeBlock() {
  const name = ref('');

  function onSubmit(e) {
    e.preventDefault();

    if (name.value !== '') {
      api.postOrPutRequest('POST', '/type', { name: name.value }, () => {
        swal('Done!', 'Successfully created type !', 'success');
        console.log('created type');
      });
    } else {
      swal('Error', 'All fields are required', 'error');
    }
  }

  return {
    name, onSubmit,
  };
}

export default defineComponent({
  setup() {
    return { ...useAddTypeBlock() };
  },
});
</script>

<style>

</style>
