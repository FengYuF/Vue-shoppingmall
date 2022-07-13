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
export const getSearchInfo = (args)=>{
    return request({
        url: "/list",
        method: "post",
        data:args
    })
}
export const getDetailInfo = (skuid)=>{
    return request({
        url: `/item/${skuid}`,
        method: 'get',
    })
}
export const addShopCart = (skuId,skuNum) =>{
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}
export const getCartList = ()=> {
    return request({
        url:'/cart/cartList',
        methods: 'get'
    })
}
export const changeChecked = (skuId,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
export const deleteSku = (skuId)=> {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}