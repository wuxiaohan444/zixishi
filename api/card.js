import http from '@/http/api.js'

// 时长卡
const timeCardList = (params) => {
    return http.request({
        url: '/settings/timecard/list',
        method: 'get',
        params:params
    })
}


export default {
    timeCardList
}
