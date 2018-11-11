<template>
  <div>
    <video :id="videoId" muted="true" autoplay playsinline class="list-video"></video>
  </div>
</template>

<script>
  export default {
    name: 'skyway-video',
    props: {
      type: null,
      stream: null
    },
    computed: {
      videoId () {
        if (!this.type) {
          // listの場合
          return this.type + 'skyway-video-' + this.stream.peerId
        }
        return 'skyway-video-you'
      }
    },
    mounted () {
      this.updateSrc()
    },
    methods: {
      updateSrc () {
        console.log('update source', this.stream.peerId)
        document.getElementById(this.videoId).srcObject = this.stream
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  
  .list-video {
    width: 100%;
    display: block;
  }
</style>
