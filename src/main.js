import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import VueRouter from 'vue-router'
import router from './router';

import App from './App.vue';


Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')