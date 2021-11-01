import http from '@/http/api.js'

// 预定时长卡
const mySeatList = (params) => {
    return http.request({
        url: '/blade-system/durationcardrechargerecord/mySeat',
        method: 'POST',
        params:params
    })
}


export default {
    mySeatList,
}
