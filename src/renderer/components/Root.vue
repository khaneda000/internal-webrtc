<template>
  <div>
    <LoadingContainer />
    <el-button @click='openLink();'>Default</el-button>
  </div>
</template>

<script>
  import LoadingContainer from './molecules/LoadingContainer.vue'

  export default {
    name: 'root',
    created () {
    },
    components: {
      LoadingContainer
    },
    methods: {
      openLink: function () {
        console.log('click')
        this.$router.push({ name: 'input-user' })
      }
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
  body { 
    font-family: 'Helvetica Neue', sans-serif; 
    margin: 0px;
  }
</style>
