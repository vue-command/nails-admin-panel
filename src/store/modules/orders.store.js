import { api } from './../../helpers/api';

// const errors = require('@/config/errors').default.orders;
// const messages = require('@/config/messages').default.orders

const endpoints = require('@/config/endpoints').default.orders;

const state = {
  onlineOrders: [],
  offlineOrders: [],
  commodityOrders: [],
};

const getters = {};

const mutations = {
  ONLINE_ORDERS: (state, payload) => {
    state.onlineOrders = payload;
  },
  OFFLINE_ORDERS: (state, payload) => {
    state.offlineOrders = payload;
  },
  COMMODITY_ORDERS: (state, payload) => {
    state.commodityOrders = payload;
  },
  PATCH_COMMODITY_ORDER: (state, { id, object }) => {
    state.commodityOrders = state.commodityOrders.map(item => (item._id === id ? Object.assign(item, object) : item));
  },
};
const actions = {
  async GET_ORDERS({ commit }, type) {
    const params = { type };
    const res = await api.get(endpoints.get, { params });
    if (res.statusText === 'OK') {
      if (type === 'online') commit('ONLINE_ORDERS', res.data);
      if (type === 'offline') commit('OFFLINE_ORDERS', res.data);
      if (type === 'commodity') commit('COMMODITY_ORDERS', res.data);
    }
  },
  async PUT_COMMODITY_ORDER({ commit }, { id, object }) {
    const res = await api.path(endpoints.patch, object);
    if (res.statusText === 'OK') {
      commit('PATCH_COMMODITY_ORDER', { id, object });
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
