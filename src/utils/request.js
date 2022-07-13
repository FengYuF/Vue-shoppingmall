// 对axios二次封装
import axios from 'axios'
export function request(config) {

    // 利用axios对象的方法create,去创建axios实例
    // service就是axios,只不过稍微配置一下
    const service = axios.create({
        // 配置对象
        // 基础路径:发请求的时候,路径当中会出现api
        baseURL: 'http://123.207.32.32:8000',
        // 代表请求超时的时间
        timeout: 5000
    })
    // 请求拦截器
    service.interceptors.request.use((config)=>{

        return config
    })
    service.interceptors.response.use((res)=>{
        // 成功的回调函数:服务器响应,数据回来以后,响应拦截器可以拦截掉,可以做一些业务
        return res.data
    },(error)=>{
        // 服务器响应失败的回调函数
        return Promise.reject(new Error('faile'))
    })



    return service(config)
}