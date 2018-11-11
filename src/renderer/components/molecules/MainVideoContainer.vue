<template>
<el-row class="el-row-main-video">
    <el-card :body-style="{ padding: '5px 5px 0px 5px' }">
      <div >
        <SkyWayVideo 
          :type="displaySkywayVideoType"
          :stream="stream" 
          ref="mainSkywayVideo" />
        <div style="padding: 7px;font-size:0.8em;">
          <span>{{ getDisplayName(stream) }}</span>
        </div>
      </div>
    </el-card>
</el-row>

</template>

<script>
  import SkyWayVideo from '../atoms/SkyWayVideo'

  export default {
    name: 'video-list-container',
    props: {
      stream: null
    },
    components: {
      SkyWayVideo
    },
    updated () {
      console.log('update main video')
      this.$refs.mainSkywayVideo.updateSrc()
    },
    methods: {
      getDisplayName (stream) {
        if (!stream.peerId) {
          return 'You'
        }
        return stream.peerId
      }
    },
    data () {
      return {
        focusIndex: 0,
        displaySkywayVideoType: 'main'
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .el-row-main-video{
    padding: 5px;
    width: 400px;
    text-align: center;
    margin: auto;
  }
  .main-video {
    width: 80%;
  }

  .active{
    background-color: #E6A23C !important;
    color: white !important;
  }
</style>
