<template>
  <form @submit='onSubmit'>
    <strong>Ajouter un nouveau type de musique : </strong>
    <input type='text' placeholder='Name' required v-model='name' />
    <input type='text' placeholder='File' required v-model='file' />
    <input type='submit' value='Ajouter' />
  </form>
</template>

<script>
import { ref, defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useAddMediaBlock() {
  const name = ref('');
  const file = ref('');

  function onSubmit(e) {
    e.preventDefault();

    if (name.value !== '' && file.value !== '') {
      api.postOrPutRequest('POST', '/media', { name: name.value, file: file.value }, () => {
        swal('Done!', 'Successfully created media !', 'success');
        console.log('created media');
      });
    } else {
      swal('Error', 'All fields are required', 'error');
    }
  }

  return {
    name, file, onSubmit,
  };
}

export default defineComponent({
  setup() {
    return { ...useAddMediaBlock() };
  },
});
</script>

<style>

</style>
