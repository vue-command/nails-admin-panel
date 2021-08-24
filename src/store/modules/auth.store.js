/* eslint-disable quote-props */
import { api } from './../../helpers/api';

const errors = require('@/config/errors').default.auth;
const { requestReset, resetPass } = require('@/config/messages').default.auth;

const endpoints = require('@/config/endpoints').default.auth;

const state = {
  isLogged: false,
  user: null,
  loading: false,
};

const getters = {};

const mutations = {
  IS_LOGGED: (state, payload) => {
    state.isLogged = payload;
  },
  USER: (state, payload) => {
    state.user = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  GET_PROFILE({ commit }) {
    api.get(endpoints.profile)
      .then((res) => {
        if (!res.data.roles.includes('Admin')) {
          window.location = `${process.env.VUE_APP_HOST_URL}/user-cabinet`;
        }
        commit('USER', res.data);
        commit('IS_LOGGED', true);
      })
      .catch((e) => {
        window.location = `${process.env.VUE_APP_HOST_URL}/user-cabinet`
        commit('IS_LOGGED', false);
        commit('ERROR', Object.assign({}, errors.signIn, { errorMessage: e.response.data.message }), { root: true });
      })
  },

  LOG_OUT({ commit }) {
    api.post(endpoints.logout)
      .then(() => commit('LOGOUT'))
      .catch(() => { })
  },

  REQUEST_RESET({ commit }, payload) {
    let resolve = null
    const promise = new Promise()
    api.post(endpoints.reset, { email: payload })
      .then(() => {
        commit('MESSAGE', requestReset, { root: true });
        resolve(true)

      })
      .catch((e) => {
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Request reset',
            errorMessage: e.response.data.message,
          },
          { root: true }
        );
        resolve(false)
      })
    return promise;
  },

  RESTORE({ commit }, payload) {
    let resolve = null
    const promise = new Promise()
    api.post(endpoints.restore, payload)
      .then(() => {
        commit('MESSAGE', resetPass, { root: true });
        resolve(true)

      })
      .catch((e) => {
        commit(
          'ERROR',
          {
            error: true,
            errorType: 'Restore password',
            errorMessage: e.response.data.message,
          },
          { root: true }
        );
        resolve(false)
      })
    return promise
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
