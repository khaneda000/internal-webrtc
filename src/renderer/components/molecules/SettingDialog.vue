<template>
  <el-dialog title="設定" 
  width="300px"
  :showClose="false"
  @open="open"
  :visible.sync="visible">
    <div class="video-quality-setting">
      <span class="demonstration">映像の質 / </span>
      <span>{{ getVideoQualitySettingString() }}</span>
      <el-slider
        v-model="selected.videoQuality"
        :max="2"
        :step="1"
        show-stops>
      </el-slider>
    </div>
    <div class="camera-setting">
      <div class="demonstration">
        <span >カメラの利用 / </span>
        <span>{{ getUseCameraString() }}</span>
      </div>
      <el-switch v-model="selected.useCamera"></el-switch>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideSettingModal()">閉じる</el-button>
      <el-button 
      type="info" 
      @click="update()" 
      :disabled="this.selected.useCamera == this.savedUseCamera && this.selected.videoQuality == this.savedVideoQuality"
      >更新</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    mapState, mapMutations
  } from 'vuex'
  import Define from '../../define.js'

  export default {
    name: 'setting-dialog',
    components: {
    },
    methods: {
      ...mapMutations({
        updateSetting: 'updateSetting',
        hideSettingModal: 'hideSettingModal'
      }),
      open () {
        this.selected.useCamera = this.savedUseCamera
        this.selected.videoQuality = this.savedVideoQuality
      },
      update () {
        this.updateSetting(
          {
            useCamera: this.selected.useCamera,
            videoQuality: this.selected.videoQuality
          }
        )
        this.hideSettingModal()
      },
      changeSlider () {

      },
      getVideoQualitySettingString () {
        switch (this.selected.videoQuality) {
          case Define.VIDEO_QUAITY.AUTO: return '自動'
          case Define.VIDEO_QUAITY.LOW: return '低'
          case Define.VIDEO_QUAITY.HIGH: return '高'
        }
        return '自動'
      },
      getUseCameraString () {
        return this.selected.useCamera ? '利用する' : '利用しない'
      },
      getSettingValueClass () {
        if (this.selected.useCamera !== this.savedUseCamera || this.selected.videoQuality !== this.savedVideoQuality) {
          return 'hilight'
        }
        return ''
      }
    },
    computed: {
      ...mapState({
        visible: state => state.room.showSettingModal,
        savedUseCamera: state => state.room.useCamera,
        savedVideoQuality: state => state.room.videoQuality
      })
    },
    data () {
      return {
        formLabelWidth: '100px',
        showClose: false,
        selected: {
          useCamera: this.savedUseCamera,
          videoQuality: Define.VIDEO_QUAITY.AUTO
        }
      }
    }
  }
</script>

<style>
  .hilight {
    color: red;
  }
  .video-quality-setting{
    padding-right: 10px;
  }

  .camera-setting .demonstration{
    margin: 10px 0 10px 0;
  }
</style>
