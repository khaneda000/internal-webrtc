
export default {
  state: {
    name: null,
    department: null
  },
  getters: {
    userPeerId: (state) => {
      return state.name + '-' + state.department
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.name = payload.name
      state.department = payload.department
    }
  },
  actions: {
    registUserInfo (context, payload) {
      context.commit('setUserInfo', payload)
    }
  }
}
