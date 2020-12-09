<template>
  <button @click="onButtonPress">Unlike</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useUnlikeMediaBlock(props) {
  function onButtonPress() {
    api.deleteRequest(`/media/like/${props.id}`, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Unliked media, refresh the page to see the changes !', 'success');
      } else {
        swal('Error', 'Unable to unlike media. Try again...', 'error');
      }
    });
  }

  return { onButtonPress };
}

export default defineComponent({
  props: {
    id: Number,
  },
  setup(props) {
    return { ...useUnlikeMediaBlock(props) };
  },
});
</script>

<style>

</style>
