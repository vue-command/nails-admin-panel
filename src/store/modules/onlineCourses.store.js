/* eslint-disable no-shadow */
const { getData, postData, patchData, putData, deleteData } = require('@/helpers').default;

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
  async GET_COURSES({ commit }, query) {
    commit('LOADING', true, { root: true });
    const { onlineCourses, total, error } = await getData(`${endpoints.get}${query}`);
    if (!error) {
      commit('COURSES', onlineCourses);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async GET_MORE_COURSES({ commit }, query) {
    commit('LOADING', true, { root: true });
    const { onlineCourses, total, error } = await getData(`${endpoints.get}${query}`);
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
  async POST_COURSE({ commit},  data) {
    commit('LOADING', true, { root: true });
    const { newOnlineCourse, error } = await postData(endpoints.post, data);
    if (!error) {
      commit('MESSAGE', messages.post, { root: true });
    } else {
      commit('ERROR', errors.post, { root: true });
    }
    commit('LOADING', false, { root: true });
    return newOnlineCourse._id;
  },
  async PUT_COURSE({ state, commit }, { data, id }) {
    const { updatedOnlineCourse, error } = await putData(`${endpoints.get}/${id}`, data);
    if (!error) {
      commit('COURSE', updatedOnlineCourse);
      commit('COURSES', state.courses.map(course => course._id === id ? updatedOnlineCourse: course));
    } else {
      commit('ERROR', errors.get, { root: true })
    }
  },
  async DELETE_COURSE( { commit }, courseId) {
    const { error } = await deleteData(`${endpoints.delete}/${courseId}`);
    if (error) commit('ERROR', errors.get, { root: true })
  
  },
  async PUBLISH({ commit, dispatch }, { id, publish }) {
    const data = {
      isPublished: publish,
    };
    const response = await patchData(`${endpoints.patch}/${id}`, data);
    if (!response.error) {
      commit('MESSAGE', publish ? messages.publish : messages.unpublish, { root: true });
      dispatch('GET_COURSE', id);
    } else {
      commit('ERROR', publish ? errors.publish : errors.unpublish, { root: true });
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
