<template>
    <h1>{{ name }}</h1>
    <LikeMedia :id="id"/>
    <UnlikeMedia :id="id"/>
    <button @click="() => onMediaPress(file)">Play Media</button>
    <div>Crée par :</div>

    <img v-bind:src="picture" />
    <div>
        <router-link v-bind:to="url + id">
            {{ firstname }} {{ lastname }}
        </router-link>
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
            <router-link v-bind:to="url + liker.id">
                {{ liker.firstname }} {{ liker.lastname }}
            </router-link>
        </span>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LikeMedia from '@/components/LikeMedia.vue';
import UnlikeMedia from '@/components/UnlikeMedia.vue';
import AddTypeToMedia from '@/components/AddTypeToMedia.vue';
import RemoveTypeToMedia from '@/components/RemoveTypeToMedia.vue';
import store from '../store';
import api from '../api';

function useMediaID(router, mediaId) {
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
    } else {
      router.push({ path: '/' });
    }
  });

  function onMediaPress(mediaUrl) {
    store.commit('readMedia', mediaUrl);
  }

  return {
    name, file, picture, firstname, lastname, url, medium, likers, types, id, mediaId, onMediaPress,
  };
}
export default defineComponent({
  components: {
    AddTypeToMedia, RemoveTypeToMedia, LikeMedia, UnlikeMedia,
  },
  setup() {
    const { id } = useRouter().currentRoute.value.params;
    return { ...useMediaID(useRouter(), id) };
  },
});
</script>
