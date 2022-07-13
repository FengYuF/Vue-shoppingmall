// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来
import banner from './banner.json'
import floors from './floors.json'

// mock数据:第一个参数:请求的地址 第二个参数:请求的数据
Mock.mock("/mock/banner",{code:200,data:banner}) // 模拟首页轮播图的数据
Mock.mock("/mock/floors",{code:200,data:floors})
