<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName"><a>x</a></i>
            </li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword"><a>x</a></i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark"><a>x</a></i>
            </li>
            <ul
              class="fl sui-tag"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              <li
                class="with-x"
                :v-show="searchParams.props"
                :data-index="index"
              >
                {{ item.split(":")[1] }}
                <i @click="removeProps"><a>x</a></i>
              </li>
            </ul>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: activeInfo == 0 }">
                  <a data-index="0" @click="defaultChange"
                    >综合
                    <span v-if="searchParams.order.split(':')[1] == 'asc'"
                      >↑</span
                    >
                    <span v-if="searchParams.order.split(':')[1] == 'desc'"
                      >↓</span
                    ></a
                  >
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li :class="{ active: activeInfo == 1 }">
                  <a data-index="1" @click="priceAsc">价格⬆</a>
                </li>
                <li :class="{ active: activeInfo == 2 }">
                  <a data-index="2" @click="priceDesc">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品信息 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                   <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                   </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
          <!-- 分页器 pageNo:当前页数，pageSize:每一页展示多少数据，total:整个分页器需要展示的所有数据数量，continues:分页连续页码 -->
          <pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" continues="5" @pageNoInfo="pageNoInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        // 一级分类
        category1Id: "",
        // 二级分类
        category2Id: "",
        // 三级分类
        category3Id: "",
        // 商品名称
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器,当前第几页
        pageNo: 1,
        // 每一页展示多少条数据
        pageSize: 5,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
      activeInfo: 0,
      flag: 1,
    };
  },
  methods: {
    // 向list请求数据的函数
    getData() {
      this.$store.dispatch("reqGetSearchInfo", this.searchParams);
    },
    // 删除商品分类的面包屑 删除后会重新向服务器请求数据
    removeCategoryName() {
      // 如果使用空字符串制空参数, 性能优化差了点, 可以选择使用undefined来替代"",这样提交参数发请求时不会携带undefined
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 修改地址栏
      this.$router.push({
        name: "search",
        params: { keyword: this.searchParams.keyword },
      });
    },
    // 删除搜索关键字的面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 修改地址栏
      this.$router.push({
        name: "search",
        query: { categoryName: this.searchParams.categoryName },
      });
    },
    // 点击品牌 请求相应的数据
    trademarkInfo(trademark) {
      // 整理searchParams参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 删除品牌的面包屑
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    // 点击商品属性 请求相应数据
    attrInfo(attr, attrValue) {
      // 点击商品分类属性需要提交商品分类ID,属性名,商品分类名
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      this.searchParams.props.push(props);
      this.getData();
    },
    // 删除商品属性的面包屑
    removeProps(event) {
      let index = event.currentTarget.parentElement.getAttribute("data-index");
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 点击改变价格数据呈升序展示
    priceAsc(event) {
      // 操作DOM
      // event.target.parentNode.className = 'active'
      // 使用Vue操作
      this.activeInfo = event.target.getAttribute("data-index");
      console.log(this.activeInfo);
      this.searchParams.order = `2:asc`;
      this.getData();
    },
    // 点击改变价格数据呈降序展示
    priceDesc() {
      this.activeInfo = event.target.getAttribute("data-index");
      this.searchParams.order = `2:desc`;
      this.getData();
    },
    // 点击改变综合排序
    defaultChange() {
      this.activeInfo = event.target.getAttribute("data-index");
      if (this.flag == 0) {
        this.searchParams.order = `1:desc`;
        this.flag = 1;
      } else if (this.flag == 1) {
        this.searchParams.order = `1:asc`;
        this.flag = 0;
      }
      this.getData();
      console.log(this.searchParams.order.split(":")[1]);
    },
    // 获取子组件参数
    pageNoInfo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  // 计算属性:简化数据格式
  computed: {
    goodsList() {
      return this.$store.getters.goodsList;
    },
    trademarkList() {
      return this.$store.getters.trademarkList;
    },
    attrsList() {
      return this.$store.getters.attrsList;
    },
    total() {
      return this.$store.state.searchInfo.total
    }
  },
  // mounted: 组件挂载完毕之后触发
  mounted() {
    // 组件挂在完毕之后向服务器请求数据
    this.getData();
  },
  // beforeMount: 组件挂载完毕之前触发
  beforeMount() {
    // 在组件挂载完毕之前将searchParams的参数进行整合
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化,如果发生变化,则再次发送请求
    $route(newValue, oldValue) {
      // 1 合并参数之前 先把1、2、3级分类的id制空，防止请求参数时出错
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // 2 当路由信息发生变化时,再次重新合并参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      // 3 参数合并完毕之后再次发送请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  height: 50px;
  text-align: center;
}
.props-ul li {
  float: left;
}
#SearchSelector {
  position: relative;
  z-index: 10;
}
.main {
  position: relative;
  top: 50px;
  left: 0;
  width: 1200px;
  margin: 0 auto;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        height: 15px;
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        position: relative;
        z-index: 11;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      position: relative;
      z-index: 11;
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            list-style: none;
            font-size: 12px;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.span {
  height: 40px;
  line-height: 40px;
}
</style>