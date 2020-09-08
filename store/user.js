import Vue from 'vue'
// import { AUTH_LOGOUT } from './index'

const USER_REQUEST = 'USER_REQUEST'
const USER_SUCCESS = 'USER_SUCCESS'
const USER_ERROR = 'USER_ERROR'

export const state = () => ({ status: '', profile: {} })

export const getters = () => ({
  getProfile: (state) => state.profile,
  isProfileLoaded: (state) => !!state.profile.name,
})

export const actions = () => ({
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST)
    // apiCall({ url: 'user/me' })
    //   .then((resp) => {
    //     commit(USER_SUCCESS, resp)
    //   })
    //   .catch(() => {
    //     commit(USER_ERROR)
    //     // if resp is unauthorized, logout, to
    //     dispatch(AUTH_LOGOUT)
    //   })
  },
})

export const mutations = () => ({
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  // [AUTH_LOGOUT]: (state) => {
  //   state.profile = {}
  // },
})
