export default {
  namespace: 'room',
  state: {
    roomId: '',
    streams: [],
    chats: []
  },
  mutations: {
    init (state) {
      state.streams = []
      state.chats = []
    },
    setRoomId (state, payload) {
      state.roomId = payload.roomId
    },
    addChat (state, payload) {
      var chat = {
        user: payload.user,
        time: payload.time,
        message: payload.message
      }
      state.chats.push(chat)
    }
  },
  actions: {
    init (context) {
      context.commit('init')
    },
    updateEnterRoom (context, payload) {
      context.commit('setRoomId', payload)
    },
    addChat (context, payload) {
      context.commit('addChat', payload)
    }
  }
}
