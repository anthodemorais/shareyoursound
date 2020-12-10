<template>
  <form @submit='onSubmit'>
    <strong class="mb-3">Ajouter une musique : </strong>
    <div class="row">
      <input type='text' class="col form-control mb-4" placeholder='Name' required v-model='name' />
      <input type="file" required ref="file" class="col mb-3" />
    </div>
    <button type='submit' class="btn btn-primary">Ajouter</button>
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
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
