import http from '@/http/api.js'

// 充值记录
const rechargeList = (params) => {
    return http.request({
        url: '/blade-system/balancerechargerecord/list',
        method: 'POST',
        params:params
    })
}

// 使用记录
const usedList = (params) => {
    return http.request({
        url: '/blade-system/balanceusedrecord/list',
        method: 'POST',
        params:params
    })
}

export default {
    rechargeList,
    usedList
}
