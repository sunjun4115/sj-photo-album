import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Carousel from "../pages/carousel"
import SeePhoto from "../pages/seephoto"
import CloudServer from "../pages/cloudserver"
import Login from "../pages/Login/index"
import Message from "../pages/Message"
import Detail from "../pages/Detail"
import New from "../pages/New"

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
        path: '/Message',
        name: 'Message',
        component: Message,
        children: [{
            path: "Detail/:id/:title", //方式为params时，路径必须要这样写
            // path: "Detail",
            name: "Detail",
            component: Detail,
            //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
            // props: { a: 1, b: 'hello' }

            //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件。
            //props: true

            //props的第三种写法，值为函数,以props的形式传给Detail组件
            props($route) {
                return {
                    id: $route.params.id,
                    title: $route.params.title,
                    a: 1,
                    b: 'hello'
                }
            }
        }, {
            path: "New",
            name: "xinwen",
            component: New,
            //props的第三种写法，值为函数,以props的形式传给Detail组件
            props($route) {
                return {
                    id: $route.query.id,
                    title: $route.query.title,
                    a: 1,
                    b: 'hello'
                }
            }
        }]
    },
    {
        path: '/Login/:id/:title',
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
    mode: 'hash',
    // mode: 'history',
    // base: '/oamweb/',
    routes: routes
})