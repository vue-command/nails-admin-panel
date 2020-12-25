/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const {
  getData, postData, putData, deleteData,
} = require('@/helpers').default;

const endpoints = require('@/config/endpoints').default.offline;
const errors = require('@/config/errors').default.offline;
const messages = require('@/config/messages').default.offline;

const state = {
  offlineCourses: [],
  currentOfflineCourse: null,
  // currentVideo: null,
  totalOfflineCourses: 0,
  newOfflineCourse: null,
  loading: false,
};

const getters = {
};

const mutations = {
  OFFLINE_COURSES: (state, { offlineCourses, total }) => {
    state.offlineCourses = offlineCourses;
    state.totalOfflineCourses = total;
  },
  NEW_OFFLINE_COURSE: (state, { newOfflineCourse }) => {
    state.newOfflineCourse = newOfflineCourse;
  },
  MORE_OFFLINE_COURSES: (state, { offlineCourses, total }) => {
    state.offlineCourses = [...state.offlineCourses, ...offlineCourses];
    state.totalOfflineCourses = total;
  },
  OFFLINE_COURSE_BY_ID: (state, { offlineCourse }) => {
    state.currentOfflineCourse = offlineCourse;
  },
  UPDATE_OFFLINE_COURSE: (state, { updatedOfflineCourse }) => {
    state.currentOfflineCourse = updatedOfflineCourse;
  },
  OFFLINE_COURSE_BY_ID_CLEAR: (state) => {
    state.currentOfflineCourse = null;
    state.newOfflineCourse = null;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_OFFLINE_COURSES({ commit }) {
    commit('LOADING', true);
    const { offlineCourses, total, error } = await getData(endpoints.get);
    if (!error) {
      commit('OFFLINE_COURSES', { offlineCourses: offlineCourses ?? [], total });
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_MORE_OFFLINE_COURSES({ state, getters, commit }, { skip }) {
    commit('LOADING', true);
    const { offlineCourses, total, error } = await getData(`${endpoints.get}?skip=${skip}`);
    if (!error) {
      commit('MORE_OFFLINE_COURSES', { offlineCourses, total });
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_OFFLINE_COURSE_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { offlineCourse, error } = await getData(`${endpoints.get}/${id}`);
    if (!error) {
      commit('OFFLINE_COURSE_BY_ID', { offlineCourse });
    } else {
      commit('ERROR', errors.get_by_id, { root: true });
    }
    commit('LOADING', false);
  },
  async CREATE_OFFLINE_COURSE({ getters, commit }, data) {
    commit('LOADING', true);
    const { newOfflineCourse, error } = await postData(endpoints.post, data);
    if (!error) {
      commit('NEW_OFFLINE_COURSE', { newOfflineCourse });
      commit('MESSAGE', messages.post, { root: true });
    } else {
      commit('ERROR', errors.post, { root: true });
    }
    commit('LOADING', false);
  },
  async EDIT_OFFLINE_COURSE({
    state, getters, commit, dispatch,
  }, { data, id }) {
    commit('LOADING', true);
    const { updatedOfflineCourse, error } = await putData(`${endpoints.put}/${id}`, data);
    if (!error) {
      commit('UPDATE_OFFLINE_COURSE', { updatedOfflineCourse });
      commit('MESSAGE', messages.put, { root: true });
    } else {
      commit('ERROR', errors.put, { root: true });
    }
    commit('LOADING', false);
  },
  async REMOVE_OFFLINE_COURSE({
    state, getters, commit, dispatch,
  }, id) {
    commit('LOADING', true);
    const { deleted, error } = await deleteData(`${endpoints.delete}/${id}`);
    if (!error) {
      commit('MESSAGE', messages.delete, { root: true });
      dispatch('GET_OFFLINE_COURSES');
    } else {
      commit('ERROR', errors.delete, { root: true });
    }
    commit('LOADING', false);
  },
  async CLEAR_OFFLINE_COURSE_BY_ID({ commit }) {
    commit('OFFLINE_COURSE_BY_ID_CLEAR');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
