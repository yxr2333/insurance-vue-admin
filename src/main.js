import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import VueQuillEditor from "vue-quill-editor/dist/ssr";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission'
import { deleteRequest, getRequest, postRequest, putRequest } from '@/utils/api' // permission control
import * as echarts from 'echarts'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VueDirectiveImagePreviewer,{
  animate: {
    duration: 350,
    delay: 100
  },
  cursor: 'pointer'
})
Vue.use(preview)
Vue.config.productionTip = false
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.$echarts = echarts
router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('satoken')) {
    console.log('1')
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      console.log(to.path)
      next(`/?redirect=${to.path}`)
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
