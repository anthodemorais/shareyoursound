<template>
  <button @click="onButtonPress">Unfollow</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useUnfollowUserBlock(props) {
  function onButtonPress() {
    api.deleteRequest(`/user/follow/${props.id}`, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Unfollowed user !', 'success');
      } else {
        swal('Error', 'Unable to unfollow user. Try again...', 'error');
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
    return { ...useUnfollowUserBlock(props) };
  },
});
</script>

<style>

</style>
