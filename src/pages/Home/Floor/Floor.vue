<template>
  <div class="floor">
    <div class="top-item">
      <div class="top-item-left">
        <h3>{{floorList.name}}</h3>
      </div>
      <div class="top-item-right">
        <ul>
          <li v-for="(item,index) in floorList.navList" :key="index"><a :href="item.url">{{item.text}}</a></li>
        </ul>
      </div>
    </div>
    <div class="floor-content">
      <div class="content-item1">
        <div class="top">
          <ul>
            <li v-for="(keyword,index) in floorList.keywords" :key="index"><a href="#">{{keyword}}</a></li>
          </ul>
        </div>
        <div class="img">
          <img :src="floorList.imgUrl" alt="错误">
        </div>
      </div>
      <div class="content-item2">
        <div class="block">
      <!-- element-ui 轮播图 -->
      <el-carousel type="" height="359px" ref="carousel">
        <el-carousel-item v-for="carousel in floorList.carouselList" :key="carousel.id">
          <img :src="carousel.imgUrl" alt="错误" />
        </el-carousel-item>
      </el-carousel>
    </div>
      </div>
      <div class="content-item3">
        <img :src="floorList.recommendList[0]" alt="错误">
        <img :src="floorList.recommendList[1]" alt="错误">
      </div>
      <div class="content-item4">
        <img :src="floorList.bigImg" alt="错误">
      </div>
      <div class="content-item5">
        <img :src="floorList.recommendList[2]" alt="错误">
        <img :src="floorList.recommendList[3]" alt="错误">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props:['list'],
  data() {
    return {
      floorList: this.list
    }
  }
};
</script>

<style>
.block {
  position: relative;
  z-index: 10;
  overflow: hidden;
  width: 329px;
}
.el-carousel:hover .el-carousel__button{
  display: block;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  width: auto;
}

.el-carousel__item:nth-child(2n + 1) {
  width: auto;
}

/* floor */
.floor {
  width: 1200px;
  height: 450px;
  margin: 0 auto;
  font-size: 12px;
}
.top-item {
  position: relative;
  left: 0;
  top: 0;
  margin: 0 auto;
  width: 1200px;
  border-bottom: 2.5px solid #7B2D2E;
  padding-bottom: 10px;
}
.top-item .top-item-left {
  display: inline-block;
}
.top-item .top-item-right {
  position: absolute;
  right: 0;
  display: inline-block;
}
.top-item .top-item-right ul {
  display: flex;
  list-style: none;
}

.top-item .top-item-right ul li {
  flex-direction: row;
  margin: 0 5px;
}
.top-item .top-item-right ul li:not(:last-child)::after {
  content: "|";
  margin-left: 5px;
}
.top-item .top-item-right ul li a {
  text-decoration: none;
  color: black;
}
.top-item .top-item-right ul li:only-child(:first-child) {
  color: red;
}

/* content-item */
.floor-content {
  position: relative;
  top: 0;
  height: 340px;
}
.floor-content .content-item1 {
  display: inline-block;
  height: 340px;
  width: 210px;
  padding-top: 15px;
  background-color: #FCFCFC;
}
.floor-content .content-item1 ul{
  display: flex;
  width: 210px;
  flex-wrap: wrap;
}
.floor-content .content-item1 ul li{
  width: 60px;
  padding: 5px 18px;
  text-align: center;
  list-style: none;
}
.floor-content .content-item1 ul li a{
  display: inline-block;
  width: 70px;
  color: #2B1C1F;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid #EBEBEB;
}
.img {
  position: relative;
  top: -60px;
  left: -45px;
}
.floor-content {
  width: 1300px;
  display: inline-block;
}
/* content-item1 */
.floor-content .content-item1 {
  float: left;
}
/* content-item2 */
.floor-content .content-item2 {
  float: left;
  width: 329px;
}
/* content-item3 */
.floor-content .content-item3 {
  float: left;
  width: 219px;
}
.floor-content .content-item4 {
  float: left;
  width: 220px;
}
.floor-content .content-item5 {
  float: left;
  width: 220px;
}
</style>
