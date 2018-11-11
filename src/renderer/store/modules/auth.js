
export default {
  state: {
    name: null,
    department: null
  },
  getters: {
    userPeerId: (state) => {
      return state.name + '/' + state.department
    }
  },
  mutations: {
    initUser (state) {
      state.name = null
      state.department = null
    },
    setUserInfo (state, payload) {
      state.name = payload.name
      state.department = payload.department
    }
  },
  actions: {
    initUser (context, payload) {
      context.commit('initUser')
    },
    registUserInfo (context, payload) {
      context.commit('setUserInfo', payload)
    }
  }
}
