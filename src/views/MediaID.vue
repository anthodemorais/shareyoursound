<template>
    <h1>{{ medium.name }}</h1>
    <audio controls="controls">
        <source v-bind:src="medium.file" type="audio/mp3" />
    </audio>
    <div>Crée par :</div>

    <img v-bind:src="picture" />
    <div>
        <a v-bind:href="url + id">
            {{ firstname }} {{ lastname }}
        </a>
    </div>
    <h2>Son/Ses genres : </h2>
    <div v-for="type in types" :key="type.id" >
        <h3>{{type.name}}</h3>
        <RemoveTypeToMedia :media="mediaId" :type="type.id" />
    </div>
    <AddTypeToMedia :media="mediaId" />
    <h2>Ceux qui aiment cette musique: </h2>
    <div v-for="liker in likers" :key="liker.id" >
        <span>
            <a v-bind:href="url + liker.id">
                {{ liker.firstname }} {{ liker.lastname }}
            </a>
        </span>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AddTypeToMedia from '@/components/AddTypeToMedia.vue';
import RemoveTypeToMedia from '@/components/RemoveTypeToMedia.vue';
import api from '../api';

function useMediaID(mediaId) {
  const url = '/profile/';
  const medium = ref([]);
  const likers = ref([]);
  const types = ref([]);
  const id = ref('');
  const name = ref('');
  const file = ref('');
  const picture = ref('');
  const firstname = ref('');
  const lastname = ref('');

  api.getRequest(`/media/${mediaId}`, (data) => {
    if (data !== 'error') {
      name.value = data.medium.name;
      file.value = data.medium.file;
      id.value = data.medium.author.id;
      picture.value = data.medium.author.picture;
      firstname.value = data.medium.author.firstname;
      lastname.value = data.medium.author.lastname;
      medium.value = data.medium;
      likers.value = data.medium.likers;
      types.value = data.medium.types;
    }
  });

  return {
    name, file, picture, firstname, lastname, url, medium, likers, types, id, mediaId,
  };
}
export default defineComponent({
  components: { AddTypeToMedia, RemoveTypeToMedia },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useMediaID(id) };
  },
});
</script>
