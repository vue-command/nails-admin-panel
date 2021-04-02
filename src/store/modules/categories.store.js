/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const { getData, postData, putData, deleteData, getFormData } = require('@/helpers').default;

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const errors = require('@/config/errors').default.shop;
const messages = require('@/config/messages').default.shop;

const state = {
  isPageLoading: true,
  categories: [],
  fullListOfCategories: [],
  activeCategory: null,
};

const mutations = {
  SHOP_CATEGORIES_ITEM: (state, categories) => {
    state.fullListOfCategories = categories.reduce((prev, curr) => {
      prev.push(curr);
      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        prev = prev.concat(curr.subcategories);
      }
      return prev;
    }, []);
    state.categories = categories;
  },

  ADD_NEW_CATEGORY: (state, payload) => {
    state.categories = state.categories.concat([payload]);
  },

  EDIT_CATEGORY: (state, payload) => {
    state.categories = state.categories.map(item => (item._id === payload._id ? Object.assign(item, payload) : item));
  },

  REMOVE_CATEGORY: (state, id) => {
    state.categories = state.categories.filter(elem => elem._id !== id);
  },

  ADD_NEW_SUBCATEGORY: (state, { response, id, name }) => {
    if (state.activeCategory._id === id) {
      const newSubcategory = response.category[0].subcategories.find(item => item.name === name);
      state.activeCategory.subcategories = state.activeCategory.subcategories.concat([newSubcategory]);
    }
  },

  REMOVE_SUBCATEGORY: (state, { id }) => {
    state.activeCategory.subcategories = state.activeCategory.subcategories.filter(elem => elem._id !== id);
  },

  UPDATE_SUBCATEGORY: (state, { response, id }) => {
    state.activeCategory.subcategories.find(item => item._id === id).name = response.subCategory.name;
  },
};

const actions = {
  async GET_SHOP_CATEGORIES({ commit }) {
    // state.isPageLoading = true;
    const res = await getData(categoriesEndpoints.categories);
    // if (!error) {
    //   commit('SHOP_CATEGORIES_ITEM', categories);
    // } else {
    //   commit('ERROR', errors.oops, {
    //     root: true,
    //   });
    // }
    // state.isPageLoading = false;
  },

  SET_CATEGORY({ state }, { categoryId }) {
    state.activeCategory = state.fullListOfCategories.find(cat => cat._id === categoryId);
  },

  async GET_CATEGORY({ commit }, { id, name }) {
    const response = await getData(`${categoriesEndpoints.category}/${id}`);
    if (!response.error) {
      commit('ADD_NEW_SUBCATEGORY', { response, id, name });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async GET_SUBCATEGORY({ commit }, { id, name }) {
    const response = await getData(`${categoriesEndpoints.subcategory}/${id}`);
    if (!response.error) {
      commit('UPDATE_SUBCATEGORY', { response, id });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async CREATE_NEW_CATEGORY({state, commit, dispatch }, payload) {
    const { data, error } = await postData(categoriesEndpoints.newCategory, payload);
    if (!error) {
      const categoryId = data._id;
      commit('ADD_NEW_CATEGORY', data);
      commit('SHOP_CATEGORIES_ITEM',state.categories)
      dispatch('SET_CATEGORY', { categoryId });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async EDIT_CATEGORY({ commit, dispatch }, payload) {
    const { updated, error } = await putData(`${categoriesEndpoints.put}/${payload.id}`, payload.name);
    if (!error) {
      commit('SHOP_CATEGORIES_ITEM', updated);
      dispatch('SET_CATEGORY', { categoryId: payload.id });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_CATEGORY({ state, commit, dispatch }, id) {
    const { error } = await deleteData(`${categoriesEndpoints.delete}/${id}`);
    if (!error) {
      const categories = state.categories.filter(elem => elem._id !== id);
      commit('SHOP_CATEGORIES_ITEM', categories);
      dispatch('SET_CATEGORY', { categoryId: categories[0]._id });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async CREATE_NEW_SUBCATEGORY({ commit, dispatch }, { name, id }) {
    const data = {
      name: name,
    };
    const { response, error } = await postData(`${categoriesEndpoints.newSubcategory}/${id}`, data);
    if (!error) {
      dispatch('GET_CATEGORY', { id, name });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_SUBCATEGORY({ commit }, { id }) {
    const { deleted, error } = await deleteData(`${categoriesEndpoints.subcategory}/${id}`);
    if (!error) {
      commit('REMOVE_SUBCATEGORY', {
        id,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async CHANGE_SUBCATEGORY_NAME({ commit, dispatch }, { id, name }) {
    const data = {
      name: name,
    };
    const { response, error } = await putData(`${categoriesEndpoints.subcategory}/${id}`, data);
    if (!error) {
      dispatch('GET_SUBCATEGORY', { id, name });
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
  actions,
  mutations,
};
