<template>
  <div class="block">
    <el-carousel class="el-carousel" 
      :autoplay="false"
      height="100%">
      <el-carousel-item v-for="tutorial in tutorialContents" :key="tutorial.title">
        <tutorial-content
          :icon="tutorial.icon" 
          :title="tutorial.title" 
          :content="tutorial.content" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import TutorialContent from './TutorialContent.vue'
  export default {
    components: {
      TutorialContent
    },
    data () {
      return {
        tutorialContents: [
          {
            icon: 'el-icon-question',
            title: '使い方',
            content: '社内用のWebRTC会議システムです'
          },
          {
            icon: 'el-icon-edit',
            title: 'Step 1. 名前と部署名を入れます',
            content: 'これはルーム内で表示されます'
          },
          {
            icon: 'el-icon-phone-outline',
            title: 'Step 2. ルームに入る',
            content: '入りたいルームを入力、または作成します'
          },
          {
            icon: 'el-icon-service',
            title: 'Step 3. あとは喋るだけ',
            content: '複数人でも二人でも'
          }
        ]
      }
    }
  }
</script>

<style>
  .block{
    height: 100%;
  }
  .el-carousel{
    height: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__container{
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #189F96;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #189F96;
  }
</style>

