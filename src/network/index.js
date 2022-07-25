// 当前这个模块:API进行统一管理
import { request } from "./request";
import { mockRequest } from "./mockRequest";

// 三级联动菜单接口
// /product/getBaseCategoryList
export const getCategoryList = ()=>{
    return request({
        url: "/product/getBaseCategoryList",
        methods: "get"
    })
}
export const getBannerList = ()=>{
    return mockRequest({
        url: "/banner",
        methods: "get"
    })
}
export const getFloorList = ()=>{
    return mockRequest({
        url: "/floors",
        methods: "get"
    })
}
// 获取搜索列表
export const getSearchInfo = (args)=>{
    return request({
        url: "/list",
        method: "post",
        data:args
    })
}
// 获取商品详情
export const getDetailInfo = (skuid)=>{
    return request({
        url: `/item/${skuid}`,
        method: 'get',
    })
}
// 添加商品到购物车
export const addShopCart = (skuId,skuNum) =>{
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}
// 获取购物车列表
export const getCartList = ()=> {
    return request({
        url:'/cart/cartList',
        methods: 'get'
    })
}
// 改变商品的选取状态
export const changeChecked = (skuId,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
// 删除商品
export const deleteSku = (skuId)=> {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}
// 获取验证码
export const getCode = (phone)=> {
    return request({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}
// 用户注册
export const register = (phone,password,code)=>{
    return request({
        url: '/user/passport/register',
        method: 'post',
        data: {phone,password,code}
    })
}
// 用户登录
export const userLogin = (phone,password)=>{
    return request({
        url: '/user/passport/login',
        method: 'post',
        data: {phone,password}
    })
}
// 根据token获取用户信息
export const getUserInfo = ()=>{
    return request({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}
// 退出登录
export const userLogout = ()=>{
    return request({
        url: '/user/passport/logout',
        method: 'get'
    })
}
