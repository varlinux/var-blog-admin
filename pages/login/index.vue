<template>
  <div class="login-container">
    <el-form :model="loginForm"
             v-loading="loading"
             status-icon
             label-position="right"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="账号：" prop="pass">
        <el-input type="text"
                  v-model.trim="loginForm.username"
                  placeholder="用户名"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="age">
        <el-input type="password"
                  placeholder="密码"
                  v-model.trim="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "index",
  layout: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loading: false
    };
  },
  methods: {
    submitForm() {
      this.loading = true
      // this.$store.dispatch('login', this.loginForm)
      this.$store.dispatch('user/login', this.loginForm).then(res => {
        if (res._code === 200) {
          this.$router.push('/article/list')
        } else {
          this.$message({
            message: "账户或密码错误，请重新登录",
            type: 'error'
          })
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    resetForm() {
      // this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  min-height: 300px;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: url("./img/bg2.jpg") no-repeat center;*/
}
.el-form {
  height: 25vh;
  padding: 40px 40px 60px 0;
  min-width: 300px;
  min-height: 130px;
  background-color: #fff;
  opacity: 0.88;
  border-radius: 5px;
  overflow: hidden;
  /*border: 1px solid #dbdbdb;*/
  box-shadow: 0 5px 41px 2px rgba(185,192,197,.25);
}
</style>
