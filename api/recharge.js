import http from '@/http/api.js'

// 充值
const rechargeMoney = (params) => {
    return http.request({
        url: '/blade-system/balancerechargerecord/recharge',
        method: 'POST',
        data:params
    })
}

// 充值规则
const rechargeRule = (params) => {
    return http.request({
        url: '/blade-system/tenantrechargerule/list',
        method: 'POST',
        params:params
    })
}


export default {
    rechargeMoney,
    rechargeRule
}
