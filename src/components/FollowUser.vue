<template>
  <button @click="onButtonPress">Follow</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useFollowUserBlock(props) {
  function onButtonPress() {
    api.postOrPutRequest('POST', `/user/follow/${props.id}`, {}, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Followed user !', 'success');
      } else {
        swal('Error', 'Unable to follow user. Try again...', 'error');
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
    return { ...useFollowUserBlock(props) };
  },
});
</script>

<style>

</style>
