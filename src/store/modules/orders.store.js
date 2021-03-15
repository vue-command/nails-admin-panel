// const { getData } = require('@/helpers').default

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
};
const actions = {
  async GET_ORDERS({ commit, rootState }, type) {
    const { error, data } = await (
      await fetch(`${process.env.VUE_APP_API_URL}/${endpoints.get}?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${rootState.users.token}`,
        },
      })
    ).json();
    if (!error) {
      if (type === 'online') commit('ONLINE_ORDERS', data);
      if (type === 'offline') commit('OFFLINE_ORDERS', data);
      if (type === 'commodity') commit('COMMODITY_ORDERS', data);
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
