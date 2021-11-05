import http from '@/http/api.js'

// 我的预定
const myPresaleorderList = (params) => {
    return http.request({
        url: '/bill/presaleorder/myPresaleorder',
        method: 'get',
        params: params
    })
}

// 续费
const presaleorderRenew = (params) => {
    return http.request({
        url: '/bill/presaleorder/renew',
        method: 'post',
        data: params
    })
}

// 开始消费
const startSpending = (params) => {
    return http.request({
        url: '/blade-system/consumerecord/save',
        method: 'post',
        data: params
    })
}

// 结束消费
const finishConsume = (params) => {
    return http.request({
        url: '/blade-system/consumerecord/finishConsume',
        method: 'post',
        data: params
    })
}

// 控制设备
const writeResourceDevice = (params) => {
    return http.request({
        url: '/aqara/writeResourceDevice',
        method: 'post',
        data: params
    })
}

export default {
    myPresaleorderList,
    presaleorderRenew,
    startSpending,
    finishConsume,
    writeResourceDevice
}
