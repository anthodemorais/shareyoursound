<template>
  <form @submit='onSubmit'>
    <strong>Ajouter un nouveau type de musique : </strong>
    <input type='text' class="form-control mb-3" placeholder='Name'
            required v-model='name' style="width: 18rem;" />
    <button type='submit' class="btn btn-primary">Ajouter</button>
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
