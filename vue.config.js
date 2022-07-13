const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置跨域代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn"
      } 
    }
  }
})
