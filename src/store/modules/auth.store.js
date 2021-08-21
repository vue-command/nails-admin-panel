/* eslint-disable quote-props */
import { api } from './../../helpers/api';
import { storage } from './../../helpers/storage';

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
  async IS_SIGNED({ dispatch }) {
    const authorization = storage.getAuthorization();
    if (authorization) dispatch('GET_PROFILE');
  },
  async GET_PROFILE({ commit }) {
    const res = await api.get(endpoints.profile);
    if (res.statusText === 'OK') {
      commit('USER', res.data);
      commit('IS_LOGGED', true);
    } else {
      commit('IS_LOGGED', false);
      commit('ERROR', Object.assign({}, errors.signIn, { errorMessage: res.data.message }), { root: true });
    }
  },
  async LOG_OUT({ commit }) {
    await api.post(endpoints.logout);
    commit('LOGOUT');
  },
  async SIGN_IN({ commit, dispatch }, payload) {
    commit('LOADING', true);
    const res = await api.post(endpoints.login, payload);
    if (res.statusText === 'Created') {
      storage.saveAuthorization(res.data);
      dispatch('GET_PROFILE');
    } else {
      commit('ERROR', Object.assign({}, errors.signIn, { errorMessage: res.data.message }), { root: true });
    }
    commit('LOADING', false);
  },
  async REQUEST_RESET(ctx, payload) {
    const res = await api.post(endpoints.reset, { email: payload });
    if (res.statusText === 'Created') {
      ctx.commit('MESSAGE', requestReset, { root: true });
      return true;
    } else {
      ctx.commit(
        'ERROR',
        {
          error: true,
          errorType: 'Request reset',
          errorMessage: res.data.message,
        },
        { root: true }
      );
      return false;
    }
  },
  async RESTORE(ctx, payload) {
    const res = await api.post(endpoints.restore, payload);
    if (res.statusText === 'Created') {
      ctx.commit('MESSAGE', resetPass, { root: true });
      return true;
    } else {
      ctx.commit(
        'ERROR',
        {
          error: true,
          errorType: 'Restore password',
          errorMessage: res.data.message,
        },
        { root: true }
      );
      return false;
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
