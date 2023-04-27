//这边的话 先导入封装好的新的axios
import request from '../request/index';

//然后我们可以封装一些接口函数 比如说 登录的 注册的 首页的 分类的 轮播的 //但是要确认参数传的是get还是post请求
export function getRegister(data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data
    })
}

export default { getRegister }