/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const state = {
  offlineCourses: [],
  offlineCourseById: null,
  // currentVideo: null,
  totalOfflineCourses: 0,
  newOfflineCourse: null,
  loading: false,
  offlineError: null,
};

const getters = {
  offlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline/`,
  createOfflineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/new/offline/`,
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
    state.offlineCourseById = offlineCourse;
  },
  OFFLINE_COURSE_BY_ID_CLEAR: (state) => {
    state.offlineCourseById = null;
  },
  ERROR: (state, payload) => {
    state.offlineError = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_OFFLINE_COURSES({ state, getters, commit }) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { offlineCourses, total, error } = await (await fetch(getters.offlineCoursesEndpoint))
      .json();
    if (!error) {
      commit('OFFLINE_COURSES', { offlineCourses, total });
      commit('LOADING', false);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async GET_MORE_OFFLINE_COURSES({ state, getters, commit }, { skip }) {
    // commit('LOADING', true);
    commit('ERROR', null);
    const { offlineCourses, total, error } = await (await fetch(`${getters.offlineCoursesEndpoint}?skip=${skip}`)).json();
    if (!error) {
      // commit('LOADING', false);
      commit('MORE_OFFLINE_COURSES', { offlineCourses, total });
    } else {
      // commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async GET_OFFLINE_COURSE_BY_ID({ state, getters, commit }, id) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { offlineCourse, error } = await (await fetch(`${getters.offlineCoursesEndpoint}${id}`)).json();
    if (!error) {
      commit('OFFLINE_COURSE_BY_ID', { offlineCourse });
      commit('LOADING', false);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async CREATE_OFFLINE_COURSE({ state, getters, commit }, data) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { newOfflineCourse, error } = await (await fetch(getters.createOfflineCourseEndpoint, {
      method: 'POST',
      body: data,
    })).json();
    if (!error) {
      commit('NEW_OFFLINE_COURSE', { newOfflineCourse });
      commit('LOADING', false);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async CLEAR_ONLINE_COURSE_BY_ID({ commit }) {
    commit('ONLINE_COURSE_BY_ID_CLEAR');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
