'use strict'

// const path = require("path");
const port = 8088 // 端口配置
module.exports = {
    publicPath: "./", //部署应用包时的基本 URL,默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
    outputDir: "dist", //输出文件目录
    assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    lintOnSave: false,
    // vue-cli设置代理服务器
    devServer: {
        publicPath: '/',
        host: 'localhost', // 本地的IPv4地址
        port: 8080, // 默认端口为8080，此端口冲突，也会出现代理异常的情况
        inline: true,
        open: true, // 启动打开浏览器
        hot: true, // 热更新
        historyApiFallback: true,
        compress: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        proxy: {
            "/api": {
                // target: "http://loc3.qvcloud.net/", // 服务代理地址，这里的地址会代替axios中设置的baseURL地址
                target: "http://116.228.9.66:8088/", // 服务代理地址，这里的地址会代替axios中设置的baseURL地址
                changeOrigin: true, // 配置接口跨域请求
                // pathRewrite 重写url
                // pathRewrite: {'^/api': '/'} 重写之后url为 http://39.156.66.10:8016/
                // pathRewrite: {'^/api': '/api'} 重写之后url为 http://39.156.66.10:8016/api/
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    }
}