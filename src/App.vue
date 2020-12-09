<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Mon profile</router-link> |
    <router-link to="/users">Tout les users</router-link> |
    <router-link to="/music/types">Musiques</router-link> |
    <router-link to="/media">Media</router-link> |
    <router-link to="/search">Search</router-link>
    <div v-if="!header" > |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue';

function local() {
  const header = localStorage.getItem('token');
  return {
    header,
  };
}
export default defineComponent({
  setup() {
    return { ...local() };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
