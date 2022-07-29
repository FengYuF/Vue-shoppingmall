import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import { Carousel,CarouselItem,MessageBox } from 'element-ui'
Vue.config.productionTip = false
// 引入ElementUI插件
import ElementUI from 'element-ui';
// 使用Vue.use注册ElementUI
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
// 注册组件
Vue.component(Carousel.name,Carousel)
Vue.component(CarouselItem.name,CarouselItem)

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
// 将ElementUi组件挂载到Vue原型中
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$alert = MessageBox.alert

import '@/mock/mockServe'
import { getSearchInfo } from './network'

import * as API from '@/network/index'
new Vue({
  render: h => h(App),
  // 在Vue创建之前在Vue原型里添加全部请求接口函数
  beforeCreate() {
    Vue.prototype.$API = API
  },
  // 注册路由:组件身上都多出一个$route和$router属性
  router,
  // 注册仓库: 组件实例的身上会多出一个$store属性
  store,
}).$mount('#app')
