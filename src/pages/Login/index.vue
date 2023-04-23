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
       </div>
      </div>
      <!-- 底部 -->
      <div class="copyright">
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>商家入驻{{$store.state.sum}}</li>
          <li>营销中心{{sum}}</li>
        </ul>
        <div class="address">地址：上海市浦东新区</div>
        <div class="beian">© 2023 c3VuanVuCiA=</div>
      </div>
    </div>
  </template>
  
  <script>
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
          yanzheng_arr:[]

        }
      },
      mounted(){
        console.log(this);
        this.draw(this.yanzheng_arr);
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
          loginObj.userName = userName;
          loginObj.passWord = passWord;
          loginObj.code = this.code;
          loginApi.getLogin(loginObj)
          return false
          // if(userName == "sunjun" && password=="123456"){
          //   this.$router.push({name:"Carousel"})
          // }else{
          //   this.$alert('用户名或密码有误', '提示');
          // }
          this.$router.push({name:"Carousel"})
          
        },
        //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
        ...mapActions({increment:'jia'}),
        //生成图片验证码
        draw(show_num) {
            var canvas_width =  document.querySelector("#canvas").clientWidth;
            var canvas_height = document.querySelector("#canvas").clientHeight;
            var canvas = document.getElementById("canvas"); //获取到canvas
            var context = canvas.getContext("2d"); //获取到canvas画图
            canvas.width = canvas_width;
            canvas.height = canvas_height;
            var sCode = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
            var aCode = sCode.split(",");
            var aLength = aCode.length; //获取到数组的长度
        
            //4个验证码数
            for (var i = 0; i <= 3; i++) {
                var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
                var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
                var txt = aCode[j]; //得到随机的一个内容
                show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
                var x = 10 + i * 20; //文字在canvas上的x坐标
                var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
                context.font = "bold 23px 微软雅黑";
        
                context.translate(x, y);
                context.rotate(deg);
        
                context.fillStyle = this.randomColor();
                context.fillText(txt, 0, 0);
        
                context.rotate(-deg);
                context.translate(-x, -y);
            }
            //验证码上显示6条线条
            for (var i = 0; i <= 5; i++) {
                context.strokeStyle = this.randomColor();
                context.beginPath();
                context.moveTo(
                    Math.random() * canvas_width,
                    Math.random() * canvas_height
                );
                context.lineTo(
                    Math.random() * canvas_width,
                    Math.random() * canvas_height
                );
                context.stroke();
              }
              //验证码上显示31个小点
              for (var i = 0; i <= 30; i++) {
                  context.strokeStyle = this.randomColor();
                  context.beginPath();
                  var x = Math.random() * canvas_width;
                  var y = Math.random() * canvas_height;
                  context.moveTo(x, y);
                  context.lineTo(x + 1, y + 1);
                  context.stroke();
              }
        
              //最后把取得的验证码数组存起来，方式不唯一
              var num = show_num.join("");
              // console.log(num);
              this.true_code = num
        },
        //得到随机的颜色值
        randomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        //canvas点击刷新
        handleCanvas(){
            this.draw(this.yanzheng_arr);
        }
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