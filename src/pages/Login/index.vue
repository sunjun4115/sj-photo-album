<template>
    <div class="login-container">
      <!-- 登录 -->
      <div class="login-wrap" style="position: relative;">
       <div class="login-box" ref="loginBox" id="loginBox">
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
              v-model="code" 
              style="width: 90%;"
              >
            </el-input>
          </div>
          <div style="width: 30%;border: 1px solid #409EFF;box-sizing: border-box;">
            <canvas id="canvas" width="96px" height="34px" @click="handleCanvas"></canvas>
          </div>
        </div>
        <div class="login-btn">
          <el-button style="width: 98%;" type="primary" @click="toCarousel" round>登录</el-button>
        </div>
        <div class="register-btn">
          <el-button style="width: 98%;margin-top: 5px;" type="primary" @click="goRegister" round>注册</el-button>
        </div>
       </div>
       <Register></Register>
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
    import draw from "../../utils/verificationcode.js"
    import Register from "../../components/register/index.vue"
    import { mapState, mapActions} from 'vuex';
    import loginApi from "../../api/login.js"
    export default {
      name: 'Login',
      props:["id","title"],
      data(){
        return {
          userName:'',
          password:'',
          code:'',
          true_code:'',
          yanzheng_arr:[],
        }
      },
      mounted(){
        this.true_code = draw("canvas",this.yanzheng_arr);
        //登录进去后默认选中第一个菜单
        sessionStorage.setItem("nowSelect","1");
      },
      components:{
        Register
      },
      methods:{
        //点击登录
        toCarousel(){
          let userName = this.userName;
          let passWord = this.password;
          console.log("this.$store",this.$store)
          //this.$store.dispatch("jia",1)
          //s使用mapActions写法，调用或者添加点击事件，传对应的参数
          this.increment(1);
          console.log("this.code",this.code)
          console.log("this.true_code",this.true_code);
          let loginObj = {};
          loginObj.username = userName;
          loginObj.password = passWord;
          loginObj.code = this.code;
          loginApi.getLogin(loginObj).then(res=>{
            console.log("res",res);
            if(res.code === 0){
              let userToken = res.data.token;
              localStorage.setItem("sjToken",userToken);
              let userInfoObj = {};
              userInfoObj.userName = res.data.user.username;
              userInfoObj.gender = res.data.user.gender;
              userInfoObj.phone = res.data.user.phone;
              userInfoObj.realName = res.data.user.realName;
              userInfoObj.userAvatar = res.data.user.userAvatar;
              userInfoObj.userId = res.data.user.id;
              this.$store.dispatch("getUserInfo",userInfoObj)
              sessionStorage.setItem("nowSelect","1");
              this.$router.push({name:"carousel"});
            }else{
              this.$alert('登录失败', '提示');
            }
           
          }).catch(err=>console.log("err",err))
          // return false
          // if(userName == "sunjun" && password=="123456"){
          //   this.$router.push({name:"carousel"})
          // }else{
          //   this.$alert('用户名或密码有误', '提示');
          // }
          
          
        },
        goRegister(){
          // console.log(this.$refs.loginBox);
          // console.log(document.querySelector("#registerBox"));
          this.$refs.loginBox.setAttribute("style","transform:rotateY(-180deg)")
          let regDiv = document.querySelector("#registerBox")
          regDiv.setAttribute("style","transform:rotateY(-360deg)");
          // console.log(this.true_code);
          // console.log("end")
        },
        //canvas点击刷新
        handleCanvas(){
          this.true_code = draw("canvas",this.yanzheng_arr);
        },
        //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
        ...mapActions({increment:'jia'}),
       
      },
      computed:{
        //借助mapState生成计算属性，从state中读取数据。（对象写法）
			  // ...mapState({he:'sum'}),
			  //借助mapState生成计算属性，从state中读取数据。（数组写法）
        ...mapState(['sum'])
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
        height: 500px;
        background: #409EFF;
        overflow: hidden;
      }
      .login-box{
        width: 380px;
        height: 400px;
        margin-top: 3%;
        margin-left: 65%;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        position: absolute;
        perspective: 1000px;
        transition: 0.5s ease-in-out;

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
        margin-top: 50px;
        width: 90%;
        margin-left: 5%;
      }
      .register-btn{
        margin-top: 20px;
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