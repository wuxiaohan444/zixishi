import http from '@/http/api.js'

// 我的预定
const myPresaleorderList = (params) => {
    return http.request({
        url: '/bill/presaleorder/myPresaleorder',
        method: 'get',
        params:params
    })
}

// 续费
const presaleorderRenew = (params) => {
    return http.request({
        url: '/bill/presaleorder/renew',
        method: 'post',
        data:params
    })
}


export default {
    myPresaleorderList,
    presaleorderRenew
}
