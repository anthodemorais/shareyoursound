<template>
  <h2>Recherchez un utilisateur ou un média</h2>
  <form @submit="onSubmit">
    <input type="search" v-model="query" />
    <input type="submit" value="Rechercher" />
  </form>
  <div v-bind:style="displayUsers">
    <h3>Utilisateurs</h3>
    <div v-for="user in users" :key="user.id">
      <a v-bind:href="'/profile/' + user.id">
        {{ user.firstname }} {{ user.lastname }} {{ user.email }}
      </a>
    </div>
  </div>
  <div v-bind:style="displayMedia">
    <h3>Médias</h3>
    <a v-for="media in medias" :key="media.id" v-bind:href="'/media/' + media.id">
        {{ media.name }}
    </a>
  </div>
  <h3 v-bind:style="noResult">Aucun Résultat</h3>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function useSearchBlock() {
  const query = ref('');
  const users = ref([]);
  const medias = ref([]);
  const displayUsers = ref('display:none;');
  const displayMedia = ref('display:none;');
  const noResult = ref('display:none;');

  function onSubmit(e) {
    e.preventDefault();

    api.getRequest(`/search/${query.value}`, (data) => {
      if (data.media.length === 0 && data.users.length !== 0) {
        users.value = data.users;
        displayUsers.value = 'display:block;';
        displayMedia.value = 'display:none;';
      } else if (data.media.length !== 0 && data.users.length === 0) {
        medias.value = data.media;
        displayUsers.value = 'display:none;';
        displayMedia.value = 'display:block;';
      } else if (data.media.length !== 0 && data.users.length !== 0) {
        users.value = data.users;
        medias.value = data.media;
        displayUsers.value = 'display:block;';
        displayMedia.value = 'display:block;';
      } else {
        noResult.value = 'display:block;';
      }
    });
  }

  return {
    query, users, medias, displayUsers, displayMedia, noResult, onSubmit,
  };
}

export default {
  setup() {
    return { ...useSearchBlock() };
  },
};
</script>

<style>

</style>
