import http from '@/http/api.js'

// 充值记录
const rechargeList = (params) => {
    return http.request({
        url: '/blade-system/balancerechargerecord/list',
        method: 'POST',
        params:params
    })
}

export default {
    rechargeList
}
