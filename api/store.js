import http from '@/http/api.js'

// 门店列表
const storeList = () => {
    return http.request({
        url: '/blade-system/dept/selectStore',
        method: 'POST',
        params:{
            deptCategory:'5',
            tenantId:'123456'
        }
    })
}

// 改变门店
const changeStore = (params) => {
    return http.request({
        url: '/blade-system/dept/changeStore',
        method: 'POST',
        data:params
    })
}


export default {
    storeList,
    changeStore
}
