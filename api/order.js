import http from '@/http/api.js'

// 订单
const orderList = (params) => {
    return http.request({
        url: '/bill/presaleorder/myOrder',
        method: 'get',
        data:params
    })
}


export default {
    orderList
}
