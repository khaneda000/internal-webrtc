<template>
  <el-container class="container">
    <el-main v-loading="loading"></el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'root',
    components: {
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
