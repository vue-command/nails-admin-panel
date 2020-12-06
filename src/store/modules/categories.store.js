/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const state = {
  onlineCourses: [],
  onlineCourseById: null,
  currentVideo: null,
  totalOnlineCourses: 0,
  loading: false,
  onlineError: null,
};

const getters = {
  onlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/`,
  videoCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/online/findvideo/`,
};

const mutations = {
  ONLINE_COURSES: (state, { onlineCourses, total }) => {
    state.onlineCourses = onlineCourses;
    state.totalOnlineCourses = total;
  },
  MORE_ONLINE_COURSES: (state, { onlineCourses, total }) => {
    state.onlineCourses = [...state.onlineCourses, ...onlineCourses];
    state.totalOnlineCourses = total;
  },
  ONLINE_COURSE_BY_ID: (state, { onlineCourse }) => {
    state.onlineCourseById = onlineCourse;
  },
  ONLINE_COURSE_VIDEO_BY_ID: (state, { video }) => {
    state.currentVideo = video;
  },
  ONLINE_COURSE_BY_ID_CLEAR: (state) => {
    state.onlineCourseById = null;
  },
  ERROR: (state, payload) => {
    state.onlineError = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_ONLINE_COURSES({ state, getters, commit }, string) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { onlineCourses, total, error } = await (
      await fetch(`${getters.onlineCoursesEndpoint}${string}`)
    ).json();
    if (!error) {
      commit('ONLINE_COURSES', { onlineCourses, total });
      commit('LOADING', false);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async GET_MORE_ONLINE_COURSES({ state, getters, commit }, { string, skip }) {
    // commit('LOADING', true);
    commit('ERROR', null);
    const { onlineCourses, total, error } = await (
      await fetch(`${getters.onlineCoursesEndpoint}${string}&skip=${skip}`)
    ).json();
    if (!error) {
      // commit('LOADING', false);
      commit('MORE_ONLINE_COURSES', { onlineCourses, total });
    } else {
      // commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async GET_ONLINE_COURSE_BY_ID({ state, getters, commit }, id) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { onlineCourse, error } = await (
      await fetch(`${getters.onlineCoursesEndpoint}${id}`)
    ).json();
    if (!error) {
      commit('ONLINE_COURSE_BY_ID', { onlineCourse });
      commit('LOADING', false);
    } else {
      commit('LOADING', false);
      commit('ERROR', error);
    }
  },
  async GET_ONLINE_COURSE_VIDEO_BY_ID({ state, getters, commit }, id) {
    commit('LOADING', true);
    commit('ERROR', null);
    const { video, error } = await (
      await fetch(`${getters.videoCourseEndpoint}${id}`)
    ).json();
    if (!error) {
      commit('ONLINE_COURSE_VIDEO_BY_ID', { video });
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
