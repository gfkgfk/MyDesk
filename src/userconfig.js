import Vue from 'vue'
let config = Vue.config
/**
 * Development Environment
 */
if (process.env.NODE_ENV == 'development') {
    console.log('Development environment config loaded');
    config.apiPrefix = 'http://localhost:8080' // development env base url
    config.weatherAppid = '87269931' // weather
    config.appsecret = 'qp53D0Hk' // weather
    config.mockMode = false // enable/disable mock mode
    config.weatherApi='https://www.yiketianqi.com/free/day'
    config.ipApi='http://pv.sohu.com/cityjson?ie=utf-8'
}
/**
 * Production Environment
 */
if (process.env.NODE_ENV == 'production') {
    console.log('Production environment config loaded');
    config.apiPrefix = 'http://localhost:8080' // production env base url
    config.weatherAppid = '87269931' // weather
    config.appsecret = 'qp53D0Hk' // weather
    config.mockMode = false // enable/disable mock mode
    config.weatherApi='https://www.yiketianqi.com/free/day'
    config.ipApi='http://pv.sohu.com/cityjson?ie=utf-8'
}

export default config