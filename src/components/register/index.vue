<template>
  <div class="register-box" ref="registerBox" id="registerBox">
        <div class="register-input" style="margin-top: 40px;">
          <el-input
            placeholder="请输用户名"
            v-model="userName"
            prefix-icon="el-icon-user"
            clearable>
          </el-input>
        </div>
        <div class="register-input">
          <el-input placeholder="请输入密码" 
          v-model="password" 
          prefix-icon="el-icon-key"
          show-password>
        </el-input>
        </div>
        <div class="register-input">
          <el-input placeholder="请输入确认密码" 
          v-model="confirmPassWord" 
          prefix-icon="el-icon-key"
          show-password>
        </el-input>
        </div>
        <div class="register-btn">
          <el-button style="width: 98%;" type="primary" round>确认</el-button>
        </div>
        <div class="register-btn" style="margin-top: 20px;">
          <el-button style="width: 98%;margin-top: 5px;" type="primary" round @click="registerBack">返回</el-button>
        </div>
       </div>
</template>

<script>
    export default {
        name:"Register",
        data(){
            return{
              userName:'',
              password:'',
              confirmPassWord:'',
              true_code:'',
              yanzheng_arr:[],
              register:{
                dialogRegister:false
              }
            }
        },
        methods:{
          registerBack(){
            let loginBox = document.querySelector("#loginBox");
            loginBox.setAttribute("style","transform:rotateY(0deg)");
            let regDiv = document.querySelector("#registerBox");
            regDiv.setAttribute("style","transform:rotateY(-180deg)");
          }
        }
    }
</script>

<style scoped>
  .register-box{
      width: 380px;
      height: 400px;
      margin-top: 3%;
      margin-left: 65%;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #fff;
      border-radius: 5px;
      position: absolute;
      backface-visibility:hidden;
      perspective: 1000px;
      transform: rotateY(-180deg);
      transition: 0.5s ease-in-out;
    }
  .register-input{
    margin-top: 25px;
    width: 90%;
    margin-left: 5%;
  }

  .register-btn{
    margin-top: 50px;
    width: 90%;
    margin-left: 5%;
  }
</style>