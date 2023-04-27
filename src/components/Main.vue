<template>
<div>
  <el-menu  v-if="$route.path != '/Login' && $route.path != '/'" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" @click="toCarousel">首页</el-menu-item>
  <el-menu-item index="2" @click="toCloudServer">云服务</el-menu-item>
  <el-menu-item index="3" @click="toMessage">运维管理</el-menu-item>
  <el-menu-item index="4" @click="toSeePhoto">图片</el-menu-item>
  <div style="margin-left: 90%;margin-top: 1%;">
    <el-dropdown placement="bottom" @command="handleCommand">
      <img src="../../public/user.png" id="userImg">
      <el-button type="primary" style="display: none;" id="tttBtn">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</el-menu>
<div class="line"></div>
<router-view></router-view>
</div>
   
</template>
<script>
export default {
    name:"Top",
    data() {
        return {
            activeIndex: sessionStorage.getItem("nowSelect") ? sessionStorage.getItem("nowSelect") :'1',
        }
    },
    mounted(){
      console.log("sessionStorage.getItem('nowSelect')",sessionStorage.getItem("nowSelect"))
      this.activeIndex = sessionStorage.getItem("nowSelect")
    },
     methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toSeePhoto(){
        this.activeIndex="4";
        sessionStorage.setItem("nowSelect","4");
        this.$router.push({name:"seePhoto"});
      },
      toCarousel(){
        this.activeIndex="1";
        sessionStorage.setItem("nowSelect","1")
        this.$router.push({name:"carousel",params:{userId:"abc",passWorld:123}});
      },
      toCloudServer(){
        this.activeIndex="2";
        sessionStorage.setItem("nowSelect","2");
        this.$router.push({name:"cloudServer"});
      },
      toMessage(){
        this.activeIndex="3";
        sessionStorage.setItem("nowSelect","3")
        this.$router.push({name:"message"});
      },
      handleCommand(command) {
        console.log("xxxxxxxx",this.$store.state);
        if(command == "userCenter"){
          this.activeIndex="6";
          sessionStorage.setItem("nowSelect","6");
          this.$router.push({name:"userInfo",params:{userId:this.$store.state.userInfo.userId}})
        }else if(command == "logout"){
          sessionStorage.setItem("nowSelect","1");
          this.$router.push({name:"login"})
        }else{
          console.log("there is no match");
        }
        console.log("command",command)
      }
    }
}
</script>
<style scoped>
  #userImg:hover{
    cursor: pointer;
  }
</style>