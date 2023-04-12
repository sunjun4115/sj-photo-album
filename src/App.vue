<template>
  <div id="app">
    <Top v-show="$route.path != '/Login' && $route.path != '/'"></Top>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Top from './components/Top.vue'

export default {
  name: 'App',
  components: {
    Top
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
