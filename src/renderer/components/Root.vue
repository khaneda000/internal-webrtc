<template>
  <LoadingContainer />
</template>

<script>
  import LoadingContainer from './molecules/LoadingContainer.vue'
  import Sleep from 'sleep-async'

  export default {
    name: 'root',
    components: {
      LoadingContainer
    },
    methods: {
      
    },
    data () {
      return {
        loading: true
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .container{
    height: 100%;
  }
</style>
