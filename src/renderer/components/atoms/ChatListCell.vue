<template>
  <el-card class="chat-list-cell" :body-style="{ padding: '0px' }" shadow="hover">
    <div class="user-icon">
      <div class="user-icon-image" :style="styleObject" ></div>
    </div>
    <div class="chat-list-info">
      <div class="user-name">{{ chat.user }} </div>
      <div class="user-chat-time">{{ getTime(chat.time) }}</div>
      <div class="user-chat-text">{{ chat.message }}</div>
    </div>
  </el-card>
</template>

<script>
  import Vue from 'vue'
  import mixin from '../../mixin'
  Vue.mixin(mixin)
  
  export default {
    name: 'chat-list-cell',
    props: {
      chat: {
        user: null,
        time: Date(),
        message: null
      }
    },
    components: {
    },
    methods: {
      getTime (time) {
        return this.dateToTimeString(time)
      },
      hashCode (str) { // java String#hashCode
        var hash = 0
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        return hash
      },
      intToRGB (i) {
        var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase()
        return '00000'.substring(0, 6 - c.length) + c
      },
      strToColorHex (string) {
        if (string === 'you') {
          return 'gray'
        }
        return '#' + this.intToRGB(this.hashCode(string))
      }
    },
    data () {
      return {
        styleObject: {
          backgroundColor: this.strToColorHex(this.chat.user)
        }
      }
    }
  }
</script>

<style>
  .chat-list-cell{    
    margin: 5px;
  }
  .chat-list-info{
    padding: 10px 5px 10px 0;
  }
  .user-icon{
    float: left;
    height: 100%;
  }
  .user-icon-image{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    margin: 10px 10px 10px 10px;
    border-color: wheat;
    border-width: 3px;
    border-style: solid;
  }

  .user-name{
    float: left;
    color: darkgrey;
    max-width: 200px;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9em;
  }

  .chat-list-cell .user-chat-time{
    color: lightgray;
    font-size: 0.9em;
  }

  .chat-list-cell .user-chat-text{
    color: gray;
    margin: 5px 0 0 0;
    font-size: 0.9em;
    overflow: auto;
  }

</style>
