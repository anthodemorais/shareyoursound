<template>
    <h2>Get Me</h2>
    <div class="text-md-center">
        <div v-for="post in posts" :key="post.id">
            <div class="card">
                <div class="card-body">
                    <p class="full-name">Utilisateur n° {{ post.id }}</p>
                    <p class="full-name">{{ post.firstname }}</p>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { ref } from 'vue';
import api from '../api';

function getMe() {
  const firstname = ref('');
  const lastname = ref('');
  const email = ref('');
  const picture = ref('');

  

  return {
    firstname, lastname, email, picture
  };
}
export default {
  setup() {
    return { ...getMe() };
  },
};
</script>

<style>
</style>
