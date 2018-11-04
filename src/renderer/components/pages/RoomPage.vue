<template>
  <el-container class='container'>
    <el-aside class='aside'>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  
  export default {
    components: {
    },
    data () {
    },
    computed: {
      ...mapGetters({
        userPeerId: 'userPeerId'
      })
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style>
  .container{
    height: 100%;
  }

  .aside{
    position: relative;
  }

</style>

