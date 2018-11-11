<template>
  <div class="chat-form-container">
    <div>
      <el-input 
        class="input"
        :placeholder="'#' + roomId + 'へのメッセージ'" 
        type="textarea" 
        v-validate="'required'"
        v-model="form.message"
        :autosize="{ minRows: 1, maxRows: 3}">
      </el-input>
      <el-button 
        type="success" 
        class="send-button" 
        size="small"
        @click="submitMessage"
        :disabled="errors.any() || !isValidated">送信</el-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import VeeValidate from 'vee-validate'
  Vue.use(VeeValidate)

  export default {
    name: 'chat-form-container',
    components: {
    },
    methods: {
      submitMessage () {
        this.$store.dispatch('addChat',
          {
            user: 'you',
            time: Date(),
            message: this.form.message
          }
        )
        this.$store.getters.skyway.room.send(this.form.message)
        this.form.message = null
      }
    },
    computed: {
      ...mapState({
        roomId: state => state.room.roomId
      }),
      isValidated () {
        return this.form.message
      }
    },
    data () {
      return {
        form: {
          message: ''
        }
      }
    }
  }
</script>
<style>
  .chat-form-container{
    width: 100%;
    padding: 5px 0 5px 0;
  }
  .chat-form-container .input{
    margin: 0 0 0 5px;
    width: 230px;
  }
  .chat-form-container .send-button{
  }

</style>
