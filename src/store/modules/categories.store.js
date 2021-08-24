import { api } from './../../helpers/api';

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const errors = require('@/config/errors').default.shop;
// const messages = require('@/config/messages').default.shop;

const state = {
  categories: [],
  loading: false,
};
const getters = {
  fullListOfCategories: state => {
    return state.categories.reduce((accum, curr) => {
      accum.push(curr);
      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        accum = accum.concat(curr.subcategories);
      }
      return accum;
    }, []);
  },
};
const mutations = {
  CATEGORIES: (state, payload) => {
    state.categories = payload ?? [];
  },

  ADD_CATEGORY: (state, payload) => {
    state.categories = state.categories.concat([payload]);
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

const actions = {
  GET_CATEGORIES({ commit }) {
    commit('LOADING', true);
    api.get(categoriesEndpoints.categories)
      .then((res) => commit('CATEGORIES', res.data))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
      .finally(() => commit('LOADING', false))
  },

  CREATE_NEW_CATEGORY({ commit }, payload) {
    let resolve = null
    const promise = new Promise()
    api.post(categoriesEndpoints.newCategory, payload)
      .then((res) => {
        commit('ADD_CATEGORY', res.data);
        resolve(res.data._id)
      })
      .catch(() => {
        commit('ERROR', errors.oops, { root: true })
        resolve(false)
      })
    return promise
  },

  EDIT_CATEGORY({ commit }, payload) {
    api.put(`${categoriesEndpoints.put}/${payload.id}`, payload.name)
      .then((res) => commit('CATEGORIES', res.data))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  DELETE_CATEGORY({ state, commit }, id) {
    api.delete(`${categoriesEndpoints.delete}/${id}`)
      .then(() => {
        const categories = state.categories.filter(elem => elem._id !== id);
        commit('CATEGORIES', categories);
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  CREATE_NEW_SUBCATEGORY({ commit }, { name, id }) {
    api.post(`${categoriesEndpoints.newSubcategory}/${id}`, { name })
      .then((res) => commit('CATEGORIES', res.data))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  DELETE_SUBCATEGORY({ commit }, { id }) {
    api.delete(`${categoriesEndpoints.subcategory}/${id}`)
      .then((res) => commit('CATEGORIES', res.data))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  CHANGE_SUBCATEGORY_NAME({ commit }, { id, name }) {
    const data = {
      name: name,
    };
    api.put(`${categoriesEndpoints.subcategory}/${id}`, data)
      .then((res) => commit('CATEGORIES', res.data))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
