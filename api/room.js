import http from '@/http/api.js'

// 订单
const roomList = (params) => {
    return http.request({
        url: '/blade-system/room/list',
        method: 'post',
        data:params
    })
}

// 订单
const seatList = (params) => {
    return http.request({
        url: 'blade-system/seat/list',
        method: 'post',
        params:params
    })
}

export default {
    roomList,
    seatList
}
