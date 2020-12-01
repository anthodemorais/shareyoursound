<template>
  <button @click="onButtonPress">Unfollow</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useUnfollowTypeBlock(props) {
  function onButtonPress() {
    api.deleteRequest(`/type/follow/${props.id}`, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Unfollowed type, refresh the page to see the changes !', 'success');
      } else {
        swal('Error', 'Unable to unfollow type. Try again...', 'error');
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
    return { ...useUnfollowTypeBlock(props) };
  },
});
</script>

<style>

</style>
