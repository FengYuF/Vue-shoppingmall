import { getCode, getUserInfo, register, userLogin, userLogout } from "@/network"
import { getToken, removeToken } from "@/utils/token"

// 注册与登录的store
const state={
    code:'',
    // 获取存储在localStorage的token
    token: getToken(),
    userInfo: {}
}
const mutations={
    GETCODE(state,code) {
        state.code = code
    },
    // 修改state中的userInfo
    GETUSERINFO(state,userInfo) {
        state.userInfo = userInfo
    },
    // 退出登陆时清除本地数据
    CLEARUSERINFO(state) {
        state.token=''
        state.userInfo={}
        removeToken()   
    },
    
}
const actions={
    // 获取验证码
    async reqGetCode(context,phone) {
        let result = await getCode(phone)
        if(result.code==200) {
            context.commit('GETCODE',result.data)
        }
        return result
    },
    // 注册业务
    async reqRegister(context,userInfo) {
       return await register(userInfo.phone,userInfo.password,userInfo.code)
    },
    // 登录业务
    async reqUserLogin(context,userInfo) {
       return await userLogin(userInfo.phone,userInfo.password)
    },
    // 根据token获取用户信息
    async reqGetUserInfo(context) {
       let result = await getUserInfo()
       if(result.data) {
           context.commit("GETUSERINFO",result.data)
       }
    },
    // 退出登录
    async reqUserLogout(context) {
        context.commit("CLEARUSERINFO")
        return await userLogout() 
    },
}
const getters={
    userInfo() {
        return state.userInfo
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}