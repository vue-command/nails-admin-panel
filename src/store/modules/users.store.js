import { api } from './../../helpers/api';
const errors = require('@/config/errors').default.users;
// const messages = require('@/config/messages').default.users

const endpoints = require('@/config/endpoints').default.users;

const state = {
  user: null,
  users: [],
};

const getters = {};

const mutations = {
  USER: (state, payload) => {
    state.user = payload;
  },
  USERS: (state, payload) => {
    state.users = payload;
  },
};
const actions = {
  async GET_USER({ commit, dispatch }, hash) {
    dispatch('READ_TOKEN');
    dispatch('GET_USERS');
    const res = await api.get(`${endpoints.findByHash}/${hash}`);
    if (res.statusText === 'OK') {
      commit('USER', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_USERS({ commit }) {
    const res = await api.get(endpoints.find);
    if (res.statusText === 'OK') {
      commit('USERS', res.data);
    }
  },
  async READ_TOKEN({ commit }) {
    const token = localStorage.getItem('token');
    if (token) commit('TOKEN', token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
