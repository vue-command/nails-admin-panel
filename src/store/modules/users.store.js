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
    const params = {
      limit: 1_000
    }
    api.get(endpoints.get, {params})
      .then((res) => commit('USERS', res.data.data))
  },
  SET_ROLES({ dispatch }, {id, roles}) {
    api.post(endpoints.setRoles + '/' + id, roles)
      .then(() => dispatch('GET_USERS'))
  },
  DELETE_USER({ dispatch }, id) {
    api.delete(endpoints.get + '/' + id)
      .then(() => dispatch('GET_USERS'))
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
