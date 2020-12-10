<template>
    <button class="btn btn-danger" @click="onRemovePress">Supprimer le type</button>
</template>

<script>
import swal from 'sweetalert';
import { defineComponent } from 'vue';
import api from '../api';

function useRemoveTypeBlock(props) {
  function onRemovePress() {
    if (props.media !== 0 && props.type !== 0) {
      api.deleteRequest(`/media/${props.media}/type/${props.type}`, (data) => {
        if (data !== 'error') {
          swal('C\'est fait!', 'Le type a été supprimé du media !', 'success');
          props.reloadMedia();
        }
      });
    }
  }

  return { onRemovePress };
}

export default defineComponent({
  props: {
    media: Number,
    type: Number,
    reloadMedia: Function,
  },
  setup(props) {
    return { ...useRemoveTypeBlock(props) };
  },
});
</script>

<style>

</style>
