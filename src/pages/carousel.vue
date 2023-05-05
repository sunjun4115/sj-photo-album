<template>
<div>
   <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in items" :key="item.id">
      <img :src="item.url" style="width: 100%;height: 300px; object-fit: cover;"  alt="">
    </el-carousel-item>
  </el-carousel>
  <!-- <p>{{this.$route.params.userId}}</p>
  <el-button type="primary" @click="testBtn">click</el-button> -->
  <Centerlist :centerList="centerList"></Centerlist>
</div>
 
  
</template>
<script>
import { nanoid } from 'nanoid' 
import carouselApi from "../api/carousel.js"
import Centerlist from "../components/centerList/index.vue"
export default {
    
    name:"Carousel",
    data() {
        return {
          items:[
            {id:nanoid(),url:"../../f1.jpg"},
            {id:nanoid(),url:"../../f2.jpg"},
            {id:nanoid(),url:"../../f3.jpg"},
            {id:nanoid(),url:"../../f4.jpg"},
          ],
          centerList:[
            {
              id:nanoid(),
              title:"abc",
              imgurl:[
                {
                  id:nanoid(),
                  desc:"冰清玉洁",
                  price:10,
                  url:"../../c1.png"
                },
                {
                  id:nanoid(),
                  desc:"浪漫心情",
                  price:20,
                  url:"../../c1.png"
                },
                {
                  id:nanoid(),
                  desc:"愿得一人心",
                  price:30,
                  url:"../../c1.png"
                },
                {
                  id:nanoid(),
                  desc:"花香四季",
                  price:40,
                  url:"../../c1.png"
                }
              ]
            },
          ]
        }
    },
    components:{
      Centerlist
    },
    mounted() {
      // console.log(this.$route.params.userId);
      // console.log(this.$route.params.passWorld);
      carouselApi.getCenterList().then(res=>{
        console.log('center',res)
      }).catch(err=>console.log("center",err))
    },
    methods: {
      testBtn(){
        //console.log(carouselApi);
        carouselApi.getHome();
      }
    },
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>