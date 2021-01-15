/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */

const {
  getData, postData, putData, deleteData,
} = require('@/helpers').default;

const endpoints = require('@/config/endpoints').default.offline;
const errors = require('@/config/errors').default.offline;
const messages = require('@/config/messages').default.offline;

const state = {
  courses: [],
  course: null,
  total: 0,
};

const getters = {
};

const mutations = {
  COURSES: (state, payload) => {
    state.courses = payload ?? [];
  },
  TOTAL: (state, payload) => {
    state.total = payload ?? 0;
  },
  MORE_COURSES: (state, payload) => {
    state.courses = state.courses.concat(payload);
  },
  COURSE: (state, payload) => {
    state.course = payload;
  },
};

const actions = {
  async GET_COURSES({ commit }) {
    commit('LOADING', true, { root: true });
    const { offlineCourses, total, error } = await getData(endpoints.get);
    if (!error) {
      commit('COURSES', offlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_MORE_COURSES({ commit }, { skip }) {
    commit('LOADING', true, { root: true });
    const { offlineCourses, total, error } = await getData(`${endpoints.get}?skip=${skip}`);
    if (!error) {
      commit('MORE_COURSES', offlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_COURSE({ commit }, id) {
    commit('LOADING', true, { root: true });
    const { offlineCourse, error } = await getData(`${endpoints.get}/${id}`);
    if (!error) {
      commit('COURSE', offlineCourse);
    } else {
      commit('ERROR', errors.get_by_id, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async POST_COURSE({ commit }, data) {
    commit('LOADING', true, { root: true });
    const { newOfflineCourse, error } = await postData(endpoints.post, data);
    if (!error) {
      commit('MESSAGE', messages.post, { root: true });
    } else {
      commit('ERROR', errors.post, { root: true });
    }
    commit('LOADING', false, { root: true });
    return newOfflineCourse._id;
  },

  async PUT_COURSE({ commit }, { data, id }) {
    commit('LOADING', true, { root: true });
    const { updatedOfflineCourse, error } = await putData(`${endpoints.put}/${id}`, data);
    if (!error) {
      commit('COURSE', updatedOfflineCourse);
      commit('MESSAGE', messages.put, { root: true });
    } else {
      commit('ERROR', errors.put, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async DELETE_COURSE({ commit, dispatch }, id) {
    commit('LOADING', true, { root: true });
    const { error } = await deleteData(`${endpoints.delete}/${id}`);
    if (!error) {
      commit('MESSAGE', messages.delete, { root: true });
      dispatch('GET_COURSES');
    } else {
      commit('ERROR', errors.delete, { root: true });
    }
    commit('LOADING', false, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
