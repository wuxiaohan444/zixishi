import http from '@/http/api.js'

// 时长卡列表
const timeCardList = (params) => {
    return http.request({
        url: '/settings/timecard/list',
        method: 'get',
        params:params
    })
}

// 购买时长卡
const timeCardBuy = (params) => {
    return http.request({
        url: '/blade-system/durationcardrechargerecord/buy',
        method: 'post',
        data:params
    })
}

// 定座卡列表
const contractSeatList = (params) => {
    return http.request({
        url: '/settings/bookingsettings/contractseat/list',
        method: 'get',
        params:params
    })
}

// 购买定座卡
const seatCardBuy = (params) => {
    return http.request({
        url: '/bill/presaleorder/buyseatcard',
        method: 'post',
        data:params
    })
}


export default {
    timeCardList,
    timeCardBuy,
    contractSeatList,
    seatCardBuy
}
