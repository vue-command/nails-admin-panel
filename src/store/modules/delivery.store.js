import { api } from './../../helpers/api';

const endpoints = require('@/config/endpoints').default.delivery;
const errors = require('@/config/errors').default.online;
// const messages = require('@/config/messages').default.online;

const state = {
  prices: [],
};
const getters = {
  countries: state => state.prices.filter(item => item.type === 'international' && item.price === 0),
  pickup: state => state.prices.find(item => item.type === 'pickup'),
  express: state => state.prices.find(item => item.type === 'express'),
  standard: state => state.prices.find(item => item.type === 'standard'),
  internationals: state => state.prices.filter(item => item.type === 'international' && item.price !== 0),
};
const mutations = {
  PRICES: (state, payload) => {
    state.prices = payload ?? [];
  },
  CHANGE_PRICE: (state, { id, price }) => {
    state.prices = state.prices.map(item => (item._id === id ? Object.assign(item, { price }) : item));
  },
};

const actions = {
  async GET_COUNTRIES({ commit }) {
    commit('LOADING', true, { root: true });
    const params = { full: true }
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      commit('PRICES', res.data);
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },

  async UPDATE_COUNTRY_PRICE({ commit }, { id, price }) {
    commit('LOADING', true, { root: true });
    const res = await api.patch(`${endpoints.patch}/${id}`, { price });
    if (res.statusText === 'OK') {
      commit('CHANGE_PRICE', { id, price });
    } else {
      commit('ERROR', errors.get, { root: true });
    }
    commit('LOADING', false, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
