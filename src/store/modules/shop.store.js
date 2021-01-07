/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const { getData, postData, putData, deleteData, getFormData } = require('@/helpers').default;

const categoriesEndpoints = require('@/config/endpoints').default.categories;
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;
const errors = require('@/config/errors').default.shop;
const messages = require('@/config/messages').default.online;

const state = {
  isShopLoading: true,
  categories: [],
  fullListOfCategories: [],
  commodities: [],
  selectedSectionName: '',
  commodity: null,
  activeCategory: null,
  activeSubcategory: null,
  skip: 0,
  totalCommodities: 0,
  searchParams: '',
  filterShow: 'all',
};

// TODO: REMOVE
const getters = {
  categoriesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodities`,
  commodityEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodity`,
  searchEndpoint: (state, getters, rootState) => `${rootState.host}/shop/search`,
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
  SHOP_COMMODITIES: (state, { commodities, total }) => {
    state.commodities = commodities;
    state.skip = state.commodities.length;
    state.totalCommodities = total;
  },
  SHOP_COMMODITY: (state, { commodities }) => {
    state.commodity = commodities[0];
  },
  CLEAR_COMMODITY: state => {
    state.commodity = null;
  },
  CLEAR_COMMODITIES: state => {
    state.commodities = [];
  },
  ADD_NEW_COMMODITY: (state, { commodity }) => {
    state.commodities = [commodity, ...state.commodities];
    state.commodity = [commodity, ...state.commodities];
  },
  REPLACE_COMMODITY: (state, { commodity }) => {
    const index = state.commodities.indexOf(el => el._id === commodity._id);
    state.commodities[index] = commodity;
  },
  LOADING: (state, payload) => {
    state.isShopLoading = payload;
  },
};

const actions = {
  async STORE_INIT({ state, dispatch }) {
    await dispatch('GET_SHOP_CATEGORIES');
    const categoryId = state.categories[0] && state.categories[0]._id;
    if (categoryId) {
      await dispatch('SET_CATEGORY', { categoryId });
    }
  },
  async GET_SHOP_CATEGORIES({ state, commit }) {
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
    return state.categories;
  },
  async SEARCH_COMMODITIES({ state, getters, commit }, { search, skip }) {
    const { commodities, total, error } = await getData(categoriesEndpoints.categories);
    if (!error) {
      commit('SHOP_COMMODITIES', { commodities, total });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    return state.comodities;
  },
  async GET_SHOP_COMMODITIES({ state, commit }, { categoryId }) {
    commit('LOADING', true);
    state.skip = 0;
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.commodities}/${categoryId}?withHidden=${state.filterShow}&skip=${state.skip}`
    );
    if (!error) {
      commit('SHOP_COMMODITIES', {
        commodities,
        total,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('LOADING', false);
  },
  async GET_MORE_SHOP_COMMODITIES({ state, commit }) {
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.commodities}/${state.activeCategory._id}?withHidden=${state.filterShow}&skip=${state.skip}`
    );
    if (!error) {
      commit('SHOP_COMMODITIES', {
        commodities: [...state.commodities, commodities],
        total,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async GET_COMMODITY({ getters, commit }, { commodityId }) {
    const { commodities, error } = await getData(`${commoditiesEndpoints.commodity}/${commodityId}`);
    if (!error) {
      commit('SHOP_COMMODITY', {
        commodities,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    const response = await (await fetch(`${getters.commodityEndpoint}/${commodityId}`)).json();
  },
  async CREATE_COMMODITY({ commit }, { data }) {
    const formData = getFormData(data);
    const { commodity, error } = await postData(commoditiesEndpoints.newCommodity, formData);
    if (!error) {
      commit('ADD_NEW_COMMODITY', {
        commodity,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async UPDATE_COMMODITY({ state, getters, commit }, { data, id }) {
    const formData = getFormData(data);
    const { commodity, error } = await putData(`${commoditiesEndpoints.newCommodity}/${id}`, formData);
    if (!error) {
      commit('REPLACE_COMMODITY', {
        commodity,
      });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async UPLOAD_IMAGES({ state, getters, commit }, { data, id }) {
    const formData = new FormData();
    [...data].map(item => formData.append('files', item));
    try {
      const response = await fetch(`https://nails-australia-staging.herokuapp.com/shop/commodity/files/${id}`, {
        method: 'POST',
        body: formData,
      });
      const { updatedCommodity, error } = await response.json();
      if (updatedCommodity) {
        this.$notify({
          group: 'foo',
          title: 'Images uploaded',
        });
      }
      if (error) {
        this.$notify({
          group: 'foo',
          title: 'Error',
          type: 'error',
          text: error,
        });
      }
      return updatedCommodity;
    } catch (error) {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong',
      });
      return null;
    }
  },
  async DELETE_IMAGE({ state, getters, commit }, { id }) {
    try {
      const response = await fetch(`https://nails-australia-staging.herokuapp.com/shop/file/${id}`, {
        method: 'DELETE',
      });
      const { deleted, error } = await response.json();
      if (deleted) {
        this.$notify({
          group: 'foo',
          title: 'Image deleted',
        });
      }
      if (error) {
        this.$notify({
          group: 'foo',
          title: 'Error',
          type: 'error',
          text: error,
        });
      }
      return deleted;
    } catch (error) {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong',
      });
      return null;
    }
  },
  async DELETE_COMMODITY({ state, getters, commit }, { id }) {
    try {
      const response = await fetch(`https://nails-australia-staging.herokuapp.com/shop/commodity/${id}`, {
        method: 'DELETE',
      });

      const { deleted, error } = await response.json();
      if (deleted) {
        this.$notify({
          group: 'foo',
          title: 'Commodity deleted',
        });
      }
      if (error) {
        this.$notify({
          group: 'foo',
          title: 'Error',
          type: 'error',
          text: error,
        });
      }
      return deleted;
    } catch (error) {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong',
      });
      return null;
    }
  },

  SET_CATEGORY({ state, dispatch }, { categoryId }) {
    state.activeCategory = state.fullListOfCategories.find(cat => cat._id === categoryId);
    state.activeSubcategory = { ...state.activeCategory };
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId,
    });
  },
  SET_SUBCATEGORY({ state, dispatch }, { categoryId }) {
    state.activeSubcategory = state.fullListOfCategories.find(cat => cat._id === categoryId);
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId,
    });
  },
  SET_FILTER_SHOW({ state, dispatch }, { value }) {
    state.filterShow = value;
    console.log(state.filterShow);
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId: state.activeCategory._id,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
