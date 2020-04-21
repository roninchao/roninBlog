// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import store from './store/index'
// 引入设置根节点fontsize
// import "@/public/js/setFontSize"
// 引入路由
import router from './router'
//引入Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//引入公共组件
import '@/public/js/components'
//引入公共CSS
import '@/public/css/common.css'
// 把vant px转化为rem
import 'amfe-flexible/index.js'
//引入公共方法
import func from '@/public/js/function'
Vue.prototype.$func = func
// 引入js-cookie
import jsCookie from 'js-cookie'
Vue.prototype.$cookie = jsCookie
//引入axios
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
//引入vue-socket.io
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug:false,
    connection: 'http://localhost:3000',  //
}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})