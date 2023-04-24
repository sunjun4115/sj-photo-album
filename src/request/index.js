//第一步导入axios
import axios from "axios"
import { Notification } from 'element-ui'

//第二步 我们可以声明一个新的常量axios 我们可以配置一些基础 公共的路径配置   比如说baseURL timeout请求失败超时报错

console.log("process.env", process.env);
const service = axios.create({
    //baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : 'oamapi/', // api 的 base_url //如果配置了环境变量就可以直接写/api,
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api', // api 的 base_url //如果配置了环境变量就可以直接写/api,
    //baseURL: "oamapi/", //如果配置了环境变量就可以直接写/api,
    //跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等),也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
    //默认值为false。在获取同域资源时设置 withCredentials 没有影响。 true：在跨域请求时，会携带用户凭证  false：在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie
    withCredentials: false,
    timeout: 30000, //请求超时
    // headers是被发送的自定义请求头，请求头内容需要根据后端要求去设置，这里我们使用本项目请求头。
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // }
})

//第三步 设置请求拦截
//新的常量axios service.拦截器.请求.使用===》 里头有两个参数 一个成功的回调函数  一个失败的回调函数
service.interceptors.request.use(config => {
    //每次发送请求要进行的公共操作  每次发送请求一般需要的操作一般都有 开启loading加载动画 token写在请求的头部 之类的
    //loading
    // Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true,
    //   });

    // Notification.error({
    //     title: 'loading...',
    //     duration: 5000
    // })

    const token = "";
    if (localStorage.getItem("sjToke")) {
        token = localStorage.getItem("sjToke")
    }
    //const locale = Vue.ls.get(LANG)
    if (token) {
        // 添加token请求头
        config.headers.Authorization = token
    }

    //最后的话一定要给他return出去 不return不执行
    return config
}, err => {
    //请求的时候如果发生错误了， 这边直接给它抛出错误就行
    // throw new Error(err)抛出的是一个红色的报错方便我们查看寻找
    Notification.error({
        title: 'loading...',
        duration: 5000
    })
    throw new Error(err)

})

//第四步 设置响应拦截
service.interceptors.response.use(response => {
    //我们每次成功发送一个请求 它都会有响应的 参数也是两个
    //一般成功之后可以清除或关闭loading动画 还可以判断一些状态码
    //清除loading动画 
    // Toast.clear()

    //判断状态码
    const res = response.data
    if (res.status && res.status !== 200) {
        // 登录超时,重新登录
        if (res.status === 401) {
            // Toast.loading({
            //     message: '登录超时，请从新登录',
            //     forbidClick: true,
            //   });
            Notification.error({
                title: '登录超时，请从新登...',
                duration: 5000
            })
        }
        return Promise.reject(res || 'error')
    } else {
        //return res.data
        return res
    }

}, err => {
    return Promise.reject(err)
})


//导出  导出这个模块
export default service