<template>
  <button @click="onButtonPress">Like</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useLikeMediaBlock(props) {
  function onButtonPress() {
    api.postOrPutRequest('POST', `/media/like/${props.id}`, {}, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Liked media, refresh the page to see the changes !', 'success');
      } else {
        swal('Error', 'Unable to like media. Try again...', 'error');
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
    return { ...useLikeMediaBlock(props) };
  },
});
</script>

<style>

</style>
