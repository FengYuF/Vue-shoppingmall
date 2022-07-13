import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue使用插件
Vue.use(VueRouter)

// 懒加载路由
const Home = () => import('../pages/Home/index.vue')
const Search = () => import('../pages/Search/index.vue')
const Login = () => import('../pages/Login/index.vue')
const Register = () => import('../pages/Register/index.vue')
const Detail = () => import('@/pages/Detail/index.vue')
// 备份push/replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push/replace
// 第一个参数:跳转的路径以及传递的参数
// 第二个参数:成功的回调
// 第三个参数:失败的回调
    VueRouter.prototype.push = function(location,resolve,reject) {
        if(resolve && reject) {
            // 因为该originPush的this指向为windows
            // 所以需要使用call()方法,将originPush的this篡改为VueRouter实例的对象
            originPush.call(this,location,resolve,reject)
        }else {
            originPush.call(this,location,()=>{},()=>{})
        }
    }
VueRouter.prototype.replace = function(loaction,resolve,reject) {
    if(resolve && reject) {
        // 因为该originReplace的this指向为windows
        // 所以需要使用call()方法,将originReplace的this篡改为VueRouter实例的对象
        originReplace.call(this,loaction,resolve,reject)
    }else {
        originReplace.call(this,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    routes:[
        // 重定向
        {
            path: '',
            redirect: '/home',
        },
        {
            path: '/ShopCart',
            name: 'shopCart',
            component: ()=> import('@/pages/ShopCart/index'),
            meta: {
                show: true
            }
        },
        {
            path: '/AddCartSuccess',
            name: 'addCartSuccess',
            component: ()=> import('@/pages/AddCartSuccess/index'),
            meta: {
                show: true
            }
        },
        {
            path: '/detail/:id',
            component: Detail,
            meta: {
                show: true
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'search', 
            meta: {
                show: true
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return {
            y: 0
        }
      }
})