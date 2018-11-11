<template>
  <div class="chat-container">
    <ChatListContainer/>
    <ChatFormContainer />
  </div>
</template>

<script>
  import ChatFormContainer from './ChatFormContainer'
  import ChatListContainer from './ChatListContainer'
  export default {
    name: 'chat-container',
    props: {
    },
    components: {
      ChatFormContainer,
      ChatListContainer
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
  .chat-container{
    height: 100%;
    display: flex;  
    flex-direction: column;
  }
</style>
