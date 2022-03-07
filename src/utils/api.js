import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('satoken')
  if (token) {
    config.headers.satoken = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(success => {
  // 业务逻辑错误
  if (success.status && success.status === 200) {
    if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
      Message.error({ message: success.data.msg })
      if(success.data.msg === '未登录或登录已过期，请重新登录！'){
        router.replace('/login')
      }
      return
    }
    if (success.data.msg) {
      Message.success({ message: success.data.msg })
    }
  }
  return success.data
}, error => {
  console.log(error)
  if (error.response.code === 504 || error.response.code === 404) {
    Message.error({ message: '服务器访问失败~' })
  } else if (error.response.code === 403) {
    Message.error({ message: '权限不足，请联系管理员' })
  } else if (error.response.code === 401) {
    Message.error({ message: '尚未登录，请先登录！' })
    router.replace('/')
  } else {
    if (error.response.data.msg) {
      Message.error({ message: error.response.data.msg })
    } else {
      Message.error({ message: '未知错误' })
    }
  }
})
const base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}
// 传送json的put请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}
//
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
//
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
