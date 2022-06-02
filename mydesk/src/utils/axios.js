import axios from 'axios';
console.log('loading axios');

// request time out
axios.defaults.timeout = 30000
//Cross-domain request, allow to save cookies
axios.defaults.withCredentials = true


// HTTP request interception
axios.interceptors.request.use(
    config => {
        console.log('request interceptor-success:', config.url, config);
        //TODO: add token to header --get token from vuex
        config.headers['X-Token'] = 'token'
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
        console.log('response.config.retryToken ', response.config.retryToken, isTokenValid(response.data.code, 1));
        if (response.config.retryToken && isTokenValid(response.data.code, 1)) { //TODO:this condition should be modify depends on your business
            console.log('token invalidation re-request failed response:', response.config.url);
            return Promise.reject('retry failed')
        }
        //expired refresh token
        if (isTokenValid(response.data.code, 1)) { //TODO:this condition should be modify depends on your business
            console.log('refresh token');
            return refreshToken().then(res => {
                console.log('refreshToken:', res);
                //get new token in response
                let token = '9999'
                //TODO: Vue.setToken(token) --save token
                let config = response.config
                console.log('previously failed request config', config.url, config);
                config.headers['X-Token'] = token
                config.baseURL = ''
                //Send the previously failed request 
                //TODO:fix the url, remove the '?name=test' (now,it's just a test url)
                return retryRequest(config.url + '?name=test', { retryToken: true })
            }).catch(res => {
                console.log('refresh token fail。。。', res.data);
                return Promise.reject('refresh token failed')
            })
        } else {
            //not expired,no need to refresh the token
            return response
        }
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
    let url = "/auth";
    return retryRequest('/local' + url, { retryToken: true }).then(res => {
        if (res.status == 200) { //refresh token success
            return res.data
        } else { 
            console.log('刷新auth 失败');
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
function isTokenValid (source, target) {
    if (source == target) {
        return true
    }
    return false
}

export default axios
