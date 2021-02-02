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
  activeSubcategory: null,
};

const mutations = {
  SHOP_CATEGORIES: (state, { categories }) => {
    state.fullListOfCategories = categories.reduce((prev, curr) => {
      prev.push(curr);
      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        prev = prev.concat(curr.subcategories);
      }
      return prev;
    }, []);
    state.categories = categories;
  },
};

const actions = {
  async GET_SHOP_CATEGORIES({ commit }) {
    state.isPageLoading = true;
    const { categories, error } = await getData(categoriesEndpoints.categories);
    if (!error) {
      commit('SHOP_CATEGORIES', {
        categories,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    state.isPageLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
