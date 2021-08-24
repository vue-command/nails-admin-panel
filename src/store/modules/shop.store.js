import { api } from './../../helpers/api';
import router from './../../router';

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
  SEARCH_COMMODITIES({ commit }, { offset, published, search }) {
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
    api.get(commoditiesEndpoints.search, { params })
      .then((res) => {
        commit('COMMODITIES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  GET_COMMODITIES({ commit, dispatch }, { id, offset, published, search }) {
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

    api.get(`${commoditiesEndpoints.subcommodities}/${id}`, { params })
      .then((res) => {
        commit('COMMODITIES', res.data.data);
        commit('TOTAL', res.data.total);
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
      .finally(() => commit('SHOP_LOADING', false))
  },

  GET_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    api.get(`${commoditiesEndpoints.commodity}/${payload}`)
      .then((res) => commit('COMMODITY', res.data[0]))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
      .finally(() => commit('COMMODITY_LOADING', false))
  },

  CREATE_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    api.post(commoditiesEndpoints.newCommodity, payload)
      .then((res) => {
        commit('ADD_COMMODITY', res.data)
        router.push({
          name: 'commodity-edit',
          params: {
            commodityId: res.data._id,
          },
        });
      })
      .catch((e) => {
        commit('ERROR', Object.assign({}, errors.oops, { errorMessage: e.response.data.message }), { root: true });
      })
      .finally(() => commit('COMMODITY_LOADING', false))
  },

  UPDATE_COMMODITY({ commit }, { commodity, id }) {
    commit('COMMODITY_LOADING', true);
    api.put(`${commoditiesEndpoints.commodity}/${id}`, commodity)
      .then((res) => {
        commit('REPLACE_COMMODITY', res.data);
        commit('MESSAGE', messages.update, { root: true });
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
      .finally(() => commit('COMMODITY_LOADING', false))
  },

  PATCH_COMMODITY({ commit }, { commodity, id }) {
    commit('COMMODITY_LOADING', true);
    api.patch(`${commoditiesEndpoints.isPublished}/${id}`, commodity)
      .then((res) => {
        commit('REPLACE_COMMODITY', res.data);
        commit('MESSAGE', messages.update, { root: true });
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
      .finally(() => commit('COMMODITY_LOADING', false))
  },

  UPLOAD_IMAGES({ commit }, { data, id }) {
    const formData = new FormData();
    data.forEach(item => formData.append('files', item));
    api.post(`${commoditiesEndpoints.files}/${id}`, formData)
      .then((res) => {
        commit('REPLACE_COMMODITY', res.data);
        commit('MESSAGE', messages.update, { root: true })
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  DELETE_IMAGE({ commit }, id) {
    api.delete(`${commoditiesEndpoints.file}/${id}`)
      .then(() => {
        commit('REMOVE_IMAGE', id);
        commit('MESSAGE', messages.update, { root: true });
      })
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },

  DELETE_COMMODITY({ commit }, id) {
    api.delete(`${commoditiesEndpoints.commodity}/${id}`)
      .then(() => commit('REMOVE_COMMODITY', id))
      .catch(() => commit('ERROR', errors.oops, { root: true }))
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
