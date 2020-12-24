/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const {
  getData, postData, putData, deleteData,
} = require('@/helpers').default;

const state = {
  offlineCourses: [],
  currentOfflineCourse: null,
  // currentVideo: null,
  totalOfflineCourses: 0,
  newOfflineCourse: null,
  loading: false,
};

const getters = {
  // offlineCoursesEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline/`,
  // createOfflineCourseEndpoint: (state, getters, rootState)
  // => `${rootState.host}/course/new/offline/`,
  // editOfflineCourseEndpoint: (state, getters, rootState) => `${rootState.host}/course/offline/`,
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
    // const { offlineCourses, total, error } = await (await fetch(getters.offlineCoursesEndpoint))
    //   .json();
    const { offlineCourses, total, error } = await getData('course/offline');
    if (!error) {
      commit('OFFLINE_COURSES', { offlineCourses: offlineCourses ?? [], total });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get offline courses',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_MORE_OFFLINE_COURSES({ state, getters, commit }, { skip }) {
    commit('LOADING', true);
    const { offlineCourses, total, error } = await getData(`course/offline?skip=${skip}`);
    if (!error) {
      commit('MORE_OFFLINE_COURSES', { offlineCourses, total });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get more offline courses',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async GET_OFFLINE_COURSE_BY_ID({ commit }, id) {
    commit('LOADING', true);
    const { offlineCourse, error } = await getData(`course/offline/${id}`);
    if (!error) {
      commit('OFFLINE_COURSE_BY_ID', { offlineCourse });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Get more offline courses',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async CREATE_OFFLINE_COURSE({ getters, commit }, data) {
    commit('LOADING', true);
    const { newOfflineCourse, error } = await postData('course/new/offline', data);
    if (!error) {
      commit('NEW_OFFLINE_COURSE', { newOfflineCourse });
      commit('MESSAGE', {
        message: true,
        messageType: 'Creating course',
        messageText: 'Creating offline course successfully',
      }, { root: true });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Create offline course',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async EDIT_OFFLINE_COURSE({
    state, getters, commit, dispatch,
  }, { data, id }) {
    commit('LOADING', true);
    const { updatedOfflineCourse, error } = await putData(`course/offline/${id}`, data);
    if (!error) {
      commit('UPDATE_OFFLINE_COURSE', { updatedOfflineCourse });
      commit('MESSAGE', {
        message: true,
        messageType: 'Update course',
        messageText: 'Updating offline course successfully',
      }, { root: true });
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Create offline course',
        errorMessage: 'Process failed. Data was not received',
      }, { root: true });
    }
    commit('LOADING', false);
  },
  async REMOVE_OFFLINE_COURSE({
    state, getters, commit, dispatch,
  }, id) {
    commit('LOADING', true);
    // const { deleted, error } = await (await fetch(`${getters.editOfflineCourseEndpoint}${id}`, {
    //   method: 'DELETE',
    // })).json();
    const { deleted, error } = await deleteData(`course/offline/${id}`);
    if (!error) {
      // commit('UPDATE_OFFLINE_COURSE', { updatedOfflineCourse });
      commit('MESSAGE', {
        message: true,
        messageType: 'Delete offline course',
        messageText: 'Deleted offline course successfully',
      }, { root: true });
      dispatch('GET_OFFLINE_COURSES');
    } else {
      commit('ERROR', {
        error: true,
        errorType: 'Delete offline course',
        errorMessage: 'Process failed....',
      }, { root: true });
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
