const { getData } = require('@/helpers').default

const errors = require('@/config/errors').default.user
// const messages = require('@/config/messages').default.user

const endpoints = require('@/config/endpoints').default.user

const state = {
  user: null
}

const getters = {
}

const mutations = {
  USER: (state, payload) => {
    state.user = payload
  }
}
const actions = {
  async GET_USER ({ commit }, hash) {
    const response = await getData(`${endpoints.findByHash}/${hash}`)
    if (!response.error) {
      commit('USER', response.data)
    } else {
      commit('ERROR', errors.get, { root: true })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
