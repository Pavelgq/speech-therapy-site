// import apiCall from 'utils/api'
// const axios = require('axios');

// const axiosInstance = axios.create({
//   baseURL: process.env.VUE_APP_API
// });

export const getters = () => ({
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
})

export const mutations = {
  AUTH_REQUEST: (state) => {
    state.status = 'loading'
  },
  AUTH_SUCCESS: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.token
    state.hasLoadedOnce = true
  },
  AUTH_ERROR: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  AUTH_LOGOUT: (state) => {
    state.token = ''
  },
}

export const actions = {
  async AUTH_REQUEST({ commit, dispatch }, user) {
    await commit('AUTH_REQUEST')
    const res = await this.$axios({
      url: 'user/login',
      data: user,
      method: 'POST',
    }).catch((err) => {
      commit('AUTH_ERROR', err)
      if (process.browser) {
        localStorage.removeItem('user-token')
      }
      return err
    })
    if (res.data.token) {
      localStorage.setItem('user-token', res.data.token)
      commit('AUTH_SUCCESS', res)
      dispatch('user/USER_REQUEST', null, { root: true })
    }
    return res
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve) => {
      commit('AUTH_LOGOUT')
      if (process.browser) {
        localStorage.removeItem('user-token')
      }
      resolve()
    })
  },
}

export const state = () => ({
  token: process.browser ? localStorage.getItem('user-token') : '',
  status: '',
  hasLoadedOnce: false,
})
