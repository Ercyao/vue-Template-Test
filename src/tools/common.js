
// 获取后缀名
export const suffix = (file) => {
  return file.substring(0, file.lastIndexOf('.'))
}

// 时间转换秒数
export const formatTime = (timeTemp) => {
  let m = Math.floor(timeTemp / 60)
  let s = Math.floor(timeTemp % 60)
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}

// 时间格式转时间戳
export function getDate (tm) {
  return Date.parse(new Date(tm)) / 1000
}

// 时间戳转时间格式
export const getLocalTime = (nS) => {
  return new Date(parseInt(nS) * 1000).toLocaleString('chinese', {
    hour12: false
  }).replace(/\//g, '-')
}

// 判断是否是纯数字
export const isIntNumber = (val) => {
  let reg = /^[1-9]\d*$|^0$/
  return String(val).match(reg)
}

// 判断是否是纯数字并且有小数点
export const isFloatNumber = (val) => {
  let reg = /^([1-9][0-9]*|0)(\.[0-9]+)?$/
  return String(val).match(reg)
}

// 判断邮箱格式
export const isEmail = (val) => {
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(val)
}
