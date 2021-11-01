import http from '@/http/api.js'

// 充值
const rechargeMoney = (params) => {
    return http.request({
        url: '/blade-system/balancerechargerecord/recharge',
        method: 'POST',
        params:params
    })
}


export default {
    rechargeMoney,
}
