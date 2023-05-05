<template>
    <div>
        <div  v-for="item in centerList" :key="item.id">
            <div style="text-align: left;padding-left: 10px; color: cadetblue;"><h3>{{item.title}}</h3></div>
            <div class="listBox">
            <div class="listItem" v-for="f in item.imgurl" :key="f.id">
                <img :src="f.url" style="width: 223px;height: 235px; object-fit: cover;" alt="">
                <p>{{f.desc}}</p>
                <span>{{f.price}}</span>
            </div>
     </div>
        </div>
        
    </div>
    
</template>
<script>
export default{
    name:"Centerlist",
    props:["centerList"],
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.listBox{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 360px;
}
.listItem{
    width: 240px;
    height: 330px;
    border: 1px solid gold;
    box-sizing: border-box;
}
.listItem:hover{
    width: 250px;
    height: 340px;
    box-shadow:10px 0px 10px 0px rgba(0,0,0,0.1);
}
</style>