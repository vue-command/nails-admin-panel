/* eslint-disable no-shadow */
const { getData, patchData } = require('@/helpers').default;

const state = {
  onlineCourses: [],
  onlineCourseById: null,
  currentVideo: null,
  totalOnlineCourses: 0,
  loading: false,
  onlineError: null,
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
  ERROR: (state, payload) => {
    state.onlineError = payload;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  async GET_ONLINE_COURSES({ commit }, string) {
    commit('LOADING', true);
    const { onlineCourses, total, error } = await getData(`course/online/${string}`);
    if (!error) {
      commit('ONLINE_COURSES', { onlineCourses: onlineCourses ?? [], total });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get online courses',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_MORE_ONLINE_COURSES({ commit }, { string, skip }) {
    commit('LOADING', true);
    const { onlineCourses, total, error } = await getData(`course/online/${string}&skip=${skip}`);
    if (!error) {
      commit('MORE_ONLINE_COURSES', { onlineCourses, total });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get online courses',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_ONLINE_COURSE_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { onlineCourse, error } = await getData(`course/online/${id}`);
    if (!error) {
      commit('ONLINE_COURSE_BY_ID', { onlineCourse });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get online course',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_ONLINE_COURSE_VIDEO_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { video, error } = await getData(`course/online/findvideo/${id}`);
    if (!error) {
      commit('ONLINE_COURSE_VIDEO_BY_ID', { video });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get online course video',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async PUBLISH({ commit, dispatch }, id) {
    const data = {
      isPublished: true,
    };
    const response = await patchData(`course/online/set-published/${id}`, data);
    if (!response.error) {
      commit('MESSAGE', {
        message: true,
        messageType: 'Publish course',
        messageText: 'Publishing course successfully',
      }, { root: true });
      dispatch('GET_ONLINE_COURSE_BY_ID', id);
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Publish course',
        errorMessage: 'Publishing course error',
      }, { root: true });
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
