import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Carousel from "../pages/carousel"
import SeePhoto from "../pages/seephoto"
import CloudServer from "../pages/cloudserver"
import Login from "../pages/login/index"
import Message from "../pages/Message"
import Detail from "../pages/Detail"
import New from "../pages/New"

const routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/carousel',
        name: 'carousel',
        component: Carousel
    },
    {
        path: '/carousel/:id',
        name: 'carousel',
        component: Carousel
    },
    {
        path: '/seePhoto',
        name: 'seePhoto',
        component: SeePhoto
    },
    {
        path: '/cloudServer',
        name: 'cloudServer',
        component: CloudServer
    },
    {
        path: '/message',
        name: 'message',
        component: Message,
        children: [{
            path: "detail/:id/:title", //方式为params时，路径必须要这样写
            // path: "Detail",
            name: "detail",
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
            path: "new",
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
        path: '/login',
        name: 'login',
        component: Login
    },
    // {
    //     path: '*',
    //     redirect: '/'
    // },
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

// //全局前置守卫：初始化时执行、每次路由切换前执行
// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', to, from)
//     if (to.meta.isAuth) { //判断当前路由是否需要进行权限控制
//         if (localStorage.getItem('school') === 'atguigu') { //权限控制的具体规则
//             next() //放行
//         } else {
//             alert('暂无权限查看')
//                 // next({name:'guanyu'})
//         }
//     } else {
//         next() //放行
//     }
// })
const router = new VueRouter({
    mode: 'hash',
    // mode: 'history',
    // base: '/oamweb/',
    routes: routes
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    console.log('前置路由守卫', to, from)
    if (localStorage.getItem("sjToken")) { //判断是否有token
        // next()
        if (to.path == '/login') {
            // 这个 if 里面什么时候会进来，比如说某个人他现在操作页面正常，token 存在或者没过期，但是他喵的，贱嗖的，他现在就要重新登录，你管我，然后就进到这里面来了
            next('/carousel');
            // token 存在或者没过期，即将要进入的不是 login 页面
        } else {
            // 这个 else 里面什么时候会进来，比如说，当前 token 存在或者没过期，我随便进入到任何一个页面，都可以进来
            next();
        }
    } else {
        // 这个 if 里面什么时候会进来，这里就是正常进来，比如说，当前 token 不存在或者过期了，我直接点击 进入登录页
        if (to.path == "/login") {
            next()
        } else {
            // 这个 else 里面什么时候会进来，比如说，A 到 B，那么在进入 B 之前执行 router.beforeEach 前置守卫的时候，token 不存在或者过期了，你就要进入到 C 页面，也就是 login登录页
            next(`/login`) // 否则全部重定向到登录页
        }

    }
})
export default router