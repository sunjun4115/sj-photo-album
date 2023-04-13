<template>
    <div class="login-container">
      <!-- 登录 -->
      <div class="login-wrap">
       <div class="login-box">
        
        <div class="login-input" style="margin-top: 40px;">
          <el-input
            placeholder="请输用户名"
            v-model="userName"
            prefix-icon="el-icon-user"
            clearable>
          </el-input>
        </div>
        <div class="login-input">
          <el-input placeholder="请输入密码" 
          v-model="password" 
          prefix-icon="el-icon-key"
          show-password>
        </el-input>
        </div>
        <div class="login-inputCode">
          <div>
            <el-input
              placeholder="验证码" 
              v-model="password" 
              style="width: 90%;"
              >
            </el-input>
          </div>
        <div style="width: 30%;border: 1px solid #409EFF;box-sizing: border-box;"></div>
        </div>
        <div class="login-btn">
          <el-button style="width: 98%;" type="primary" @click="toCarousel" round>登录</el-button>
        </div>
       </div>
      </div>
      <!-- 底部 -->
      <div class="copyright">
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>商家入驻</li>
          <li>营销中心</li>
        </ul>
        <div class="address">地址：上海市浦东新区</div>
        <div class="beian">© 2023 c3VuanVuCiA=</div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Login',
      data(){
        return {
          userName:'',
          password:''
        }
      },
      methods:{
        //点击登录
        toCarousel(){
          this.$router.push({name:"Carousel"})
        },
      }
    }
  </script>
  
  <style lang="css" scoped>
      .login-container {
        width: 100%;
        height: 100%;
        
      }
      .login-wrap{
        width: 96%;
        margin-left: 2%;
        margin-top: 5%;
        height: 480px;
        background: #409EFF;
        overflow: hidden;
      }
      .login-box{
        width: 380px;
        height: 360px;
        margin-top: 3%;
        margin-left: 60%;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
      }
      .login-input{
        margin-top: 25px;
        width: 90%;
        margin-left: 5%;
      }
      .login-inputCode{
        display: flex;
        margin-top: 25px;
        width: 90%;
        justify-content: space-around;
      }
      .login-btn{
        margin-top: 60px;
        width: 90%;
        margin-left: 5%;
      }
      .copyright{
        /* width: 1200px; */
        margin-top: 45px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
      }
      .copyright ul li{
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
      .copyright ul li:hover{
        color: #409EFF;
        cursor: pointer;
        font-weight: bold;
      }
      .address:hover{
        color: #409EFF;
        font-weight: bold;
      }
      .beian:hover{
        color: #409EFF;
        font-weight: bold;
      }
  </style>