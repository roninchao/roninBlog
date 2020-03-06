// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router/router'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册ElementUI
Vue.use(ElementUI);
//引入公共CSS
import '@/public/css/common.css'
//引入公共方法
import func from '@/public/js/function'
// 注册公共方法
Vue.prototype.$func = func
//引入axios
import axios from '@/public/js/axios'
// 注册axios实例
Vue.prototype.$http = axios.instance

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
