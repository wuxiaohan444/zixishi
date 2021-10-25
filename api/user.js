import http from '@/http/api.js'

// 获取token
const token = (tenantId, username, password, type) => {
	return http.request({
		url: '/blade-auth/oauth/token',
		method: 'POST',
		header: {
			'Tenant-Id': tenantId
		},
		params: {
			tenantId,
			username,
			password,
			grant_type: "password",
			scope: "all",
			type
		}
	})
}

// 获取用户信息
const userInfo = () => {
	return http.request({
		url: '/blade-user/info',
		method: 'GET',
	})
}

export default {
	token,
	userInfo
}
