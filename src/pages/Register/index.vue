<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <form>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg" v-show="phone==''||isMessage">{{message}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="storeCode">
        <button class="getCode-btn" @click="getCode">获取验证码</button>
        <span class="error-msg" v-show="code==''">请输入验证码</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="current-password" placeholder="请输入你的登录密码" v-model="password" @blur="isMatch">
        <span class="error-msg" v-show="!flag">两次输入的密码不一致</span>
        <span class="error-msg" v-show="password==''&&confirmPassword==''">请输入密码</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="new-password" placeholder="请输入确认密码" v-model="confirmPassword" @blur="isMatch">
        <span class="error-msg" v-show="!flag">两次输入的密码不一致</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" @change="isAgree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="!agree">请同意《尚品汇用户协议》</span>
      </div>
      <div class="btn">
        <button :disabled="!agree" @click="register">完成注册</button>
      </div>
      </form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        // 手机号
        phone: '',
        // 验证码
        code: '',
        // 密码
        password:'',
        // 再次确认密码
        confirmPassword:'',
        // 用户协议
        agree: true,
        flag: true,
        message: '请输入手机号',
        isMessage: false
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        if(this.phone) {
          this.$store.dispatch("reqGetCode",this.phone).then(res=>{
            if(res.code==200) {
              this.code = res.data
            }
          })
        }
      },
      isMatch() {
        this.flag = this.password==this.confirmPassword ? true : false
      },
      isAgree() {
        this.agree = this.agree==true? false:true
        console.log(this.agree);
      },
      register() {
        if(this.phone&&this.password&&this.flag==true&&this.code&&this.agree==true) {
          this.$store.dispatch("reqRegister",{phone:this.phone,password:this.password,code:this.code}).then(res=>{
            console.log(res);
            if(res.code==200) {
              this.$router.push("/login")
            }else if(res.code==223) {
              this.message = res.message
              this.isMessage = true
            }
          })
        }else {
          alert("用户信息不完整,请重新输入")
        }
      }
    },
    computed: {
      storeCode() {
        return this.$store.state.user.code
      },
      
    }
  }
</script>

<style lang="less" scoped>
.getCode-btn {
  width: 90px;
  height: 38px;
}
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      div {
        height: 30px;
      }

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 0;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 120%;
          left: 495px;
          color: red;
          font-size: 12px;
        }
      }

      .controls {
        text-align: center;
        position: relative;
        top: 10px;
        left: 28px;

        input {
          vertical-align: middle;
          margin-top: -3px;
        }

        .error-msg {
          position: absolute;
          top: 70%;
          left: 468px;
          color: red;
          font-size: 12px;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>