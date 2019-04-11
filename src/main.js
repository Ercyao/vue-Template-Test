// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // vuex store 管理

/* 插件管理 start */
import './tools/plugins/ant-design-vue' // ant-design-vue插件
/* 插件 end */

Vue.config.productionTip = false // 去掉vue警告，用于生产不提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 守卫路由
router.beforeEach(function (to, from, next) {
  console.log('切换之前')
  if (to.path === '/') { sessionStorage.clear() } // 清除sessionStorage记录
  if (to.meta.title) { document.title = to.meta.title } // 在路由里面写入的meta里面的title字段

  next()
})
router.afterEach(function (to) {
  console.log('切换之后')
})
