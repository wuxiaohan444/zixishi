import http from '@/http/api.js'

//输码验券校验接口
const prepareMeituan = (params) => {
    return http.request({
        url: '/meituan/tuangou/receipt/prepare',
        method: 'post',
        data:params
    })
}

//输码验券校验接口
const MeituanConsume = (params) => {
    return http.request({
        url: '/meituan/tuangou/receipt/consume',
        method: 'post',
        data:params
    })
}


export default {
    prepareMeituan,
    MeituanConsume
}
