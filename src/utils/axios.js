import axios from 'axios';
import Vue from 'vue';
import qs from 'qs'
import { mockPathBase } from '@/mock/mock'

console.log('loading axios');

const tokenUrl = '/local/auth' //TODO: change the token url
const tokenKey = 'X-Token' //TODO:config your token key, is that X-Token?

var isRefreshing = false //refreshing token flag
var requests = []  // retry requests queue
axios.defaults.timeout = 30000 // request time out
axios.defaults.withCredentials = true //Cross-domain request, allow to save cookies
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // set post request headers
var mockMode = Vue.config.mockMode

var urls = require('@/api/api') // url config file set

// HTTP request interception
axios.interceptors.request.use(
    config => {
        console.log('request interceptor-success:', config.url, config);
        //TODO: add token to header --get token from vuex
        config.headers[tokenKey] = 'token'
        return config
    },
    error => {
        console.log('request interceptor-error:', error);
        return Promise.reject(error)
    },
)

// HTTP response interception
axios.interceptors.response.use(
    response => {
        console.log('response interceptor-success', response);
        console.log('response.config.retryToken:', response.config.retryToken, 'isTokenInvalid:', isTokenInvalid(response.data.code, 1));
        if (response.config.retryToken && isTokenInvalid(response.data.code, 1)) { //TODO:this condition should be modify depends on your business
            console.log('token invalidation re-request failed response:', response.config.url);
            return Promise.reject('retry failed')
        }
        if (isRefreshing) {
            console.log('refreshing...', 'url:', response.config.url, 'retryToken:', response.config.retryToken);
        }
        //refresh expired token
        if (isTokenInvalid(response.data.code, 1)) { //TODO:this condition should be modify depends on your business
            if (!isRefreshing) {
                console.log('refresh token begin');
                isRefreshing = true // set status to refreshing
                return refreshToken().then(res => {
                    console.log('refreshToken:', res);
                    //get new token in response
                    let token = '9999'
                    //TODO: Vue.setToken(token) --save token
                    let config = response.config
                    console.log('previously failed request config', config.url, config);
                    config.headers[tokenKey] = token
                    config.baseURL = ''

                    //send requests in the cache request queue
                    requests.forEach(cb => cb(token))
                    //clear queue
                    requests = []

                    //Send the previously failed request 
                    return retryRequest(config.url, { retryToken: true })
                }).catch(res => {
                    console.log('refresh token fail。。。', res.data);
                    return Promise.reject('refresh token failed')
                }).finally(() => {
                    console.log('refresh token complete');
                    isRefreshing = false
                })
            } else {
                // is refreshing...Returns a promise that is not resolved
                return new Promise((resolve) => {
                    requests.push((token) => {
                        let cfg = response.config
                        cfg.baseURL = ''
                        cfg.headers[tokenKey] = token
                        resolve(retryRequest(cfg.url, cfg))
                    })
                })
            }
        }


        //not expired,no need to refresh the token
        return response
    },
    error => {
        console.log('response interceptor-error: ', error);
        return Promise.reject(error)
    },
)

/**
 * Refresh Token
 * @returns {Promise}
 */
function refreshToken () {
    //send request to get token
    return retryRequest(tokenUrl, { retryToken: true }).then(res => {
        if (res.status == 200) { //refresh token success
            return res.data
        } else {
            console.log('refreshToken request fail');
            return Promise.reject(res)
        }
    })
}
/**
 * Retry request
 * @param {String} url 
 * @param {Object} config 
 * @returns {Promise}
 */
function retryRequest (url, config) {
    return axios.get(url, config).then(res => {
        console.log('retryRequest:', res);
        return res
    })
}

/**
 * Remind you change the condition
 * @param {Number} source 
 * @param {Number} target 
 */
function isTokenInvalid (source, target) {
    if (source == target) {
        return true
    }
    return false
}

/**
 * Request Wrapper
 * @param {Object} {name: "request api name",data:{request params}} 
 * @returns 
 */
axios.send = function send (obj) {
    console.log(urls.default);
    console.log(obj.name);
    console.log(urls.default[obj.name]);
    if (!urls.default[obj.name]) {
        return Promise.reject('url is not included in config file (api.js config)')
    }
    if (mockMode) {
        let url = mockPathBase + urls.default[obj.name].real
        let data = obj.data
        let type = urls.default[obj.name].type
        return axios.request({
            url: url,
            method: type,
            data: data,
        })

    } else {
        let url = urls.default[obj.name].apiPrefix + urls.default[obj.name].real
        let data = obj.data
        let type = urls.default[obj.name].type
        // Generate get request parameters
        if(type.toUpperCase()=='GET'){
            url+="?"
            for (let key in data) {
                url+=key+"="+data[key]+"&"
            }
        }
        // post request handle
        if(type.toUpperCase()=='POST'){

        }
        return axios.request({
            url: url,
            method: type,
            data: data,
        })
    }
}

export default axios
