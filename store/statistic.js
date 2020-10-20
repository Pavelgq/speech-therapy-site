import Vue from 'vue'

export const state = () => ({ status: '', lessons: {} })

export const getters = {
  getLessons: (state) => state.lessons,
  isProfileLoaded: (state) => !!state.profile.name,
}

export const actions = {
  async LESSON_REQUEST({ commit, dispatch }) {
    await commit('LESSON_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: 'lesson/my',
      method: 'GET',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('LESSON_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('LESSON_SUCCESS', res.data)
  },
}

export const mutations = {
  LESSON_REQUEST: (state) => {
    state.status = 'loading'
  },
  LESSON_SUCCESS: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'lessons', resp)
  },
  LESSON_ERROR: (state) => {
    state.status = 'error'
  },
  AUTH_LOGOUT: (state) => {
    state.lessons = {}
  },
}
