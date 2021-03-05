const path = require('path');

module.exports = {
    DOMAIN: {
        ACTIVITY: '/PROXY_ACTIVITY'
    },
    //  proxy 开发接口代理
    proxy: {
        '/PROXY_ACTIVITY': {
			target: "https://api-test-h5.micoworld.net",
			changeOrigin: true,
			pathRewrite: {
				'^/PROXY_ACTIVITY': ''
			},
			logLevel: 'error'
		},
		'/proxyApi': {
			target: "http://api-test.micoworld.net",
			changeOrigin: true,
			pathRewrite: {
				'^/proxyApi': ''
			},
			logLevel: 'error'
		}
    },
}