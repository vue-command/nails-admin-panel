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
  PATCH_COMMODITY_ORDER: (state, { id, orderPatch }) => {
    state.commodityOrders = state.commodityOrders.map(item => (item._id === id ? Object.assign(item, orderPatch) : item));
  },
};
const actions = {
  GET_ORDERS({ commit }, type) {
    api.get(`${endpoints.get}/${type}`)
      .then((res) => {
        if (type === 'online') commit('ONLINE_ORDERS', res.data.data);
        if (type === 'offline') commit('OFFLINE_ORDERS', res.data.data);
        if (type === 'commodity') commit('COMMODITY_ORDERS', res.data.data);
      })
      .catch(() => { })
  },
  PATCH_COMMODITY_ORDER({ commit }, { id, orderPatch }) {
    api.patch(`${endpoints.patch}/${id}`, orderPatch)
      .then(() => commit('PATCH_COMMODITY_ORDER', { id, orderPatch }))
      .catch(() => { })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
