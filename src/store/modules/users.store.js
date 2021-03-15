const { getData } = require('@/helpers').default;

const errors = require('@/config/errors').default.users;
// const messages = require('@/config/messages').default.users

const endpoints = require('@/config/endpoints').default.users;

const state = {
  user: null,
  users: [],
  token: null,
};

const getters = {};

const mutations = {
  USER: (state, payload) => {
    state.user = payload;
  },
  USERS: (state, payload) => {
    state.users = payload;
  },
  TOKEN: (state, payload) => {
    state.token = payload;
  },
};
const actions = {
  async GET_USER({ commit, dispatch }, hash) {
    dispatch('READ_TOKEN');
    dispatch('GET_USERS');
    const response = await getData(`${endpoints.findByHash}/${hash}`);
    if (!response.error) {
      commit('USER', response.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
  },
  async GET_USERS({ commit, state }) {
    const { error, data } = await (
      await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.find}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${state.token}`,
        },
      })
    ).json();
    if (error) {
      //
    } else {
      commit('USERS', data);
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
