import qs from 'qs'
import axios from 'axios'
import store from '@/store' // vuex  store 对象

window.axios = axios
window.axios.defaults.timeout = 0

export async function getDefaultHeaders () {
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  return headers
}

// 添加请求拦截器
window.axios.interceptors.request.use(
  async config => {
    // 在发送请求之前做些什么
    store.commit('updateLoadingStatus', {
      isLoading: true
    })
    process.env.NODE_ENV === 'production' && Object.assign(config.headers, await getDefaultHeaders())

    return config
  }, error => {
    // 对请求错误做些什么
    store.commit('updateLoadingStatus', {
      isLoading: false
    })
    console.error('请求错误:', error)
    return Promise.reject(error)
  })

// 添加响应拦截器
window.axios.interceptors.response.use(
  response => {
    store.commit('updateLoadingStatus', {
      isLoading: false
    })
    return Promise.resolve(response)
  },
  error => {
    store.commit('updateLoadingStatus', {
      isLoading: false
    })
    let errorMsg
    // 对响应错误做点什么
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          errorMsg = '请求错误(400)'
          break
        case 401:
          errorMsg = '未授权，请重新登录(401)'
          break
        case 403:
          errorMsg = '拒绝访问(403)'
          break
        case 404:
          errorMsg = '请求出错(404)'
          break
        case 408:
          errorMsg = '请求超时(408)'
          break
        case 500:
          errorMsg = '服务器错误(500)'
          break
        case 501:
          errorMsg = '服务未实现(501)'
          break
        case 502:
          errorMsg = '网络错误(502)'
          break
        case 503:
          errorMsg = '服务不可用(503)'
          break
        case 504:
          errorMsg = '网络超时(504)'
          break
        case 505:
          errorMsg = 'HTTP版本不受支持(505)'
          break
      }
    }
    console.error('errorMsg', error)
    let errorData = {data: errorMsg}
    return errorMsg ? Promise.reject(errorData) : Promise.reject(error.response)
  }
)

// 响应成功
function checkStatus (res) {
  // 如果http状态码正常，则直接返回数据
  if (res && (res.status <= 400)) {
    return res
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    // 异常状态下，把错误信息返回去    // return res
    console.error(res, '网络异常')
    return Promise.reject(res.data)
  }
}

// 响应失败
function checkCode (response) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  let error = response.data

  if (error) {
    if (error.errors) {
      let arr = error.errors
      for (let i in arr) {
        error = arr[i][0]
      }
    } else {
      error = error.message || error.err_msg || error
    }

    console.error('响应失败, Error报错提示：', error, response)
    return Promise.reject(error)
  }
}

export default {
  get: (url, params, config = {}) => {
    return window.axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      withCredentials: true,
      headers: config.headers || {}
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return checkCode(err)
    })
  },

  post: (url, data, config = {}) => {
    return window.axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: config.headers || {}
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return checkCode(err)
    })
  },

  upload: (url, data, config = {}) => {
    return window.axios({
      method: 'post',
      url,
      data: data,
      headers: config.headers || {}
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return checkCode(err)
    })
  },

  put: (url, params, config = {}) => {
    return window.axios({
      method: 'put',
      url,
      data: qs.stringify(params),
      headers: config.headers || {}
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return checkCode(err)
    })
  },

  del: (url, params, config = {}) => {
    return window.axios({
      method: 'delete',
      url,
      data: qs.stringify(params),
      headers: config.headers || {}
    }).then(res => {
      return checkStatus(res)
    }).catch(err => {
      return checkCode(err)
    })
  }
}
