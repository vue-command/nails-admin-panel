import { api } from './../../helpers/api';
// const errors = require('@/config/errors').default.users;
// const messages = require('@/config/messages').default.users

const endpoints = require('@/config/endpoints').default.users;

const state = {
  users: [],
};

const getters = {};

const mutations = {
  USERS: (state, payload) => {
    state.users = payload;
  },
};
const actions = {
  async GET_USERS({ commit }) {
    const res = await api.get(endpoints.find);
    if (res.statusText === 'OK') {
      commit('USERS', res.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
