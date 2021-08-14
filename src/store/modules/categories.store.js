const { postData, putData, deleteData } = require('@/helpers').default;
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
    state.categories = payload;
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
    const { data, error } = await postData(categoriesEndpoints.newCategory, payload);
    if (!error) {
      commit('ADD_CATEGORY', data);
      return data._id;
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async EDIT_CATEGORY({ commit }, payload) {
    const { updated, error } = await putData(`${categoriesEndpoints.put}/${payload.id}`, payload.name);
    if (!error) {
      commit('CATEGORIES', updated);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_CATEGORY({ state, commit }, id) {
    const { error } = await deleteData(`${categoriesEndpoints.delete}/${id}`);
    if (!error) {
      const categories = state.categories.filter(elem => elem._id !== id);
      commit('CATEGORIES', categories);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async CREATE_NEW_SUBCATEGORY({ commit }, { name, id }) {
    const { updated, error } = await postData(`${categoriesEndpoints.newSubcategory}/${id}`, { name });
    if (!error) {
      commit('CATEGORIES', updated);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_SUBCATEGORY({ commit }, { id }) {
    const { updated, error } = await deleteData(`${categoriesEndpoints.subcategory}/${id}`);
    if (!error) {
      commit('CATEGORIES', updated);
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
    const { updated, error } = await putData(`${categoriesEndpoints.subcategory}/${id}`, data);
    if (!error) {
      commit('CATEGORIES', updated);
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
