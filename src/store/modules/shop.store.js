/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  categories: null,
  commodities: [],
  selectedSectionName: '',
  totalCommodities: 0,
  commodity: null,
  activeCategory: null,
  fullListOfCategories: [],
};

const getters = {
  categoriesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/categories`,
  commoditiesEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodities`,
  commodityEndpoint: (state, getters, rootState) => `${rootState.host}/shop/commodity`,
  searchEndpoint: (state, getters, rootState) => `${rootState.host}/shop/search`,
};

const mutations = {
  SHOP_CATEGORIES: (state, payload) => {
    state.fullListOfCategories = payload.reduce((prev, curr) => {
      prev.push(curr);
      if (Array.isArray(curr.subcategories) && curr.subcategories.length) {
        prev = prev.concat(curr.subcategories);
      }
      return prev;
    }, []);
    state.categories = payload;
  },
  SHOP_COMMODITIES: (state, payload) => {
    state.commodities = payload.commodities;
    state.totalCommodities = payload.total;
  },
  SHOP_COMMODITY: (state, payload) => {
    state.commodity = payload.commodity[0];
  },
  CLEAR_COMMODITY: (state) => {
    state.commodity = null;
  },
  CLEAR_COMMODITIES: (state) => {
    state.commodities = [];
  },
  SET_ACTIVE_CATEGORY: (state, payload) => {
    const fullName = payload.parentName
      ? `${payload.parentName} > ${payload.name}`
      : `${payload.name} > View all`;
    state.activeCategory = { ...payload, fullName };
  },
};

const actions = {
  async GET_SHOP_CATEGORIES({ state, getters, commit }) {
    const response = (
      await (await fetch(`${getters.categoriesEndpoint}`)).json()
    ).categories;
    commit('SHOP_CATEGORIES', response);
    return state.categories;
  },
  async SEARCH_COMMODITIES({ state, getters, commit }, { search, skip }) {
    const response = await (
      await fetch(`${getters.searchEndpoint}/?query=${search}&skip=${skip}`)
    ).json();
    commit('SHOP_COMMODITIES', response);
    return state.comodities;
  },
  async GET_SHOP_COMMODITIES({ state, getters, commit }, { categoryId, skip }) {
    const response = await (
      await fetch(`${getters.commoditiesEndpoint}/${categoryId}?skip=${skip}`)
    ).json();
    commit('SHOP_COMMODITIES', response);
    return state.comodities;
  },
  async GET_COMMODITY({ state, getters, commit }, { commodityId }) {
    const response = await (
      await fetch(`${getters.commodityEndpoint}/${commodityId}`)
    ).json();
    commit('SHOP_COMMODITY', response);
    return state.commodity;
  },
  SET_NEW_CATEGORY({
    state, getters, commit, dispatch,
  }, { category }) {
    commit('SET_ACTIVE_CATEGORY', category);
    dispatch('GET_SHOP_COMMODITIES', {
      categoryId: category._id,
      skip: 0,
    });
    return state.commodity;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
