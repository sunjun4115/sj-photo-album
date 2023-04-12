import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Carousel from "../pages/carousel"
import SeePhoto from "../pages/seephoto"
import CloudServer from "../pages/cloudserver"
import Login from "../pages/Login/index"

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Carousel',
        name: 'Carousel',
        component: Carousel
    },
    {
        path: '/Carousel/:id',
        name: 'Carousel',
        component: Carousel
    },
    {
        path: '/SeePhoto',
        name: 'SeePhoto',
        component: SeePhoto
    },
    {
        path: '/CloudServer',
        name: 'CloudServer',
        component: CloudServer
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '*',
        redirect: '/'
    },
]

//重写push方法
const originPush = VueRouter.prototype.push; // 把官方的push方法暂存到originPush这个变量里面
VueRouter.prototype.push = function push(location) { // 参数是调用push方法传进来的参数
    return originPush.call(this, location).catch(() => {});
};
//或者重写replace方法
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originReplace.call(this, location).catch(() => {})
}
export default new VueRouter({
    // mode: 'hash',
    mode: 'history',
    base: '/oamweb/',
    routes: routes
})