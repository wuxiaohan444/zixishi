import http from '@/http/api.js'

// 下单
const generateOrder = (params) => {
    return http.request({
        url: '/bill/presaleorder/generateorder',
        method: 'post',
        data:params
    })
}

// 下单确认
const confirmOrderPay = (params) => {
    return http.request({
        url: '/bill/presaleorder/confirmorderpay',
        method: 'post',
        data:params
    })
}

export default {
    generateOrder,
    confirmOrderPay
}
