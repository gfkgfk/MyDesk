import Vue from 'vue'
let config = Vue.config
/**
 * Development Environment
 */
if (process.env.NODE_ENV == 'development') {
    console.log('Development environment config loaded');
    config.apiPrefix = 'http://cnrud.baiyyy.com:81/api' // development env base url
    config.appToken = 'a3a31824f74d04441e239d410adc1105' //development env appkey or token...
    config.mockMode = true // enable/disable mock mode
}
/**
 * Production Environment
 */
if (process.env.NODE_ENV == 'production') {
    console.log('Production environment config loaded');
    config.apiPrefix = 'http://172.16.2.169:8840' // production env base url
    config.appToken = '6a06b7207b4e681b78c03cd45bf25951' //production env appkey or token...
    config.mockMode = false // enable/disable mock mode
}

export default config