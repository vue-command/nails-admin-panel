const { getData, postData, putData, patchData, deleteData } = require('@/helpers').default;
const commoditiesEndpoints = require('@/config/endpoints').default.commodities;
const errors = require('@/config/errors').default.shop;
const messages = require('@/config/messages').default.shop;

const state = {
  commodities: [],
  commodity: null,
  total: 0,
  isShopLoading: false,
  isCommodityLoading: false,
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
  REMOVE_COMMODITY: (state, { id }) => {
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
  async SEARCH_COMMODITIES({ commit }, { offset, filter, search }) {
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.search}?query=${search}&skip=${offset}&withHidden=${filter}`
    );
    if (!error) {
      commit('COMMODITIES', commodities);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },
  async GET_COMMODITIES({ commit, dispatch }, { id, offset, filter, search }) {
    if (search) {
      dispatch('SEARCH_COMMODITIES', { offset, filter, search });
      return;
    }
    commit('SHOP_LOADING', true);
    const { commodities, total, error } = await getData(
      `${commoditiesEndpoints.subcommodities}/${id}?withHidden=${filter}&skip=${offset}`
    );

    if (!error) {
      commit('COMMODITIES', commodities);
      commit('TOTAL', total);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('SHOP_LOADING', false);
  },

  async GET_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    const { commodity, error } = await getData(`${commoditiesEndpoints.commodity}/${payload}`);
    if (!error) {
      commit('COMMODITY', commodity[0]);
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
  },

  async CREATE_COMMODITY({ commit }, payload) {
    commit('COMMODITY_LOADING', true);
    const { data, error } = await postData(commoditiesEndpoints.newCommodity, payload);
    if (!error) {
      commit('ADD_COMMODITY', data);
    } else {
      commit('ERROR', Object.assign({}, errors.oops, { errorMessage: error }), {
        root: true,
      });
    }
    commit('COMMODITY_LOADING', false);
    return data?._id;
  },

  async UPDATE_COMMODITY({ commit }, { commodity, id }) {
    commit('COMMODITY_LOADING', true);
    const { data, error } = await putData(`${commoditiesEndpoints.commodity}/${id}`, commodity);
    if (!error) {
      commit('REPLACE_COMMODITY', data);
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
    const { data, error } = await patchData(`${commoditiesEndpoints.isPublished}/${id}`, commodity);
    if (!error) {
      commit('REPLACE_COMMODITY', data);
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
    const { updatedCommodity, error } = await postData(`${commoditiesEndpoints.files}/${id}`, formData);
    if (!error) {
      commit('REPLACE_COMMODITY', updatedCommodity);

      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_IMAGE({ commit }, id) {
    const { error } = await deleteData(`${commoditiesEndpoints.file}/${id}`);
    if (!error) {
      commit('REMOVE_IMAGE', id);
      commit('MESSAGE', messages.update, { root: true });
    } else {
      commit('ERROR', errors.oops, {
        root: true,
      });
    }
  },

  async DELETE_COMMODITY({ commit }, id) {
    const { error } = await deleteData(`${commoditiesEndpoints.commodity}/${id}`);
    if (!error) {
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
