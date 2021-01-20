import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    host: process.env.VUE_APP_API_URL,
    loading: false,
    error: null,
    errorMessage: '',
    errorType: '',
    message: null,
    messageType: '',
    messageText: '',
  },
  mutations: {
    ERROR(state, payload) {
      if (!payload) {
        state.error = false;
        state.errorType = '';
        state.errorMessage = '';
      } else {
        state.error = payload.error;
        state.errorType = payload.errorType;
        state.errorMessage = payload.errorMessage;
      }
    },
    MESSAGE(state, payload) {
      if (!payload) {
        state.message = false;
        state.messageType = '';
        state.messageText = '';
      } else {
        state.message = payload.message;
        state.messageType = payload.messageType;
        state.messageText = payload.messageText;
      }
    },
    LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {},
  modules,
});
