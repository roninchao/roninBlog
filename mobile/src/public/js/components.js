import Vue from 'vue'

// 自定义组件   ============开始
/* tabBar */
Vue.component('md-tabBar', resolve => require(['@/components/tabBar'], resolve))
// 文章简介
Vue.component('md-articleDesc', resolve => require(['@/components/articleDesc'], resolve))
// header
Vue.component('md-header', resolve => require(['@/components/header'], resolve))