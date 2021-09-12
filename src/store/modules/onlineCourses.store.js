import { api } from './../../helpers/api';
import router from './../../router';

const endpoints = require('@/config/endpoints').default.online;
const errors = require('@/config/errors').default.online;
const messages = require('@/config/messages').default.online;

const state = {
  courses: [],
  course: null,
  video: null,
  total: 0,
  queue: [],
  uploadDialog: false,
};

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
  VIDEO: (state, payload) => {
    state.video = payload;
  },
  QUEUE: (state, payload) => {
    state.queue = payload;
  },
  COMPLETE: (state, payload) => {
    if (state.queue.length) state.queue = state.queue.filter(obj => obj.index !== payload);
  },
  DIALOG: (state, payload) => {
    state.uploadDialog = payload;
  },
  UPLOAD_FAIL: (state, payload) => {
    state.queue.forEach(obj => {
      if (obj.index === payload.index) obj.error = payload.error;
    });
  },
  CHANGE_PROGRESS: (state, { index, progress }) => {
    state.queue.forEach(obj => {
      if (obj.index === index) obj.progress = progress;
    });
  },
};

const actions = {
  GET_COURSES({ commit }, query) {
    commit('LOADING', true, { root: true });
    api.get(`${endpoints.get}${query}`)
      .then((res) => {
        commit('COURSES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  GET_MORE_COURSES({ commit }, query) {
    commit('LOADING', true, { root: true });
    api.get(`${endpoints.get}${query}`)
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
      .then((res) => commit('COURSE', res.data))
      .catch(() => commit('ERROR', errors.get_by_id, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  POST_COURSE({ commit }, data) {
    commit('LOADING', true, { root: true });
    api.post(endpoints.post, data)
      .then((res) => {
        commit('MESSAGE', messages.post, { root: true });
        router.push({
          name: 'online-course',
          params: {
            courseid: res.data._id,
          },
        });
      })
      .catch(() => commit('ERROR', errors.post, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  PUT_COURSE({ state, commit }, { data, id }) {
    api.put(`${endpoints.get}/${id}`, data)
      .then((res) => {
        commit('COURSE', res.data);
        commit(
          'COURSES',
          state.courses.map(course => (course._id === id ? res.data : course))
        );
      })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },

  DELETE_COURSE({ commit }, courseId) {
    api.delete(`${endpoints.delete}/${courseId}`)
      .then(() => { })
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },

  GET_VIDEO({ commit }, id) {
    commit('LOADING', true, { root: true });
    api.get(`${endpoints.findvideo}/${id}`)
      .then((res) => commit('VIDEO', res.data))
      .catch(() => commit('ERROR', errors.get_video, { root: true }))
      .finally(() => commit('LOADING', false, { root: true }))
  },

  ADD_QUEUE({ commit }, arr) {
    commit('DIALOG', true);
    setTimeout(() => commit('QUEUE', arr), 2000);
  },

  ADD_LESSON({ commit }, payload) {
    api.post(`${endpoints.video}/${payload.id}`, payload.lesson, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        commit('CHANGE_PROGRESS', { index: payload.index, progress: percentCompleted });
      }
    })
      .then(() => commit('COMPLETE', payload.index))
      .catch(() => {
        commit('UPLOAD_FAIL', { index: payload.index, error: true });
        commit('ERROR', errors.addLesson, { root: true });
      })
  },

  PUT_VIDEO({ commit, dispatch }, { fd, id }) {
    api.put(`${endpoints.video}/${id}`, fd)
      .then(() => dispatch('GET_VIDEO', id))
      .catch(() => commit('ERROR', errors.get, { root: true }))
  },

  DELETE_VIDEO({ commit, dispatch }, { id, courseId }) {
    let resolve = null
    const promise = new Promise(res => resolve = res)
    api.delete(`${endpoints.video}/${id}`)
      .then(() => {
        dispatch('GET_COURSE', courseId)
        resolve(true)
      })
      .catch(() => {
        commit('ERROR', errors.delete, { root: true })
        resolve(false)
      })
    return promise
  },

  PUBLISH({ commit, dispatch }, { id, publish }) {
    const data = {
      isPublished: publish,
    };
    api.patch(`${endpoints.patch}/${id}`, data)
      .then(() => {
        commit('MESSAGE', publish ? messages.publish : messages.unpublish, { root: true });
        dispatch('GET_COURSE', id);
      })
      .catch(() => commit('ERROR', publish ? errors.publish : errors.unpublish, { root: true }))
  },

  ADD_PDF({ commit, dispatch }, { fd, lessonId }) {
    api.post(`${endpoints.pdf}/${lessonId}`, fd)
      .then(() => {
        // dispatch('GET_COURSES');
        // dispatch('GET_COURSE', currentCourseId);
        dispatch('GET_VIDEO', lessonId);
      })
      .catch(() => commit('ERROR', errors.addPdf, { root: true }))
  },

  REMOVE_PDF({ commit, dispatch }, { id, lessonId }) {
    api.delete(`${endpoints.pdf}/${id}`)
      .then(() => {
        // dispatch('GET_COURSES');
        // dispatch('GET_COURSE', currentCourseId);
        dispatch('GET_VIDEO', lessonId);
      })
      .catch(() => commit('ERROR', errors.delete, { root: true }))
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
