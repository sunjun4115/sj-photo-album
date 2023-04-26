<template>
  <div id="app">
    <Main></Main>
    <!-- <Main v-show="$route.path != '/login' && $route.path != '/'"></Main> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  },
  mounted() {
    console.log("$route.path",this.$route.path);
  },
  created () {
  // 在页面加载时读取sessionStorage
  if (sessionStorage.getItem('store')) {
   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
  }
  // 在页面刷新时将store保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  })
 },
  methods:{
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
