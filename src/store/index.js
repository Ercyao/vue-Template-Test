import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import PopupStore from './modules/popup-store'

Vue.use(Vuex)// 引入某个store对象

const state = {
  isLoading: false, // loading遮罩
  history: []
}

const store = new Vuex.Store({
  namespaced: true, // 希望你的模块具有更高的封装度和复用性
  modules: {
    popup: PopupStore // 弹窗
  },
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newModuleDialogStore = require('./modules/popup-store').default
    // 加载新模块
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
      modules: {
        dialog: newModuleDialogStore
      }
    })
  })
}

export default store
