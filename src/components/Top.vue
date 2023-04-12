<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" @click="toCarousel">首页</el-menu-item>
  <!-- <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu> -->
  <el-menu-item index="2" @click="toCloudServer">云服务</el-menu-item>
  <el-menu-item index="3">运维管理</el-menu-item>
  <el-menu-item index="4" @click="toSeePhoto">图片</el-menu-item>
  <el-menu-item index="5">关于</el-menu-item>
</el-menu>
<div class="line"></div>
</div>
   
</template>
<script>
export default {
    name:"Top",
    data() {
        return {
            activeIndex: '1',
        }
    },
     methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toSeePhoto(){
        this.$router.push({name:"SeePhoto"})
      },
      toCarousel(){
        this.$router.push({name:"Carousel",params:{userId:"abc",passWorld:123}})
      },
      toCloudServer(){
        this.$router.push({name:"CloudServer"})
      },
    }
}
</script>
<style scoped>

</style>