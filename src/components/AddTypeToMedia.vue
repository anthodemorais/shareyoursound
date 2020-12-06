<template>
    <form @submit="onSubmit">
        <strong>Ajouter un type au média</strong>
        <select>
            <option v-for="type in types" v-bind:key="type.id" v-bind:value="type.id">
                {{ type.name }}
            </option>
        </select>
        <input type="submit" value="Ajouter le type" />
    </form>
</template>

<script>
import swal from 'sweetalert';
import { defineAsyncComponent, ref } from 'vue';
import api from '../api';

function useAddTypeBlock(props) {
  const types = ref([]);
  const selectedType = ref(0);

  api.getRequest('/types', (data) => {
    if (data !== 'error') {
      console.log('AAAAAA');
      types.value = data.types;
    }
  });

  function onSubmit(e) {
    e.preventDefault();

    if (selectedType.value !== 0) {
      api.postOrPutRequest('POST', `/media/${props.media}/type/${selectedType.value}`, {}, (data) => {
        if (data !== 'error') {
          swal('C\'est fait!', 'Le type a été ajouté au media !', 'success');
        }
      });
    }
  }

  return { types, selectedType, onSubmit };
}

export default defineAsyncComponent({
  props: {
    media: Number,
  },
  setup(props) {
    return { ...useAddTypeBlock(props) };
  },
});
</script>

<style>

</style>
