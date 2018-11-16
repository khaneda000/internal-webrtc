<template>
  <el-dialog title="設定" 
  width="300px"
  :showClose="false"
  @open="open"
  :visible.sync="visible">
    <el-select v-model="selected.videoQuality" placeholder="映像の質">
      <el-option
        v-for="item in videoQualitys"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-switch v-model="selected.useCamera"></el-switch>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideSettingModal()">閉じる</el-button>
      <el-button type="info" @click="update()">決定</el-button>
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
      update () {
        this.updateSetting(
          {
            useCamera: this.selected.useCamera,
            videoQuality: this.selected.videoQuality
          }
        )
        this.hideSettingModal()
      },
      open () {
        this.selected.useCamera = this.savedUseCamera
        this.selected.VideoQuality = this.savedVideoQuality
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
        },
        videoQualitys: [
          {
            value: Define.VIDEO_QUAITY.AUTO,
            label: '自動'
          },
          {
            value: Define.VIDEO_QUAITY.LOW,
            label: '低'
          },
          {
            value: Define.VIDEO_QUAITY.HIGH,
            label: '高'
          }
        ]
      }
    }
  }
</script>

<style>

</style>
