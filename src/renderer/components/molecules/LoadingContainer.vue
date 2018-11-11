<template>
  <el-container class="loading-container">
    <div class="loading-content"> 
      <img src="../../assets/loading.gif" class="loading"/>
      <span class="loading-text">Setup Confrerre...</span>
      <!-- <el-main v-loading="loading"></el-main> -->
    </div>
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
  .loading-container{
    height: 100%;
    width: 100%;
    position: relative;  
  }
  .loading-container .loading-content{
    width: 200px;
    height: 200px;
    position: absolute;         
    padding: 20px;               
    top:  0%;
    bottom:  0;
    left:  0;
    right:  0;
    margin:  auto;
    text-align: center;    
  }
  .loading-container .loading{
    width: 200px;
    height: 100px;
    margin: 50px 0 10px 0;
  }

  .loading-container .loading-text{
    color: gray;
  }
</style>
