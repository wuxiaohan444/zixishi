import http from '@/http/api.js'

// 预定时长卡
const myCardTimeList = (params) => {
    return http.request({
        url: '/blade-system/durationcardrechargerecord/list',
        method: 'POST',
        params:params
    })
}

// 定座卡记录查询
const myCardCustomerList = (params) => {
    return http.request({
        url: '/blade-system/customerseatcardrecord/list',
        method: 'POST',
        params:params
    })
}

export default {
    myCardTimeList,
    myCardCustomerList
}
