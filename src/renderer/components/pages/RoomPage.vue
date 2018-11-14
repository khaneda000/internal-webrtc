<template>
  <el-container class='container'>
    <el-aside class='aside'>
      <ChatContainer />
    </el-aside>
    <el-main>
      <div id="video-container">
        <div class="room-id-header">
          <span class="room-id-header"> ルームID: {{ this.roomId }} / {{ this.memberCount }}人</span>
          <el-popover
            placement="top"
            width="160"
            v-model="visibleModal">
            <p>退出しますか？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visibleModal = false">しない</el-button>
              <el-button type="warning" size="mini" @click="exitRoom()">する</el-button>
            </div>
            <i class="el-icon-warning setting" slot="reference"/>
          </el-popover>
        </div>
        <div class="video-main-container">
          <MainVideoContainer :stream="mainStream"/>
        </div>
        <VideoListContainer :streams="streams" @click-video="clickListVideo"/>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="js">
  import { mapGetters, mapState } from 'vuex'
  import MainVideoContainer from '../molecules/MainVideoContainer'
  import VideoListContainer from '../molecules/VideoListContainer'
  import ChatContainer from '../molecules/ChatContainer'

  export default {
    components: {
      VideoListContainer,
      MainVideoContainer,
      ChatContainer
    },
    data () {
      return {
        visibleModal: false,
        localStream: null,
        mainStream: null,
        streams: [],
        skyway: this.$store.getters.skyway,
        memberCount: 0
      }
    },
    computed: {
      ...mapGetters({
        userPeerId: 'userPeerId'
      }),
      ...mapState({
        roomId: state => state.room.roomId
      })
    },
    mounted () {
      this.$store.dispatch('init')
      this.skyway.setupPeer()
      this.setupPeerCallback(this.skyway.peer)
    },
    methods: {
      clickListVideo (index, stream) {
        this.mainStream = stream
      },
      exitRoom () {
        this.clearSkyway()
        this.$router.go(-1)
      },
      clearSkyway () {
        this.localStream.stop()
        this.mainStream.stop()
        this.streams.forEach((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop()
          })
        })
        this.skyway.peer.disconnect()
        this.skyway.peer.destroy()
        this.skyway.peer = null
        this.skyway.room = null
        this.streams = []
      },
      setupPeerCallback (peer) {
        peer.on('open', () => {
          console.log('Success open', peer.id)
          this.setupLoaclStream()
        })
        peer.on('error', err => {
          console.log('Error skyway', err)
        })
      },
      setupLoaclStream () {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then((stream) => {
            if (!this.localStream) {
              stream.stop = function () {
                stream.getTracks().forEach((track) => {
                  track.stop()
                })
              }
              this.localStream = stream
              this.mainStream = stream
              console.log('add local stream')
              this.streams.push(stream)
              this.skyway.setupRoom(this.roomId, stream)
              this.setupRoomCallback(this.skyway.room)
            }
          }).catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error)
          })
      },
      setupRoomCallback (room) {
        console.log('setup room callback', room)
        room.on('stream', (stream) => {
          console.log('stream add', stream.peerId)
          this.streams.push(stream)
        })
        room.on('removeStream', stream => {
          console.log('stream remove!!!')
        })
        room.on('close', stream => {
          console.log('stream close!!!')
        })
        room.on('peerLeave', (peerId) => {
          console.log('current peerLeave!!!', this.streams)
          console.log('stream peerLeave!!!', peerId)
          this.streams = this.streams.filter(function (stream, index) {
            return stream.peerId !== peerId
          })
          console.log('current peerLeave!!!', this.streams)
        })
        room.on('peerJoin', peerId => {
          console.log('join new peer!!!', peerId)
        })
        room.once('log', logs => {
          for (let i = 0; i < logs.length; i++) {
            const log = JSON.parse(logs[i])
            console.log('log', log)
          }
        })
        room.on('data', message => {
          if (message.data instanceof ArrayBuffer) {
            console.log('message', message.data)
          } else {
            console.log('message', message.data)
            this.$store.dispatch('addChat',
              {
                user: message.src,
                time: Date(),
                message: message.data
              }
            )
          }
        })
      }
    }
  }
</script>

<style>
  .container{
    height: 100%;
    background-color:whitesmoke;
  }

  .aside{
    position: relative;
    background-color: white;
  }

  .loacl-video{
    width: 300px;
    height: 300px;
    background-color: white;
  }

  .video-main-container{
    text-align: center;
  }

  .video-list{
    height: 300px;
    width: 100%;
  }

  .room-id-header{
    text-align: center;
    color: #189F96;
    padding: 20px 0 10px 0;
  }

</style>

