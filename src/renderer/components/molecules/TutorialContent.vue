<template>
  <div class="outer">
    <div class="inner">
      <i :class="icon + ' icon'"></i>
      <div class="title">{{ title }}</div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      title: String,
      content: String
    }
  }
</script>

<style>

  .outer{
    display: table;
    width: 100%;
    height: 100%;
  }
  .inner{
    color: white;
    margin: auto;
    height: 200px;
    width: 200px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .icon{
    font-size: 3.0em;
    margin: 20px;
  }
  .title{
    font-size: 1.3em;
  }
  .content{
    margin-top: 10px;
    font-size: 1.0em;
  }
  .el-icon-service{
    font-size: 3.0em;
    margin: 10px;
  }
</style>

