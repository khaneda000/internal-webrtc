export default {
  namespace: 'room',
  state: {
    roomId: '',
    chats: [],
    useCamera: true,
    showSettingModal: false
  },
  mutations: {
    init (state) {
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
    },
    updateUseCamera (state, playload) {
      state.useCamera = playload.useCamera
    },
    openSettingModal (state) {
      state.showSettingModal = true
    },
    hideSettingModal (state) {
      state.showSettingModal = false
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
    },
    updateUseCamera (context, payload) {
      context.commit('updateUseCamera', payload)
    }
  }
}
