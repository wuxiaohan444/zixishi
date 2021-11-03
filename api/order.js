import http from '@/http/api.js'

// 订单
const orderList = (params) => {
    return http.request({
        url: '/bill/presaleorder/myOrder',
        method: 'get',
        data:params
    })
}

// 订单
const cancelOrder = (params) => {
    return http.request({
        url: '/bill/presaleorder/cancelOrder',
        method: 'post',
        data:params
    })
}

// 订单
const orderDetail = (params) => {
    return http.request({
        url: '/bill/presaleorder/detail',
        method: 'get',
        data:params
    })
}

export default {
    orderList,
    cancelOrder,
    orderDetail
}
