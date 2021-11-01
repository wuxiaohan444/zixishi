import http from '@/http/api.js'
// 获取用户信息
const userInfo = (params) => {
    return http.request({
        url: '/blade-system/member/detailByOpenId',
        method: 'POST',
        params: params
    })
}

export default {
    userInfo
}
