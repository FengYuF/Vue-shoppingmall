import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue使用插件
Vue.use(VueRouter)

// 懒加载路由
const Home = () => import('../pages/Home/index.vue')
const Search = () => import('../pages/Search/index.vue')
const Login = () => import('../pages/Login/index.vue')
const Register = () => import('@/pages/Register/index.vue')
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
const router = new VueRouter({
    routes:[
        // 重定向
        {
            path: '',
            redirect: '/home',
        },
        {
            path: '/Trade',
            name: 'trade',
            component: ()=> import('@/pages/Trade/index'),
            meta:{
                show: true
            }
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
// 配置全局路由守卫 用于判断是否为登陆状态
router.beforeEach((to, from,next) => {
    let token = localStorage.getItem("TOKEN")
    // 如果持有token,并且登录了,不能再次跳转到login页面
    if(token) {
        if(to.path=="/login") {
            next(from.path)
        }else{
            next()
        }
    // 如果没有token,并且没有登录,只能进入home/register/login页面,其他的一律重定向为login页面
    }else if(token==null){
        if(to.path=="/home") {
            next()
        }else if(to.path=="/register"){
            next()
        }else if(to.path=="/login") {
            next()
        }else if(to.path=="/search") {
            next()
        }else {
            next("/login")
        }
    }
    next()
  })

export default router