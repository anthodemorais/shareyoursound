<template>
  <button @click="onButtonPress" class="btn btn-primary">Follow</button>
</template>

<script>
import { defineComponent } from 'vue';
import swal from 'sweetalert';
import api from '../api';

function useFollowTypeBlock(props) {
  function onButtonPress() {
    api.postOrPutRequest('POST', `/type/follow/${props.id}`, {}, (data) => {
      if (data !== 'error') {
        swal('Done!', 'Followed type, refresh the page to see the changes !', 'success');
      } else {
        swal('Error', 'Unable to follow type. Try again...', 'error');
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
    return { ...useFollowTypeBlock(props) };
  },
});
</script>

<style scoped>
button {
  margin: 10px;
}
</style>
