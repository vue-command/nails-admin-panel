import { api } from './../../helpers/api';
import router from './../../router';

const endpoints = require('@/config/endpoints').default.offline;
const errors = require('@/config/errors').default.offline;
const messages = require('@/config/messages').default.offline;

const state = {
  courses: [],
  course: null,
  total: 0,
};

const getters = {};

const mutations = {
  COURSES: (state, payload) => {
    state.courses = payload ?? [];
  },
  TOTAL: (state, payload) => {
    state.total = payload || 0;
  },
  MORE_COURSES: (state, payload) => {
    state.courses = state.courses.concat(payload);
  },
  COURSE: (state, payload) => {
    state.course = payload;
  },
};

const actions = {
  GET_COURSES({ commit }) {
    commit('LOADING', true, { root: true });
    api.get(endpoints.get)
      .then((res) => {
        commit('COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  GET_MORE_COURSES({ commit }, params) {
    commit('LOADING', true, { root: true });
    api.get(endpoints.get, { params })
      .then((res) => {
        commit('MORE_COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  GET_COURSE({ commit }, id) {
    commit('LOADING', true, { root: true });
    api.get(`${endpoints.get}/${id}`)
      .then((res) => {
        commit('COURSE', res.data);
      })
      .catch(() => commit('ERROR', errors.get_by_id, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  POST_COURSE({ commit }, data) {
    commit('LOADING', true, { root: true });
    api.post(endpoints.post, data)
      .then((res) => {
        commit('MESSAGE', messages.post, { root: true })
        router.push({
          name: 'offline-course',
          params: {
            courseid: res.data._id,
          },
        });
      })
      .catch(() => commit('ERROR', errors.post, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  PUT_COURSE({ commit }, { data, id }) {
    commit('LOADING', true, { root: true });
    let resolve = null
    const promise = new Promise(res => resolve = res)
    api.put(`${endpoints.put}/${id}`, data)
      .then((res) => {
        commit('COURSE', res.data);
        commit('MESSAGE', messages.put, { root: true });
        resolve(true)
      })
      .catch(() => {
        commit('ERROR', errors.put, { root: true })
        resolve(false)
      })
      .finally(() => commit('LOADING', false, { root: true }))
    return promise
  },

  DELETE_COURSE({ commit, dispatch }, id) {
    commit('LOADING', true, { root: true });
    api.delete(`${endpoints.delete}/${id}`)
      .then(() => {
        commit('MESSAGE', messages.delete, { root: true });
        dispatch('GET_COURSES');
      })
      .catch(() => commit('ERROR', errors.delete, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
