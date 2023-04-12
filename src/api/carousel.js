//这边的话 先导入封装好的新的axios
import request from '../request/index';

//然后我们可以封装一些接口函数 比如说 登录的 注册的 首页的 分类的 轮播的 //但是要确认参数传的是get还是post请求

//首页
export function getHome() {
    //return request.get('/oamapi/api/oemApp/appIdPower', data)
    return request({
        url: 'api/dept/power',
        method: 'get',
    })
}

export function addPushClientTag(data) {
    return request({
        url: 'api/pushClientTag',
        method: 'get',
        data
    })
}

export default { getHome, addPushClientTag }

//比如说以后我们要维护封装好的接口 这样封装好后我们就不需要去组件里一个一个去找，直接来这个文件修改即可
//组件化开模块化发或者开发 它们都有一个原则
//高聚合 低耦合 
//高聚合就是 一个组件的业务一定要聚合在一起 一个组件的业务越集中越好
//低耦合就是 组件和组件之间的耦合度一定要低 意思就是两个组件之间的牵连越少越好