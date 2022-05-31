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
        console.log('响应拦截 response.data', response.data);
        let ran = getRandom(1, 2)
        if (ran == 1) {
            console.log('刷新token');
            let a = await refreshToken()
        } else {
            console.log('不刷新token');
            return response
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
async function refreshToken () {
    //send request to get token
    // https://pv.sohu.com/cityjson?ie=utf-8
    let url = "/cityjson";
    return axios.get('/test' + url).then(res => {
        console.log(res.data);
    })
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default axios
