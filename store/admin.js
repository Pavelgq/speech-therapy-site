import Vue from 'vue'

export const state = () => ({ status: '', message: {}, usersList: {} })

export const getters = {
  getMessage: (state) => state.profile,
  getUsers: (state) => state.usersList,
  isActionComplite: (state) => !!state.message, // тут должно быть false если ошибка
}

export const actions = {
  async USER_ADD({ commit, dispatch }, newUser) {
    await commit('ADMIN_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: 'user/auth',
      data: newUser,
      method: 'POST',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('ADMIN_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('ADMIN_ADD_SUCCESS', res.data)
  },
  async USER_ALL({ commit, dispatch }) {
    await commit('ADMIN_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: 'user/all',
      method: 'GET',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('ADMIN_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('ADMIN_ALL_SUCCESS', res.data)
  },
}

export const mutations = {
  ADMIN_REQUEST: (state) => {
    state.status = 'loading'
  },
  ADMIN_ADD_SUCCESS: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'message', resp)
  },
  ADMIN_ALL_SUCCESS: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'usersList', resp)
  },
  ADMIN_ERROR: (state) => {
    state.status = 'error'
  },
  AUTH_LOGOUT: (state) => {
    state.message = {}
  },
}
