<template>
  <el-container class='container'>
    <el-aside class='aside'>
      <ChatContainer />
    </el-aside>
    <el-main>
      <div id="video-container">
        <div class="room-id-header">
          <span class="room-id-header"> ルームID: {{ this.roomId }}</span>
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
        <!-- <video id="local-video" muted="true" autoplay playsinline class="loacl-video"></video> -->
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
  // import Peer from 'skyway-js'
  // import { SKYWAY_API_KEY } from '../../config.js'
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
        skyway: this.$store.getters.skyway
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
        this.skyway.peer.destroy()
        this.$router.go(-1)
      },
      setupPeerCallback (peer) {
        var self = this
        peer.on('open', () => {
          console.log('Success open', peer.id)
          self.setupLoaclStream()
        })
        peer.on('error', err => {
          console.log('Error skyway', err)
        })
      },
      setupLoaclStream () {
        var self = this
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then(function (stream) {
            if (!self.localStream) {
              self.localStream = stream
              self.mainStream = stream
              console.log('add local stream')
              self.streams.push(stream)
              self.skyway.setupRoom(self.roomId, stream)
              self.setupRoomCallback(self.skyway.room)
            }
          }).catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error)
          })
      },
      setupRoomCallback (room) {
        console.log('setup room callback', room)
        var self = this
        room.on('stream', stream => {
          console.log('stream add', stream.peerId)
          self.streams.push(stream)
        })
        room.on('removeStream', stream => {
          console.log('stream remove!!!')
        })
        room.on('close', stream => {
          console.log('stream close!!!')
        })
        room.on('peerLeave', peerId => {
          console.log('current peerLeave!!!', self.streams)
          console.log('stream peerLeave!!!', peerId)
          self.streams = self.streams.filter(function (stream, index) {
            return stream.peerId !== peerId
          })
          console.log('current peerLeave!!!', self.streams)
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

