<template>
    <h1>{{ name }}</h1>
    <LikeMedia :id="id"/>
    <UnlikeMedia :id="id"/>
    <button class="btn btn-success" @click="() => onMediaPress(file)">Play Media</button>
    <div class="row">
      <div class="col">
        <h2>Crée par :</h2>
        <img v-bind:src="picture" />
        <router-link v-bind:to="url + id">
            {{ firstname }} {{ lastname }}
        </router-link>
      </div>
      <div class="col">
        <h2>Son/Ses genres : </h2>
        <div v-for="type in types" :key="type.id" >
            <h3>{{type.name}}</h3>
            <RemoveTypeToMedia :media="mediaId" :type="type.id" :reloadMedia="reloadMedia" />
        </div>
        <AddTypeToMedia :media="mediaId" :reloadMedia="reloadMedia" />
      </div>
      <div class="col">
        <h2>Ceux qui aiment cette musique: </h2>
        <ul>
          <li v-for="liker in likers" :key="liker.id">
              <router-link v-bind:to="url + liker.id">
                  {{ liker.firstname }} {{ liker.lastname }}
              </router-link>
          </li>
        </ul>
      </div>
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

  function reloadMedia() {
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
  }

  return {
    name,
    file,
    picture,
    firstname,
    lastname,
    url,
    medium,
    likers,
    types,
    id,
    mediaId,
    onMediaPress,
    reloadMedia,
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

<style scoped>
.btn {
  margin: 10px;
}

.col {
  width: 30%;
}

ul {
  list-style-type: none;
}
</style>
