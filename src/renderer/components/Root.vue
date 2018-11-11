<template>
  <div style="height:100%;">
    <LoadingContainer />
  </div>
</template>

<script>
  import LoadingContainer from './molecules/LoadingContainer.vue'

  export default {
    name: 'root',
    created () {
    },
    mounted () {
      const routing = () => {
        this.$store.dispatch('initUser')
        if (!this.$store.authname || this.$store.authname === '') {
          this.$router.push({ name: 'input-user' })
        } else {
          this.$router.push({ name: 'input-room-id-page' })
        }
      }
      const delayRun = (waitSeconds, someFunction) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(someFunction())
          }, waitSeconds)
        })
      }
      delayRun(3000, routing)
    },
    components: {
      LoadingContainer
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
