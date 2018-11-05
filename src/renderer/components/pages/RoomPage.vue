<template>
  <el-container class='container'>
    <el-aside class='aside'>
    </el-aside>
    <el-main>
      <div id="video-container">
        <div id="remote-videos"></div>
        <div>
          <video id="local-video" muted="true" autoplay playsinline class="loacl-video"></video>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import Peer from 'skyway-js'
  import { SKYWAY_API_KEY } from '../../config.js'
  
  export default {
    components: {
    },
    data () {
      return {
        peer: null,
        room: null,
        localStream: null,
        roomId: 'sample'
      }
    },
    computed: {
      ...mapGetters({
        userPeerId: 'userPeerId'
      })
    },
    mounted () {
      this.setupSkyWay()
      this.setupPeerCallback()
      this.setupLoaclStream()
      this.setupRoom()
    },
    methods: {
      setupSkyWay () {
        this.peer = new Peer({
          key: SKYWAY_API_KEY,
          debug: 3
        })
      },
      setupPeerCallback () {
        this.peer.on('open', () => {
          console.log('Success open')
        })
        this.peer.on('error', err => {
          console.log('Error skyway', err)
        })
      },
      setupLoaclStream () {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then(function (stream) {
            document.getElementById('local-video').srcObject = stream
            this.localStream = stream
          }).catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error)
          })
      },
      setupRoom () {
        this.room = this.peer.joinRoom(this.roomId, {mode: 'sfu', stream: this.localStream})
      },
      setupRoomCallback () {
        this.room.on('stream', stream => {
        })
        this.room.on('removeStream', stream => {
        })
        this.room.on('close', stream => {
        })
        this.room.on('peerLeave', peerId => {
        })
      }
    }
  }
</script>

<style>
  .container{
    height: 100%;
  }

  .aside{
    position: relative;
  }

  .el-main{
    background-color:gray;
  }

  .loacl-video{
    width: 300px;
    height: 300px;
    background-color: white;
  }

</style>

