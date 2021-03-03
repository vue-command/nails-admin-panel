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
  queue: [],
  uploadDialog: false,
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
  async GET_VIDEO({ commit }, id) {
    commit('LOADING', true, { root: true });
    const { video, error } = await getData(`${endpoints.findvideo}/${id}`);
    if (!error) {
      commit('VIDEO', video);
    } else {
      commit('ERROR', errors.get_video, { root: true });
    }
    commit('LOADING', false, { root: true });
  },
  async ADD_QUEUE({ commit }, arr) {
    commit('DIALOG', true);
    setTimeout(() => commit('QUEUE', arr), 2000);
  },
  async ADD_LESSON({ commit }, payload) {
    const request = new XMLHttpRequest();
    request.open('POST', `${process.env.VUE_APP_API_URL}/${endpoints.video}/${payload.id}`);
    request.upload.addEventListener('progress', function (e) {
      commit('CHANGE_PROGRESS', { index: payload.index, progress: (e.loaded / e.total) * 100 });
    });
    request.addEventListener('load', function () {
      if (request.status === 200) {
        commit('COMPLETE', payload.index);
      } else {
        commit('UPLOAD_FAIL', { index: payload.index, error: true });
        commit('ERROR', errors.addLesson, { root: true })
      }
    });
    request.send(payload.lesson);
  },
  async PUT_VIDEO({ commit, dispatch }, { fd, id }) {
    const { error } = await putData(`${endpoints.video}/${id}`, fd);
    if (!error) {
      dispatch('GET_VIDEO', id);
    } else {
      commit('ERROR', errors.get, { root: true })
    }
  },
  async DELETE_VIDEO({ commit, dispatch }, { id, courseId }) {
    const { error } = await deleteData(`${endpoints.video}/${id}`);
    if (!error) {
      dispatch('GET_COURSE', courseId);
    }else {
      commit('ERROR', errors.delete, { root: true })
    }
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
  async ADD_PDF({ commit, dispatch }, { fd, lessonId }) {
    const { error } = await postData(`${endpoints.pdf}/${lessonId}`, fd);
    if (!error) {
      // dispatch('GET_COURSES');
      // dispatch('GET_COURSE', currentCourseId);
      dispatch('GET_VIDEO', lessonId);
    }else {
      commit('ERROR', errors.addPdf, { root: true })
    }
  },
  async REMOVE_PDF({ commit, dispatch }, { id, lessonId }) {
    const { error } = await deleteData(`${endpoints.pdf}/${id}`);
    if (!error) {
      // dispatch('GET_COURSES');
      // dispatch('GET_COURSE', currentCourseId);
      dispatch('GET_VIDEO', lessonId);
    } else {
      commit('ERROR', errors.delete, { root: true })
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
