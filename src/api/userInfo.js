//这边的话 先导入封装好的新的axios
import request from '../request/index';

export function setUser(data) {
    return request({
        url: '/auth/updateUser',
        method: 'post',
        data
    })
}

export function modifyPassword(data) {
    return request({
        url: '/auth/updateUser',
        method: 'post',
        data
    })
}

export default { setUser, modifyPassword }