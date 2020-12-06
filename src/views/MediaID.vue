<template>
    <div v-if="medium.length !== 0">
      <h1>{{ medium.name }}</h1>
      <audio controls="controls">
          <source v-bind:src="medium.file" type="audio/mp3" />
      </audio>
      <div>Crée par :</div>

      <img v-bind:src="medium.author.picture" />
      <div>
          <a v-bind:href="url + medium.author.id">
              {{ medium.author.firstname }} {{ medium.author.lastname }}
          </a>
      </div>
      <h2>Son/Ses genres : </h2>
      <div v-for="type in types" :key="type.id" >
          <h3>{{type.name}}</h3>
      </div>
      <h2>Ceux qui aiment cette musique: </h2>
      <div v-for="liker in likers" :key="liker.id" >
          <span>
              <a v-bind:href="url + liker.id">
                  {{ liker.firstname }} {{ liker.lastname }}
              </a>
          </span>,
      </div>
      <LikeMedia :id="medium.id"/>
      <UnlikeMedia :id="medium.id"/>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LikeMedia from '@/components/LikeMedia.vue';
import UnlikeMedia from '@/components/UnlikeMedia.vue';
import api from '../api';

function useMediaID(id) {
  const url = '/profile/';
  const medium = ref([]);
  const likers = ref([]);
  const types = ref([]);

  api.getRequest(`/media/${id}`, (data) => {
    if (data !== 'error') {
      medium.value = data.medium;
      likers.value = data.medium.likers;
      types.value = data.medium.types;
    }
  });

  return {
    url, medium, likers, types,
  };
}
export default defineComponent({
  components: { LikeMedia, UnlikeMedia },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useMediaID(id) };
  },
});
</script>
