/* eslint-disable no-shadow */
const { getData, patchData } = require('@/helpers').default;

const endpoints = require('@/config/endpoints').default.online;
const errors = require('@/config/errors').default.online;
const messages = require('@/config/messages').default.online;

const state = {
  onlineCourses: [],
  onlineCourseById: null,
  currentVideo: null,
  totalOnlineCourses: 0,
  loading: false,
  // onlineError: null,
};

const getters = {
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
  // ERROR: (state, payload) => {
  //   state.onlineError = payload;
  // },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_ONLINE_COURSES({ commit }, string) {
    commit('LOADING', true);
    const { onlineCourses, total, error } = await getData(`${endpoints.get}/${string}`);
    if (!error) {
      commit('ONLINE_COURSES', { onlineCourses: onlineCourses ?? [], total });
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_MORE_ONLINE_COURSES({ commit }, { string, skip }) {
    commit('LOADING', true);
    const { onlineCourses, total, error } = await getData(`${endpoints.get}/${string}&skip=${skip}`);
    if (!error) {
      commit('MORE_ONLINE_COURSES', { onlineCourses, total });
    } else {
      commit('ERROR',
        errors.get, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_ONLINE_COURSE_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { onlineCourse, error } = await getData(`${endpoints.get}/${id}`);
    if (!error) {
      commit('ONLINE_COURSE_BY_ID', { onlineCourse });
    } else {
      commit('ERROR', errors.get_by_id, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_ONLINE_COURSE_VIDEO_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { video, error } = await getData(`${endpoints.get_video}/${id}`);
    if (!error) {
      commit('ONLINE_COURSE_VIDEO_BY_ID', { video });
    } else {
      commit('ERROR', errors.get_video, { root: true });
    }
    commit('LOADING', false);
  },
  async PUBLISH({ commit, dispatch }, id) {
    const data = {
      isPublished: true,
    };
    const response = await patchData(`${endpoints.patch}/${id}`, data);
    if (!response.error) {
      commit('MESSAGE', messages.publish, { root: true });
      dispatch('GET_ONLINE_COURSE_BY_ID', id);
    } else {
      commit('ERROR', errors.publish, { root: true });
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
