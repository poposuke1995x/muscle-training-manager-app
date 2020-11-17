export const state = () => ({
  token: "",
  userId: 0
})

export const getters = {
  getToken: state => {
    return state.token
  },
  getUserId: state => {
    return state.userId
  }
}

export const actions = {
  async setToken({commit}, token) {
    await commit('setToken', token)
  },
  async setUserId({commit}, userId) {
    await commit('setUserId', userId)
  }
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserId(state, userId) {
    state.userId = userId
  }


}
