<template>
  <div id="type-nav">
    <div class="hr"></div>
    <div class="main">
      <!-- 导航栏 -->
      <ul class="nav1" ref="nav1">
        <li class="nav1-li">
          <div class="nav1-li-div" @mouseenter="nav2Show" @mouseleave="nav2Hide"><span @mouseenter="changeZIndexUp" @mouseleave="changeZIndexDown">全部商品分类</span>
          <transition name="sort">
            <ul class="nav2" @click="toSearch" v-show="show">
              <li
                class="nav2-li"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="enterNav3li"
                @mouseleave="leaveNav3li"
                :data-index="index"
              >
                <span><a
                  class="c1a"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                </span>
                <div class="nav3-box" v-show="c1.categoryId == dataIndex">
                  <ul class="nav3">
                    <li
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <div :data-index-c2="index">
                        <strong>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </strong>
                      </div>
                      <ul class="nav4">
                        <li v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          |
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </transition>
          </div>
        </li>
        <li class="nav1-li"><a href="#">服装城 </a></li>
        <li class="nav1-li"><a href="#">美妆馆 </a></li>
        <li class="nav1-li"><a href="#">尚品汇超市 </a></li>
        <li class="nav1-li"><a href="#">全球购 </a></li>
        <li class="nav1-li"><a href="#">闪购 </a></li>
        <li class="nav1-li"><a href="#">团购 </a></li>
        <li class="nav1-li"><a href="#">有趣 </a></li>
        <li class="nav1-li"><a href="#">秒杀 </a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      dataIndex: "",
      dataIndexC2: "",
      flag: false,
      show: true,
    };
  },
  methods: {
    enterNav3li(event) {
      this.dataIndex = event.target.getAttribute("data-index");
      this.dataIndex++;
      this.$refs.nav1.style.zIndex = 20
    },
    leaveNav3li(event) {
      this.dataIndexC2 = this.dataIndex;
      this.dataIndex = "";
      this.$refs.nav1.style.zIndex = 9
    },
    toSearch(event) {
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      let loaction = { name: "search"};
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
      }
      loaction.query = query;
      if(this.$route.params) {
        loaction.params = this.$route.params
        this.$router.push(loaction);
      }else {
        this.$router.push(loaction);
      }
    },
    nav2Show() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    nav2Hide() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    changeZIndexUp() {
      this.$refs.nav1.style.zIndex = 20
    },
    changeZIndexDown() {

        this.$refs.nav1.style.zIndex = 8
    }
  },
  computed: {
    categoryList() {
      return this.$store.state.categoryList;
    },
  },
  // 当组件挂载完毕,可以向服务器发送请求
  mounted() {
    // 通知Vuex发请求,获取数据,存储与仓库当中
    this.$store.dispatch("reqGetCategoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    } else {
      this.show = true;
    }
  },
};
</script>

<style>
@import url("@/assets/css/base.css");
/*nav1*/
.hr {
  position: absolute;
  top: 215px;
  width: 100%;
  z-index: 8;
  border-bottom: 2px solid #f33616;
}
.main {
  position: relative;
}
.nav1 {
  position: absolute;
  z-index: 9;
  left: 0;
  display: flex;
  margin: 0 auto;
  list-style: none;
}
.nav1 .nav1-li {
  height: 500px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  line-height: 27px;
}
.nav1 .nav1-li:not(:nth-child(1)) {
  height: 55px;
}
.nav1 .nav1-li .nav1-li-div {
  width: 197px;
  height: 40px;
  background-color: #f33616;
  text-align: center;
}
.nav1 .nav1-li .nav1-li-div span {
  display: inline-block;
  width: 197px;
  height: 100%;
}
.nav1 .nav1-li:nth-child(1) {
  width: 197px;
}
.nav1 .nav1-li a {
  text-decoration: none;
  color: black;
}

/*nav2*/
.nav2 {
  width: 197px;
  height: 461px;
  list-style: none;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  background-color: #F9F9F9;
}
/* 过渡动画的样式 */
/* 过渡动画的显示 */
.sort-enter {
  height: 0px;
  background-color: rgba(255, 255, 255, 0);
}
/* 过度动画结束时 */
.sort-enter-to {
  height: 461px;
  background-color: #F9F9F9;
}
/* 定义动画时间,速度 */
.sort-enter-active {
  transition: all .4s linear;
  overflow: hidden;
}
/* 过渡动画的隐藏 */
.sort-leave {
  height: 461px;
  background-color: #F9F9F9;
}
.sort-leave-to {
  height: 0;
  background-color: rgba(255, 255, 255, 0);
}
.sort-leave-active {
  transition: all .3s linear;
  overflow: hidden;
}
.nav2 .nav2-li span{
  padding-left: 20px;
  
}
.nav2 .nav2-li .c1a {
  display: inline-block;
  width: 197px;
  height: 27px;
}
.nav2 .nav2-li:hover {
  width: 190px;
  padding-left: 5px;
  background-color: skyblue;
  text-decoration: #f33616;
}
.nav3-box {
  position: absolute;
  left: 215px;
  top: 72px;
  z-index: 10;
  width: 875px;
  height: 460px;
  margin-top: -32px;
  background-color: #fafafa;
  border: 1px solid #d7d7d7;
}
.nav3-box .nav3 {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  width: 60px;
  height: 450px;
  list-style: none;
  padding-top: 10px;
  padding-left: 15px;
}
.nav3-box .nav3 li {
  position: relative;
  flex: 1;
  height: 20px;
  color: #505554;
  font-size: 12px;
}
/* nav4 */
.nav4 {
  list-style: none;
  width: 750px;
}
.nav4 li {
  position: absolute;
  left: 60px;
  top: -27px;
  float: left;
  padding: 0 3px;
  font-size: 12px;
  height: 30px;
}
</style>