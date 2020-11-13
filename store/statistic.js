import Vue from 'vue'

export const state = () => ({
  statusLessons: '',
  lessons: {},
  currentLessons: {},
})

export const getters = {
  getLessons: (state) => state.lessons,
  getCurrentLessons: (state) => state.currentLessons,
  isLessonsLoaded: (state) => !!state.lessons,
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
  async LESSON_USER_REQUEST({ commit, dispatch }, id) {
    await commit('LESSON_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: `lesson/${id}`,
      method: 'get',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('LESSON_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('LESSON_DATA_SUCCESS', res.data)
  },
  async LESSON_ADD({ commit, dispatch }, lesson) {
    await commit('LESSON_REQUEST')
    const token = localStorage.getItem('user-token')
    const res = await this.$axios({
      url: 'lesson/save',
      data: lesson,
      method: 'post',
      headers: { Authorization: `${token}` },
    }).catch(() => {
      commit('LESSON_ERROR')
      dispatch('auth/AUTH_LOGOUT', null, { root: true })
    })
    commit('LESSON_ADD', res.data)
  },
}

export const mutations = {
  LESSON_REQUEST: (state) => {
    state.statusLessons = 'loading'
  },
  LESSON_SUCCESS: (state, resp) => {
    state.statusLessons = 'success'
    Vue.set(state, 'lessons', resp)
  },
  LESSON_ADD: (state, resp) => {
    state.statusLessons = 'succes'
    console.log(resp)
  },
  LESSON_DATA_SUCCESS: (state, resp) => {
    state.statusLessons = 'success'
    Vue.set(state, 'currentLessons', resp)
  },
  LESSON_ERROR: (state) => {
    state.statusLessons = 'error'
  },
  AUTH_LOGOUT: (state) => {
    state.lessons = {}
  },
}
