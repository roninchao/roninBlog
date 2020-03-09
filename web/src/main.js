// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入公共组件
import '@/public/js/components'
//引入公共CSS
import '@/public/css/common.css'
//引入公共方法
import func from '@/public/js/function'
Vue.prototype.$func = func
// 引入js-cookie
import jsCookie from 'js-cookie'
Vue.prototype.$cookie = jsCookie
//引入axios
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
