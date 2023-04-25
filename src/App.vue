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
