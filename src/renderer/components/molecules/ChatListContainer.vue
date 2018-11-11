<template>
  <div class="chat-list-container">
    <ChatListCell 
      v-for="(chat, index) in chats" 
      :key="index"
      :chat="chat"
    />
    <ChatListCell />
  </div>
</template>

<script>
  import ChatListCell from '../atoms/ChatListCell'
  import { mapState } from 'vuex'

  export default {
    name: 'chat-list-container',
    components: {
      ChatListCell
    },
    computed: {
      ...mapState({
        chats: state => state.room.chats
      })
    },
    props: {
    },
    methods: {
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  .chat-list-container{
    overflow-y: auto;
    min-height: 500px;
  }
</style>
