import { api } from './../../helpers/api';
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;
const errors = require('@/config/errors').default.shop;
const messages = require('@/config/messages').default.shop;

const state = {
  commodities: [],
  commodity: null,
  total: 0,
  isShopLoading: false,
  isCommodityLoading: false,
  pageSize: 12,
};

const mutations = {
  COMMODITIES: (state, payload) => {
    state.commodities = payload;
  },
  TOTAL: (state, payload) => {
    state.total = payload;
  },
  COMMODITY: (state, payload) => {
    state.commodity = payload;
  },
  REMOVE_COMMODITY: (state, id) => {
    state.commodity = null;
    state.commodities = state.commodities.filter(elem => elem._id !== id);
  },
  ADD_COMMODITY: (state, payload) => {
    state.commodity = payload;
    state.commodities = [payload].concat(state.commodities);
  },
  REPLACE_COMMODITY: (state, payload) => {
    state.commodity = payload;
    state.commodities = state.commodities.map(commodity => (commodity._id === payload._id ? payload : commodity));
  },
  REMOVE_IMAGE: (state, payload) => {
    if (state.commodity && Array.isArray(state.commodity.images)) {
      state.commodity = { ...state.commodity, images: state.commodity.images.filter(el => el._id !== payload) };
    }
  },
  CLEAR_COMMODITY: state => {
    state.commodity = null;
  },
  SHOP_LOADING: (state, payload) => {
    state.isShopLoading = payload;
  },
  COMMODITY_LOADING: (state, payload) => {
    state.isCommodityLoading = payload;
  },
};

const actions = {
  async SEARCH_COMMODITIES({ commit }, { offset, published, search }) {
    const params = {
      query: search,
      // limit: state.pageSize,
      // offset,
      skip: offset,
      // page,
      // per_page: state.pageSize,
      // published: true,
      published,
    };
    const res = await api.get(commoditiesEndpoints.search, { params });
    if (res.statusText === 'OK') {
      commit('COMMODITIES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async GET_COMMODITIES({ commit, dispatch }, { id, offset, published, search }) {
    if (search) {
      dispatch('SEARCH_COMMODITIES', { offset, published, search });
      return;
    }
    commit('SHOP_LOADING', true);

    const params = {
      // limit: state.pageSize,
      // offset,
      skip: offset,
      // page,
      // per_page: state.pageSize,
      // published: true,
      published,
    };

    const res = await api.get(`${commoditiesEndpoints.subcommodities}/${id}`, { params });

    if (res.statusText === 'OK') {
      commit('COMMODITIES', res.data.data);
      commit('TOTAL', res.data.total);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('SHOP_LOADING', false);
  },

  async GET_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    const res = await api.get(`${commoditiesEndpoints.commodity}/${payload}`);
    if (res.statusText === 'OK') {
      commit('COMMODITY', res.data[0]);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
  },

  async CREATE_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    const res = await api.post(commoditiesEndpoints.newCommodity, payload);
    if (res.statusText === 'Created') {
      commit('ADD_COMMODITY', res.data);
    } else {
      commit('ERROR', Object.assign({}, errors.oops, { errorMessage: res.data.message }), {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
    return res.data?._id;
  },

  async UPDATE_COMMODITY({ commit }, { commodity, id }) {
    commit('COMMODITY_LOADING', true);
    const res = await api.put(`${commoditiesEndpoints.commodity}/${id}`, commodity);
    if (res.statusText === 'OK') {
      commit('REPLACE_COMMODITY', res.data);
      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
  },
  async PATCH_COMMODITY({ commit }, { commodity, id }) {
    commit('COMMODITY_LOADING', true);
    const res = await api.patch(`${commoditiesEndpoints.isPublished}/${id}`, commodity);
    if (res.statusText === 'OK') {
      commit('REPLACE_COMMODITY', res.data);
      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
  },

  async UPLOAD_IMAGES({ commit }, { data, id }) {
    const formData = new FormData();
    data.forEach(item => formData.append('files', item));
    const res = await api.post(`${commoditiesEndpoints.files}/${id}`, formData);
    if (res.statusText === 'Created') {
      commit('REPLACE_COMMODITY', res.data);

      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_IMAGE({ commit }, id) {
    const res = await api.delete(`${commoditiesEndpoints.file}/${id}`);
    if (res.statusText === 'OK') {
      commit('REMOVE_IMAGE', id);
      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_COMMODITY({ commit }, id) {
    const res = await api.delete(`${commoditiesEndpoints.commodity}/${id}`);
    if (res.statusText === 'OK') {
      commit('REMOVE_COMMODITY', id);
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
