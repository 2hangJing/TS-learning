/*
 * @Author: monai
 * @Date: 2019-11-28 15:47:03
 * @LastEditors: monai
 * @LastEditTime: 2019-12-04 17:29:32
 */
import axios from 'axios';
import { getToken, getUUID } from './params'

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
axios.adornParams = (params = {}, openDefultParams = true) => {
    let defaults = {
      't': new Date().getTime()
    }
    return openDefultParams ? Object.assign(defaults, params) : params;
}

axios.interceptors.request.use((config)=>{

    //  是否需要头部增加前缀
    let isPrefix = !config.url.startsWith('http');

    if(isPrefix)config.url = DOMAIN.ACTIVITY + config.url;

    //  请求头
    config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        key: getToken() || '1',
        nonce: getUUID(),
        timestamp: Date.now()
    };

    config.timeout = 1000 * 30;

    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default axios; 