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
  GET_USERS({ commit }) {
    api.get(endpoints.find)
      .then((res) => commit('USERS', res.data))
      .catch(() => { })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
