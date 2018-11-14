import Peer from 'skyway-js'

export default class SkyWay {
  static ROOM_OPTION = {
    audioBandwidth: 50,
    videoBandwidth: 250,
    videoCodec: 'H264',
    videoReceiveEnabled: true,
    audioReceiveEnabled: true
  }

  constructor (apikey) {
    this.apikey = apikey
    this.peer = null
    this.room = null
  }

  setupPeer () {
    this.peer = new Peer({
      key: this.apikey,
      debug: 2
    })
  }

  setupRoom (roomId, stream) {
    this.room = this.peer.joinRoom(roomId,
      {
        mode: 'sfu',
        stream: stream
      }, this.ROOM_OPTION)
  }
}
