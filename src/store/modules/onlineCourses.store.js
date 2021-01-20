/* eslint-disable no-shadow */
const { getData, patchData } = require('@/helpers').default;

const endpoints = require('@/config/endpoints').default.online;
const errors = require('@/config/errors').default.online;
const messages = require('@/config/messages').default.online;

const state = {
  courses: [],
  course: null,
  video: null,
  total: 0,
  // loading: false,
  // onlineError: null,
};

const getters = {};

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
  VIDEO: (state, payload) => {
    state.video = payload;
  },
};

const actions = {
  async GET_COURSES({ commit }, string) {
    commit('LOADING', true, { root: true });
    const { onlineCourses, total, error } = await getData(`${endpoints.get}/${string}`);
    if (!error) {
      commit('COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_MORE_COURSES({ commit }, { string, skip }) {
    commit('LOADING', true, { root: true });
    const { onlineCourses, total, error } = await getData(`${endpoints.get}/${string}&skip=${skip}`);
    if (!error) {
      commit('MORE_COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_COURSE({ commit }, id) {
    commit('LOADING', true, { root: true });
    const { onlineCourse, error } = await getData(`${endpoints.get}/${id}`);
    if (!error) {
      commit('COURSE', onlineCourse);
    } else {
      commit('ERROR', errors.get_by_id, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_VIDEO({ commit }, id) {
    commit('LOADING', true, { root: true });
    const { video, error } = await getData(`${endpoints.get_video}/${id}`);
    if (!error) {
      commit('VIDEO', video);
    } else {
      commit('ERROR', errors.get_video, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async PUBLISH({ commit, dispatch }, id) {
    const data = {
      isPublished: true,
    };
    const response = await patchData(`${endpoints.patch}/${id}`, data);
    if (!response.error) {
      commit('MESSAGE', messages.publish, { root: true });
      dispatch('GET_COURSE', id);
    } else {
      commit('ERROR', errors.publish, { root: true });
    }
  },
  // async CLEAR_ONLINE_COURSE_BY_ID({ commit }) {
  //   commit('ONLINE_COURSE_BY_ID_CLEAR');
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
