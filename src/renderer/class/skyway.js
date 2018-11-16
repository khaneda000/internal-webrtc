import Peer from 'skyway-js'

export default class SkyWay {
  static DEFAULT_ROOM_OPTION = {
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

  setupRoom (roomId, stream, audioBandwidth, videoBandwidth) {
    console.log('setup room')
    console.log('audio video', audioBandwidth, videoBandwidth)
    this.room = this.peer.joinRoom(roomId,
      {
        mode: 'sfu',
        stream: stream
      }, {
        audioBandwidth: 50,
        videoBandwidth: 200,
        // audioBandwidth: audioBandwidth || this.DEFAULT_ROOM_OPTION.audioBandwidth,
        // videoBandwidth: videoBandwidth || this.DEFAULT_ROOM_OPTION.videoBandwidth,
        videoCodec: 'H264',
        videoReceiveEnabled: true,
        audioReceiveEnabled: true
      })
  }
}
