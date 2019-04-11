// 初始状态
const state = {
  dialogAlert: {
    title: '温馨提示', // 标题
    content: '弹窗alert数据改变', // 传递的内容
    confirmButtonText: '确定', // 按钮文字
    tip: '', // 底部提示文字
    isShowAlertDialog: false, // 显示的状态
    callback: null // 回调函数
  },
  dialogConfirm: {
    content: '弹窗confirm数据改变', // 传递的内容
    buttons: {
      close: '再考虑下',
      confirm: '确认'
    },
    tip: '', // 底部提示文字
    isShowConfirmDialog: false, // 显示的状态
    callback: null // 回调函数
  },
  msg: {
    type: 'warning', // 消息类型
    description: '', // 传递的内容
    isShowMsg: false, // 显示的状态
    callback: null // 回调函数
  }

}

// 读取数据
const getters = {}

// 数据改变
const mutations = {
  setDialogAlertState (state, dialogAlert) {
    state.dialogAlert.title = dialogAlert.title
    state.dialogAlert.content = dialogAlert.content
    state.dialogAlert.confirmButtonText = dialogAlert.confirmButtonText
    state.dialogAlert.tip = dialogAlert.tip
    state.dialogAlert.isShowAlertDialog = dialogAlert.isShowAlertDialog
    state.dialogAlert.callback = dialogAlert.callback
    console.info('弹窗alert数据改变', dialogAlert)
  },
  closeDialogAlert (state) {
    state.dialogAlert.isShowAlertDialog = false
  },
  setDialogConfirmState (state, dialogConfirm) {
    state.dialogConfirm.title = dialogConfirm.title
    state.dialogConfirm.content = dialogConfirm.content
    state.dialogConfirm.confirmButtonText = dialogConfirm.confirmButtonText
    state.dialogConfirm.tip = dialogConfirm.tip
    state.dialogConfirm.isShowConfirmDialog = dialogConfirm.isShowConfirmDialog
    state.dialogConfirm.callback = dialogConfirm.callback
    console.info('弹窗confirm数据改变', dialogConfirm)
  },
  closeDialogConfirm (state) {
    state.dialogConfirm.isShowConfirmDialog = false
  },
  setMsgState (state, msg) {
    state.msg.type = msg.type
    state.msg.description = msg.description
    state.msg.isShowMsg = msg.isShowMsg
    state.msg.callback = msg.callback
    console.info('弹窗消息数据改变', msg)
  },
  closeMsg (state) {
    state.msg.isShowMsg = false
  }
}
// 逻辑响应
const actions = {
  toggleDialogAlert ({ state, rootState, commit, dispatch, getters }, payload) {
    console.info('Alert弹窗', payload)
    commit('setDialogAlertState', payload)
  },
  toggleDialogConfirm ({ state, rootState, commit, dispatch, getters }, payload) {
    console.info('Confirm弹窗', payload)
    commit('setDialogConfirmState', payload)
  },
  toggleMsg ({ state, rootState, commit, dispatch, getters }, payload) {
    console.info('提示消息', payload, payload.msg)
    commit('setMsgState', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
