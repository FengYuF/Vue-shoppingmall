<template>
  <div id="Header">
    <div class="Header-top">
      <main class="main">
      <!-- Header左半部分 -->
        <div class="Header-top-left">
          <ul>
            <li>尚品汇欢迎您!</li>
            <!-- 声明式导航 -->
            <li><router-link to="/login">请登录</router-link></li>
            <li><router-link to="/register">免费注册</router-link></li>
          </ul>
        </div>
        <!-- Header右半部分 -->
        <div class="Header-top-right">
            <ul>
                <li><a href="#">我的订单</a></li>
                <li>|</li>
                <li><router-link to="/ShopCart">我的购物车</router-link></li>
                <li>|</li>
                <li><a href="#">我的尚品汇</a></li>
                <li>|</li>
                <li><a href="#">尚品汇会员</a></li>
                <li>|</li>
                <li><a href="#">企业采购</a></li>
                <li>|</li>
                <li><a href="#">关注尚品汇</a></li>
                <li>|</li>
                <li><a href="#">合作招商</a></li>
                <li>|</li>
                <li><a href="#">商家后台</a></li>
            </ul>
        </div>
        <!-- 图片 -->
        <div class="img-icon">
            <router-link to="/home"><img src="../../assets/images/sph.png" alt=""></router-link>
        </div>
        <!-- 搜索框 -->
        <div class="search">
            <input type="text" v-model="keyword">
            <button @click="toSearch">搜索</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword:''
    }
  },
  methods: {
    // 搜索按钮的回调函数:用于向search路由进行跳转
    toSearch() {
      // 路由传递参数:
      // 第一种:字符串形式
      // this.$router.push('/search' + this.keyword + '?k=' this.keyword.toUpperCase())
      // 第二种:模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种:对象(常用)
      // 在当前组件中，当用户点击了下拉菜单进行跳转时,携带的query需要整合在一起再进行跳转
      if(this.$route.query) {
        let loaction = {name:'search',params:{keyword:this.keyword  || undefined}}
        loaction.query = this.$route.query
        this.$router.push(loaction)
      }else {
        this.$router.push(loaction)
      }
      }
      // this.$router.push('/Search')
  }
    
}
</script>

<style>
@import url("../../assets/css/base.css");
#Header {
  width: 100%;
  height: 175px;
}
.Header-top {
  display: flex;
  position: relative;
  height: 44px;
  background-color: #eaeaea;
  line-height: 44px;
}
/* Header左半部分 */
.Header-top-left {
    position: absolute;
    top: 0;
}
.Header-top-left ul {
  display: flex;
  width: 200px;
  list-style: none;
  font-size: 13px;
}
.Header-top-left ul li {
    flex-direction: row;
  margin-left: 5px;
}
.Header-top-left ul li a {
  text-decoration: none;
  color: black;
}

/* Header右半部分 */
.Header-top-right{
    position: absolute;
    top: 0;
    right: 160px;
    width: 600px;
    font-size: 13px;
}
.Header-top-right ul {
    display: flex;
    list-style: none;
}

.Header-top-right ul li {
    flex-direction: row;
    margin-left: 5px;
}
.Header-top-right ul li a {
    text-decoration: none;
    color: black;
}
/* img */
.img-icon {
    display: inline-block;
    width: 300px;
    position: relative;
    top: 74px;
    left: 50px;
}
/* 搜索框 */
.search {
    position: absolute;
    top: 90px;
    right: 185px;
    display: inline-block;
    width: 610px;
    height: 40px;
}
.search input {
    width: 530px;
    height: 32px;
    border: 2px solid #F75932;
}
.search button {
    width: 70px;
    height: 36px;
    border: none;
    background-color: #F75932;
}
</style>