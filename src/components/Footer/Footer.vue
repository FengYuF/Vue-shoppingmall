<template>
  <div id="Footer">
    <div class="main">
      <div class="content">
        <ul>
          <dd>购物指南</dd>
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行/团购</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">购物指南</a></li>
        </ul>
        <ul>
          <dd>购物指南</dd>
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行/团购</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">购物指南</a></li>
        </ul>
        <ul>
          <dd>购物指南</dd>
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行/团购</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">购物指南</a></li>
        </ul>
        <ul>
          <dd>购物指南</dd>
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行/团购</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">购物指南</a></li>
        </ul>
        <ul>
          <dd>购物指南</dd>
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行/团购</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">购物指南</a></li>
        </ul>
        <ul>
          <dd>帮助中心</dd>
        </ul>
      </div>
      <div class="dec">
      <div class="link">
        <ul>
          <li><a href="#">关于我们</a></li>
          <li>|</li>
          <li><a href="#">我的购物车</a></li>
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
          <li>|</li>
          <li><a href="#">关于我们</a></li>
        </ul>
      </div>
      <br>
      <div class="address">xx省xx市xx区xx镇xxxxx</div>
      <div class="beian">京ICP备:xxxxxxxxx</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
@import url("../../assets/css/base.css");
#Footer {
  width: 100%;
  height: 350px;
  background-color: #eaeaea;
  margin-top: 40px;
}
.content {
  height: 200px;
  padding-top: 20px;
  margin-top: 20px;
}
.content ul {
  float: left;
  list-style: none;
  margin-left: 85px;
}
.content ul dd {
  font-size: 18px;
  font-weight: bold;
}
.content ul li {
  margin-top: 3px;
  font-size: 13px;
}
.content ul li a {
  text-decoration: none;
  color: black;
}
.dec {
    font-size: 12px;
    margin-top: 10px;
}
.link {
    padding-left: 75px;
    width: 735px;
    margin: 0 auto;
    margin-top: 10px;
}
.link ul {
    text-align: center;
    list-style: none;
}
.link ul li {
    float: left;
    margin-left: 5px;
}
.link ul li a {
    text-decoration: none;
    color: black;
}
.address {
    width: 162px;
    margin: 0 auto;
    margin-top: 10px;
}
.beian {
    width: 130px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>