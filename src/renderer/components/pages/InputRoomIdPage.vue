<template>
  <div>
    <div class="setting-form">
      <el-button class="el-icon-warning setting" type="text" @click="openSettingModal()"></el-button>
      <!-- <el-popover
        placement="top"
        width="160"
        v-model="visibleModal">
        <p>登録されたユーザー情報を変更しますか？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visibleModal = false">しない</el-button>
          <el-button type="primary" size="mini" @click="backToInputUser()">する</el-button>
        </div>
        <i class="el-icon-warning setting" slot="reference"/>
      </el-popover> -->
      <SettingDialog  />
    </div>
    <div class='form'>
      <img src="../../assets/logo.png" class="logo" />
      <div class='description'>{{ userPeerId }}さん、入室するルームIDを<br/>入力してください</div>
      <!-- <div class='display-name'>あなたのルーム内での表示名: {{ userPeerId }}</div> -->
      <el-input :class="'room-id'" name="name-id" type="text" v-validate="'required|alpha_dash'" placeholder="ルームID" v-model="roomId" clearable>
      </el-input>
      <p v-if="errors.has('name-id')" class="alert-danger">
        RoomIdを英数字で入力してください<br/>（スペース不可）
      </p>
      <el-button @click="register" class="success-btn" type="success" :disabled="errors.any() || !isValidated">決定</el-button>
      <!-- <el-button @click="randumRegister" class="random-btn" type="info">ランダムなIDで入室</el-button> -->
      <a href="#" @click="randomRegister()" class="random-link">ランダムなIDで入室</a>
    </div>
  </div>
</template>

<script lang="js">
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import {
    mapState, mapGetters, mapMutations
  } from 'vuex'
  import mixin from '../../mixin'
  import SettingDialog from '../molecules/SettingDialog.vue'
  Vue.mixin(mixin)
  Vue.use(VeeValidate)
  
  export default {
    components: {
      SettingDialog
    },
    data () {
      return {
        visibleModal: false,
        roomId: '',
        useCamera: true
      }
    },
    computed: {
      ...mapState({
      }),
      ...mapGetters({
        userPeerId: 'userPeerId'
      }),
      isValidated () {
        return this.roomId
      }
    },
    mounted () {},
    methods: {
      ...mapMutations({
        openSettingModal: 'openSettingModal'
      }),
      register () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            alert(this.errors.all())
            return
          }
          this.$store.dispatch('updateEnterRoom', { roomId: this.roomId })
          this.$router.push({ name: 'room-page' })
        })
      },
      randomRegister () {
        var roomId = this.randomRoomId()
        this.$store.dispatch('updateEnterRoom', { roomId: roomId })
        this.$router.push({ name: 'room-page' })
      },
      backToInputUser () {
        this.visibleModal = false
        this.$router.push({ name: 'input-user' })
      }
    }
  }
</script>

<style>
  .container {
    height: 100%;
  }
  
  .aside {
    position: relative;
  }
  
  .el-main {
    height: 100%;
    padding: 0px !important;
  }
  
  .form {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 250px;
    height: 250px;
    text-align: center;
    position: absolute;
    margin: auto;
  }
  
  .description {
    margin: 15px;
    font-size: 0.8em;
    color: darkgrey;
  }

  .display-name{
    margin: 15px;
    font-size: 0.8em;
    color: burlywood;
  }
  
  .room-id {
    margin-bottom: 10px;
  }
  
  .success-btn {
    width: 100%;
    margin-bottom: 20px !important;
  }

  .random-link{
    font-size: 0.8em;
    color: darkgray;
  }
  
  .alert-danger {
    font-size: 0.7em;
    color: brown;
  }

  .setting-form{
    position: absolute;
    right: 0px;
    margin: 10px;  
  }

  .setting{
    color: darkgray;
  }
</style>

