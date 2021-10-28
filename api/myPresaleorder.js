import http from '@/http/api.js'


// 我的预定
const myPresaleorderList = (params) => {
    return http.request({
        url: '/bill/presaleorder/myPresaleorder',
        method: 'POST',
        params:params
    })
}

export default {
    myPresaleorderList
}
