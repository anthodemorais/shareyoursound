import { createStore } from 'vuex';

export default createStore({
  state: {
    media: '',
  },
  getters: {
    media(state) {
      return state.media;
    },
  },
  mutations: {
    readMedia(state, url) {
      state.media = url;
    },
  },
  actions: {
  },
  modules: {
  },
});
