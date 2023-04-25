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
          v-model="passWord" 
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
          <el-button style="width: 98%;" type="primary" @click="userRegister" round>确认</el-button>
        </div>
        <div class="register-btn" style="margin-top: 20px;">
          <el-button style="width: 98%;margin-top: 5px;" type="primary" round @click="registerBack">返回</el-button>
        </div>
       </div>
</template>

<script>
    import register from "../../api/register"
    export default {
        name:"Register",
        data(){
            return{
              userName:'',
              passWord:'',
              confirmPassWord:'',
            }
        },
        methods:{
          userRegister(){
            let registerObj = {};
            let userName = this.userName;
            let passWord = this.passWord;
            let confirmPassWord = this.confirmPassWord;
            if(passWord != confirmPassWord){
              this.$confirm('密码不一致', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              }).catch(() => {
              });
            };
            if(passWord != confirmPassWord){
              return false
            }
            registerObj.username = userName;
            registerObj.password = passWord;
            register.getRegister(registerObj).then((res)=>{
              console.log(res);
              if(res.code===0){
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                setTimeout(()=>{
                  let loginBox = document.querySelector("#loginBox");
                  loginBox.setAttribute("style","transform:rotateY(0deg)");
                  let regDiv = document.querySelector("#registerBox");
                  regDiv.setAttribute("style","transform:rotateY(-180deg)");
                },1000)
              }else if(res.code===8){
                this.$message({
                  message: '用户名已存在',
                  type: 'info'
                });
              }else{
                this.$message({
                  message: '注册失败，请重试',
                  type: 'error'
                });
              }
            }).catch(err=>console.log(err))
          },
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