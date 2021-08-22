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
  async GET_CATEGORIES({ commit }) {
    commit('LOADING', true);
    const res = await api.get(categoriesEndpoints.categories);
    if (res.statusText === 'OK') {
      commit('CATEGORIES', res.data);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('LOADING', false);
  },

  async CREATE_NEW_CATEGORY({ commit }, payload) {
    const res = await api.post(categoriesEndpoints.newCategory, payload);
    if (res.statusText === 'Created') {
      commit('ADD_CATEGORY', res.data);
      return res.data._id;
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async EDIT_CATEGORY({ commit }, payload) {
    const res = await api.put(`${categoriesEndpoints.put}/${payload.id}`, payload.name);
    if (res.statusText === 'OK') {
      commit('CATEGORIES', res.data);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_CATEGORY({ state, commit }, id) {
    const res = await api.delete(`${categoriesEndpoints.delete}/${id}`);
    if (res.statusText === 'OK') {
      const categories = state.categories.filter(elem => elem._id !== id);
      commit('CATEGORIES', categories);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async CREATE_NEW_SUBCATEGORY({ commit }, { name, id }) {
    const res = await api.post(`${categoriesEndpoints.newSubcategory}/${id}`, { name });
    if (res.statusText === 'Created') {
      commit('CATEGORIES', res.data);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_SUBCATEGORY({ commit }, { id }) {
    const res = await api.delete(`${categoriesEndpoints.subcategory}/${id}`);
    if (res.statusText === 'OK') {
      commit('CATEGORIES', res.data);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async CHANGE_SUBCATEGORY_NAME({ commit }, { id, name }) {
    const data = {
      name: name,
    };
    const res = await api.put(`${categoriesEndpoints.subcategory}/${id}`, data);
    if (res.statusText === 'OK') {
      commit('CATEGORIES', res.data);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
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
