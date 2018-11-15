<template>
  <el-dialog title="設定" 
  width="300px"
  :showClose="false"
  @open="open"
  :visible.sync="visible">
    <el-switch v-model="useCamera"></el-switch>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideSettingModal()">閉じる</el-button>
      <el-button type="info" @click="updateSetting()">決定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    mapState, mapMutations
  } from 'vuex'

  export default {
    name: 'setting-dialog',
    components: {
    },
    methods: {
      ...mapMutations({
        updateUseCamera: 'updateUseCamera',
        hideSettingModal: 'hideSettingModal'
      }),
      updateSetting () {
        this.updateUseCamera({useCamera: this.useCamera})
        this.hideSettingModal()
      },
      open () {
        this.useCamera = this.savedUseCamera
      }
    },
    computed: {
      ...mapState({
        visible: state => state.room.showSettingModal,
        savedUseCamera: state => state.room.useCamera
      })
    },
    data () {
      return {
        useCamera: this.savedUseCamera,
        formLabelWidth: '100px',
        showClose: false
      }
    }
  }
</script>

<style>

</style>
