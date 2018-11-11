<template>
  <el-row class="video-list-row">
    <el-col :span="5" v-for="(stream, index) in streams" :key="index" style="margin:5px;" class="video-col">
      <el-card :body-style="{ padding: '5px 5px 0px 5px' }" shadow='hover' :class="cardClass(index)">
        <div @click="focusVideo(index)">
          <SkyWayVideo :stream="stream"/>
          <div style="padding: 7px;font-size:0.8em;">
            <i v-if="getDisplayName(stream) == 'You'" class="el-icon-setting"></i>
            <span >{{ getDisplayName(stream) }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import SkyWayVideo from '../atoms/SkyWayVideo'

  export default {
    name: 'video-list-container',
    props: {
      streams: null
    },
    created: {
    },
    components: {
      SkyWayVideo
    },
    methods: {
      focusVideo (index) {
        this.focusIndex = index
        this.$emit('click-video', index, this.streams[index])
      },
      cardClass (index) {
        return (index === this.focusIndex) ? 'active' : ''
      },
      getDisplayName (stream) {
        if (!stream.peerId) {
          return 'You'
        }
        return stream.peerId
      }
    },
    data () {
      return {
        focusIndex: 0
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  
  .video-list-row{
    padding:5px;
    height:200px;
    overflow-x: auto;
    white-space: nowrap;
  }
  .video-col{
    display: inline-block;
    float: none !important;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .active{
    background-color: #E6A23C !important;
    color: white !important;
  }
</style>
