<template>
  <el-container class='container'>
    <el-aside class='aside'>
      <div class='form'>
        <img src="../../assets/logo.png" class="logo"/>
        <div class='description'>ユーザー情報の入力</div>
        <el-input 
          :class="'name'"
          name="name-input" 
          type="text"
          v-validate="'required|alpha_dash'"
          placeholder="名前"
          v-model="name"
          clearable>
        </el-input>
        <el-input 
          class='department'
          name="department-input" 
          type="text"
          v-validate="'required|alpha_dash'"
          placeholder="部署名"
          v-model="department"
          clearable>
        </el-input>
        <p v-if="errors.has('name-input')" class="alert-danger">
          名前を英数字で入力してください<br/>（スペース不可）
        </p>
        <p v-if="errors.has('department-input')" class="alert-danger">
          部署名を英数字で入力してください<br/>（スペース不可）
        </p>
        <el-button 
          @click="register" 
          class="success-btn" 
          type="success" 
          :disabled="errors.any() || !isValidated">決定</el-button>
      </div>
    </el-aside>
    <el-main>
      <TutorialContainer />
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import TutorialContainer from '../molecules/TutorialContainer.vue'
  import VeeValidate from 'vee-validate'
  import { mapState } from 'vuex'
  
  Vue.use(VeeValidate)

  export default {
    components: {
      TutorialContainer
    },
    data () {
      return {
        name: '',
        department: ''
      }
    },
    computed: {
      ...mapState({
        savedName: state => state.auth.name,
        savedDepartment: state => state.auth.department
      }),
      isValidated () {
        return this.name && this.department
      }
    },
    mounted () {
      this.name = this.savedName
      this.department = this.savedDepartment
    },
    methods: {
      register () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            alert(this.errors.all())
            return
          }

          this.$confirm('「' + this.name + '-' + this.department + '」 ルーム内でこの様に表示されます、よろしいですか？（後から変更も可能です）', '確認', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
          }).then(() => {
            this.$store.dispatch('registUserInfo', { name: this.name, department: this.department })
            this.$router.push({ name: 'input-room-id-page' })
          }).catch(() => {
          })
        })
      }
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

  .el-main{
    height: 100%;
    padding: 0px !important; 
  }

  .logo{
    height: 40px;
  }

  .form{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 250px;
    height: 250px;
    text-align: center;
    position: absolute;
    margin: auto;
  }

  .description{
    margin: 15px;
    font-size: 0.8em;
    color: darkgrey;
  }

  .name{
    margin-bottom: 10px;
  }

  .department{
    margin-bottom: 10px;
  }

  .success-btn{
    width: 100%;
  }

  .alert-danger{
    font-size: 0.7em;
    color: brown;
  }

</style>

