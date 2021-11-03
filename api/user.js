import http from '@/http/api.js'
// 获取用户信息
const userInfo = (params) => {
    return http.request({
        url: '/blade-system/member/detailByOpenId',
        method: 'POST',
        params: params
    })
}

// 登录
const login = (params) => {
    return http.request({
        url: '/blade-system/wx/login',
        method: 'POST',
        data: params
    })
}

export default {
    userInfo,
    login
}
