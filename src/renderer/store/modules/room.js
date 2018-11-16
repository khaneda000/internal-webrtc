import Define from '../../define'

export default {
  namespace: 'room',
  state: {
    roomId: '',
    chats: [],
    showSettingModal: false,
    useCamera: true,
    videoQuality: Define.VIDEO_QUAITY.AUTO
  },
  getters: {
    videoBandWidth: state => {
      switch (state.videoQuality) {
        case Define.VIDEO_QUAITY.LOW: return 100
        case Define.VIDEO_QUAITY.HIGH: return 250
        default: return 200
      }
    },
    audioBandWidth: state => {
      switch (state.videoQuality) {
        case Define.VIDEO_QUAITY.LOW: return 50
        case Define.VIDEO_QUAITY.HIGH: return 150
        default: return 100
      }
    }
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
    updateSetting (state, playload) {
      state.useCamera = playload.useCamera
      state.videoQuality = playload.videoQuality
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
