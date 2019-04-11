// 初始状态
const state = {
  title: '', // 不同modal的姓名
  status: false, // 显示的状态
  content: null, // 传递的内容
  confirmButtonText: '', // 按钮文字
  callback: null // 回调函数
}

// 读取数据
const getters = {}

// 数据改变
const mutations = {
  setModalState (state, { title, status = false, content = null, confirmButtonText = null, callback = null }) {
    state.title = title
    state.status = status
    state.content = content
    state.confirmButtonText = confirmButtonText
    state.callback = callback
    console.info('弹窗数据改变', title, status, state)
  },
  closeModal (state) {
    // console.info('closeModal')
    state.status = false
  }
}
// 逻辑响应
const actions = {
  toggleModal ({ state, rootState, commit, dispatch, getters }, payload) {
    // console.info(111,payload)
    commit('setModalState', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
