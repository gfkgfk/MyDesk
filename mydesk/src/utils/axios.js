import axios from 'axios';
console.log('loading axios');

// request time out
axios.defaults.timeout = 30000
//Cross-domain request, allow to save cookies
axios.defaults.withCredentials = true


// HTTP request interception
axios.interceptors.request.use(
    config => {
        console.log('请求拦截 success:', config);
        console.log('请求拦截 retryToken:', config.retryToken);
        return config
    },
    error => {
        console.log('请求拦截 error:', error);
        return Promise.reject(error)
    },
)

// HTTP response interception
axios.interceptors.response.use(
    response => {
        console.log('响应拦截 response', response);
        console.log('响应拦截 response data', response.data);
        if(response.config.retryToken){
            console.log('token失效重新请求失败的响应',response.config.url);
        }
        //过期刷新token
        if(response.data.code==1){
            console.log('刷新token');
            return refreshToken().then(res=>{
                console.log('Auth验证：',res);
                //response中获取新的token
                let token = '9999'
                // Vue.setToken(token)
                let config = response.config
                console.log('失败请求的config',config.url,config);
                config.headers['X-Token']=token
                config.baseURL = ''
                //发送之前失败的请求
                return axios.get(config.url+'?name=test',{retryToken:true}).then(res => {
                    console.log('axios.create',res);
                    return res.data
                })
            }).catch(res=>{
                console.log('刷新token失败。。。',res);
            })
            console.log('a',a);
        }else{
            //没过期，不刷新token
            console.log('不刷新token');
            console.log(response);
            return response
            // return
        }
        //   const status = Number(res.status) || 200
        //   const message = res.data.message || errorCode[status]
        //   console.log('响应拦截 response: status',status, 'message:',message);
        //   console.log('响应拦截 res: ',res);
        //   if (status === 401) {
        //     router.push('/login')
        //     return
        //   }

        //   if (status !== 200 || res.data.code === 1) {
        //     Message({
        //       message: message,
        //       type: 'error',
        //     })
        //     return Promise.reject(new Error(message))
        //   }
    },
    error => {
        console.log('响应拦截 error: ', error);
        //   return Promise.reject(new Error(error))
        return Promise.reject(error)
    },
)

/**
 * Refresh Token
 * @returns 
 */
function refreshToken () {
    //send request to get token
    let url = "/auth";
    return axios.get('/local' + url).then(res => {
        console.log(res);
        return res.data
    })
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default axios
