<template>
    <div>
      <AddMedia/>
      <h1>Toutes les musiques :</h1>
      <div v-for="media in medias" :key="media.id" >
          <h2>
              <a v-bind:href="url + media.id">
                  {{ media.name}}
              </a>
          </h2>
          <audio controls="controls">
              <source v-bind:src="media.file" type="audio/mp3" />
          </audio>
      </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import AddMedia from '@/components/AddMedia.vue';
import api from '../api';

function allMedia() {
  const medias = ref([]);
  const url = '/media/';

  api.getRequest('/media', (data) => {
    if (data !== 'error') {
      medias.value = data.media;
    }
  });

  console.log(medias);

  return {
    medias, url,
  };
}
export default defineComponent({
  components: { AddMedia },
  setup() {
    return { ...allMedia() };
  },
});
</script>
