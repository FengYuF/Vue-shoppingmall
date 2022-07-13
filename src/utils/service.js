import axios from 'axios'
import {Loading,Message} from 'element-ui'
const ConfigBaseURL = 'http://222.111.33.33:8000'
let loginInstance = null

// axios实例
const Service = axios.create({
    timeout: 5000,
    baseURL: ConfigBaseURL,
    method: 'get',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})


// 添加请求拦截器
Service.interceptors.request.use(config=>{
    loginInstance = Loading.service({
        lock: true,
        text: 'loading...'
    })
    return config
})

// 添加响应拦截器
Service.interceptors.response.use((response)=>{
    loginInstance.close()
    return response.data
},(error=>{
    console.log('TCL:error',error)
    const msg = error.Message != undefined ? error.Message : ''
    Message({
        message: '网络错误' + msg,
        type: 'error',
        duration: 3*1000
    })
    loginInstance.close()
    return Promise.reject(error)
}))