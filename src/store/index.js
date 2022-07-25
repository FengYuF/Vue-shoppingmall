import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { getCategoryList, getBannerList, getFloorList, getSearchInfo, getDetailInfo, addShopCart, getCartList, changeChecked, deleteSku } from '@/network/index'
import {getUUID} from '@/utils/uuid_token'

import user from './user'
// 注册Vuex插件
Vue.use(Vuex)
// state: 仓库存储数据的地方
const state = {
    // state中的数据默认初始值,不能随便写,服务器返回对象，服务器返回数组,[根据服务器接口返回值初始化的]
    categoryList: [],
    commodityList: [],
    bannerList: [],
    floorList: [],
    searchInfo: {},
    detailInfo: {},
    uuid_token: getUUID(),
    cartList: []
}
// mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    COMMODITYLIST(state, commodityList) {
        state.commodityList = commodityList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORSLIST(state, floorlist) {
        state.floorList = floorlist
    },
    GETSEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    },
    GETDETAILINFO(state,detailInfo) {
        state.detailInfo = detailInfo
    },
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
// 处理actions,可以书写自己的业务,也可以处理异步
const actions = {
    async reqGetCategoryList(context) {
        let result = await getCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },
    async reqGetBannerList(context) {
        let result = await getBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    async reqGetFloorList(context) {
        let result = await getFloorList()
        if (result.code == 200) {
            context.commit('GETFLOORSLIST', result.data)
        }
    },
    // search模块的网络请求
    async reqGetSearchInfo(context, args = {}) {
        let result = await getSearchInfo(args)
        if (result.code == 200) {
            context.commit("GETSEARCHINFO", result.data)
        }
    },
    // detail 商品详情数据
    async reqGetDetailInfo(context,skuid) {
        let result = await getDetailInfo(skuid) 
            if(result.code==200) {
                context.commit("GETDETAILINFO",result.data)
            }
    },
    async reqAddShopCart(context,skuInfo) {
        // 向调用该函数的对象返回promise
        return await addShopCart(skuInfo.skuId,skuInfo.skuNum)
    },
    // ShopCart 获取购物车数据
    async reqGetCartList(context) {
        let result = await getCartList()
        if(result.code==200) {
            context.commit("GETCARTLIST",result.data)
        }
    },
    // ShopCart 更改商品选取状态
    async reqChangeChecked(context,skuInfo) {
         return await changeChecked(skuInfo.skuId,skuInfo.isChecked)
    },
    // ShopCart 点击商品全选或不选
    changeAllChecked(context,checked) {
        if(checked) {
            context.state.cartList[0].cartInfoList.forEach(item => {
                item.isChecked=1
                context.dispatch("reqChangeChecked",item)
            });
        }else {
            context.state.cartList[0].cartInfoList.forEach(item => {
                item.isChecked=0
                context.dispatch("reqChangeChecked",item)
            });
        }
    },
    // ShopCart 删除单个商品
    async reqDeleteSku(context,skuId) {
        return await deleteSku(skuId)
    },
    // 删除选中的商品
    deleteCheckedSku(context) {
        let promise;
        if(context.state.cartList.length>0) {
            context.state.cartList[0].cartInfoList.forEach(item => {
                if(item.isChecked==1) {
                    promise = context.dispatch("reqDeleteSku",item.skuId)
                }
            });
        }else {
            alert("购物车里没有商品了")
        }
        return promise
    }
    
}
// getters可以理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {
    // search模块的计算属性
    goodsList(state) {
            return state.searchInfo.goodsList||[]
    },
    trademarkList(state) {
            return state.searchInfo.trademarkList||[]
    },
    attrsList(state) {
            return state.searchInfo.attrsList||[]
    },
    cartList(state) {
        return state.cartList[0]||[]
    }
    
}
const modules = {
    user
}
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 配置对象
    state,
    mutations,
    actions,
    getters,
    modules
})