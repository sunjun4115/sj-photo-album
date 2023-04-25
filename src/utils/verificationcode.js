  //生成图片验证码
  function draw(id, show_num) {
      var canvas_width = document.querySelector("#" + id).clientWidth;
      var canvas_height = document.querySelector("#" + id).clientHeight;
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
          show_num[i] = txt.toLowerCase(); // 依次把取得的内容放到数组里面
          var x = 10 + i * 20; //文字在canvas上的x坐标
          var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
          context.font = "bold 23px 微软雅黑";

          context.translate(x, y);
          context.rotate(deg);

          context.fillStyle = randomColor();
          context.fillText(txt, 0, 0);

          context.rotate(-deg);
          context.translate(-x, -y);
      }
      //验证码上显示6条线条
      for (var i = 0; i <= 5; i++) {
          context.strokeStyle = randomColor();
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
          context.strokeStyle = randomColor();
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
      return num
  }
  //得到随机的颜色值
  function randomColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
  }

  export default draw