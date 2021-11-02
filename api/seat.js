import http from '@/http/api.js'

// 查询座位下的可售时间列表
const seatTimeList = (params) => {
    return http.request({
        url: '/blade-system/seat/selectseattimeranges',
        method: 'post',
        data:params
    })
}

export default {
    seatTimeList
}
