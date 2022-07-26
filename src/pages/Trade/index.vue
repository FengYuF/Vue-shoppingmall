<template>
  <div class="trade-container">
    <div class="title">填写并核对订单信息</div>
    <div class="trade-info">
      <div class="user-title">收件人信息</div>
      <div class="info" ref="info">
        <div class="user-info">
          <div class="username selected" @click="handler">张三</div>
            <div class="address" @click="handler">模拟地址一</div>
            <div class="phone" @click="handler">11223344556</div>
        </div>
        <div class="user-info">
          <div class="username" @click="handler">李四</div>
            <div class="address" @click="handler">模拟地址二</div>
            <div class="phone" @click="handler">12345677889</div>
        </div>
        <div class="user-info" >
          <div class="username" @click="handler">王五</div>
            <div class="address" @click="handler">模拟地址三</div>
            <div class="phone" @click="handler">16451102377</div>
        </div>
      </div>
      <div class="hr"></div>
      <div class="pay-title">支付方式</div>
      <div class="pay">
        <div class="username pay1">在线支付</div>
        <div class="username pay2">货到付款</div>
      </div>
      <div class="hr"></div>
      <div class="delivery-list">
        <div class="list-title clearfix">送货清单</div>
        <div class="delivery-method clearfix">
          <div class="delivery-title clearfix">配送方式</div>
          <div class="username method1 clearfix">顺丰快递</div>
          <p>占位</p>
        </div>
      </div>
      <div class="goods-list">
        <div class="goods">
          <ul v-for="(goods, index) in tradeInfo.detailArrayList" :key="index">
            <li><img :src="goods.imgUrl" /></li>
            <li class="name">{{ goods.skuName }}</li>
            <li class="price">￥{{ goods.orderPrice }}</li>
            <li class="nums">{{ goods.skuNum }}</li>
            <li class="flag">有货</li>
            <div class="order">7天无理由退货</div>
          </ul>
        </div>
      </div>
      <div class="msg">
        <div class="msg-title">买家留言:</div>
        <textarea name="" id="" cols="160" rows="3"></textarea>
      </div>
      <div class="invoice">
        <div class="invoice-title">发票信息</div>
        <div class="invoice-text">普通发票（电子）&nbsp;个人&nbsp;明细</div>
      </div>
      <div class="coupon">
        <div class="coupon-title">使用优惠/抵用</div>
      </div>
    </div>
    <div class="total">
      <div class="totalpay">
        {{ tradeInfo.totalNum }}件商品,总商品金额:
        <span style="color: #da5a52; font-weight: bold"
          >￥{{ tradeInfo.totalAmount }}</span
        >
      </div>
      <div>返现: 0.00</div>
      <div>运费: 0.00</div>
    </div>
    <div class="submit-info">
      <div class="pay-price">
        应付金额:<span style="color: #da5a52; font-weight: bold"
          >￥{{ tradeInfo.totalAmount }}</span
        >
      </div>
      <div class="message">
        寄送至：{{ userInfo.address }}&nbsp;收货人：{{ userInfo.userName
        }}{{ userInfo.phone }}
      </div>
    </div>
    <button class="btn">提交订单</button>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  name: "Trade",
  data() {
    return {
      userInfo: {
        userName: "张三",
        address: "模拟地址一",
        phone: "11223344556",
      },
    };
  },
  methods: {
    handler(event) {
      console.log(this.$refs.info.childNodes[0]);
      for (let i = 0;i < this.$refs.info.childNodes[0].childNodes.length;i++
      ){
        this.$refs.info.childNodes[i].childNodes[0].className = "username";
      }
      event.target.parentNode.children[0].className = "username selected";
      this.userInfo.userName = event.target.parentNode.children[0].innerHTML;
      this.userInfo.address = event.target.parentNode.children[1].innerHTML;
      this.userInfo.phone = event.target.parentNode.children[2].innerHTML;
    },
  },
  mounted() {
    this.$store.dispatch("reqTradeInfo");
  },
  computed: {
    tradeInfo() {
      return this.$store.state.tradeInfo || {};
    },
  },
};
</script>

<style scoped>
.btn {
  width: 100px;
  height: 50px;
  color: #FFF;
  background-color: #F1361B;
  border: 1px solid #F1361B;
  font-weight: bold;
  float: right;
  margin: 10px 50px 0 0;
}
.submit-info {
  position: relative;
  width: 1420px;
  height: 100px;
  margin: 0 auto;
  background-color: #f5f5f5;
  margin-top: 100px;
  border: 1px solid #eaeaea;
}
.submit-info .pay-price {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
}
.submit-info .message {
  position: absolute;
  top: 50px;
  right: 10px;
  font-size: 12px;
  color: #9b9b9b;
}
.total {
  display: inline-block;
  position: absolute;
  right: 160px;
  margin-top: 10px;
  font-size: 14px;
}
.total div {
  margin: 10px 0;
}
.msg-title {
  margin: 10px 0;
  font-weight: bold;
}
.invoice-title {
  margin: 10px 0;
  font-weight: bold;
}
.invoice-text {
  margin: 10px 0 10px 30px;
  font-size: 14px;
}
.coupon {
  margin-top: 20px;
  font-weight: bold;
}
.coupon-title {
  margin: 10px 0;
}
.order {
  position: absolute;
  margin-top: 70px;
  margin-left: 160px;
  color: #b57873;
  font-size: 14px;
  font-weight: bold;
}
.goods {
  position: relative;
  font-size: 14px;
}
.goods img {
  width: 125px;
  height: 130px;
  margin-top: 0;
}
.goods ul {
  width: 100%;
  height: 140px;
}
.goods ul li {
  float: left;
}
.goods ul .name {
  width: 900px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods ul li:not(:first-child) {
  margin-top: 20px;
  padding: 0 30px;
}
.goods ul .price {
  color: #c15435;
  font-weight: bold;
}
.title {
  font-weight: bold;
  margin-left: 5%;
  margin-bottom: 10px;
}
.trade-info {
  padding-left: 50px;
  position: relative;
  border: 1px solid #e4e4e4;
  width: 90%;
  margin: 0 auto;
}
.user-title {
  margin-top: 30px;
  padding-bottom: 30px;
  font-weight: bold;
}
.user-info {
  font-size: 14px;
  width: 100%;
  height: 50px;
  margin-left: 30px;
  line-height: 30px;
}
.user-info:hover .address {
  background-color: #DDDDDD;
}
.user-info:hover .phone {
  background-color: #DDDDDD;
}
.user-info div {
  margin: 0;
}
.user-info .address {
  display: inline-block;
  width: 280px;
  height: 30px;
  margin-left: 20px;
}
.user-info .phone {
  width: 300px;
  height: 30px;
  display: inline-block;
}
.user-info a {
  display: inline-block;
  width: 700px;
  height: 32px;
  line-height: 32px;
}
.user-info a:hover {
  background-color: #dddddd;
}
.hr {
  width: 90%;
  border: 1px solid #e5e5e5;
  position: absolute;
  top: 220px;
}
.pay-title {
  margin-top: 30px;
  padding-bottom: 30px;
  font-weight: bold;
}
.pay {
  margin-left: 30px;
  height: 50px;
}
.pay .pay1 {
  margin-right: 10px;
}
.delivery-title {
  margin-left: 30px;
  font-weight: bold;
}
.delivery-method {
  height: 100px;
  background-color: #efefef;
  margin-top: 10px;
  padding-top: 30px;
}
.delivery-method p {
  display: inline-block;
  margin-top: 25px;
  margin-left: 10px;
}
.list-title {
  font-weight: bold;
}
.method1 {
  margin-top: 20px;
  margin-left: 100px;
  border: 1px solid #e6e4e4;
}

.username {
  float: left;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  position: relative;
}

.username::after {
  content: "";
  display: none;
  width: 13px;
  height: 13px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: url(./images/choosed.png) no-repeat;
}

.username.selected {
  border-color: #e1251b;
}

.username.selected::after {
  display: block;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>
