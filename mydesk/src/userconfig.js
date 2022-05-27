import Vue from 'vue'
let config = Vue.config
/**
 * 测试环境
 */
if (process.env.NODE_ENV == 'development') {
    console.log('加载测试环境配置');
    config.apiPrefix = 'http://cnrud.baiyyy.com:81/api' // 测试环境base url
    config.appToken = 'a3a31824f74d04441e239d410adc1105' //测试环境密钥
}
/**
 * 正式环境
 */
if (process.env.NODE_ENV == 'production') {
    console.log('加载正式环境配置');
    config.apiPrefix = 'http://172.16.2.169:8840' // 正式环境base url
    config.appToken = '6a06b7207b4e681b78c03cd45bf25951' //正式环境密钥
}
export default config