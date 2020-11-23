import Vue from 'vue'

export const state = () => ({ status: '', profile: {} })

export const getters = {
  getProfile: (state) => state.profile,
  isProfileLoaded: (state) => !!state.profile.name,
}

export const actions = {
  async USER_REQUEST({ commit, dispatch }) {
    await commit('USER_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: 'user/custom',
      method: 'GET',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('USER_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('USER_SUCCESS', res.data)
  },
  async USER_UPDATE({ commit, dispatch }, newData) {
    await commit('USER_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: `user/change-data`,
      method: 'post',
      data: newData,
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('USER_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('USER_SUCCESS', res.data)
  },
}

export const mutations = {
  USER_REQUEST: (state) => {
    state.status = 'loading'
  },
  USER_SUCCESS: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  USER_ERROR: (state) => {
    state.status = 'error'
  },
  AUTH_LOGOUT: (state) => {
    state.profile = {}
  },
}
