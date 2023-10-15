const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  // devServer:{
  //   proxy:"http://localhost:3001",
  // },
  devServer: {
    proxy: {
      'api' : {
        target: "http://localhost:3001",
        changeOrigin: true,
        ws:false
      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use './scss/_abstracts/index.scss' as *;`,
      },
    },
  },
})
