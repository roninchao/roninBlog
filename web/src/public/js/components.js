import Vue from 'vue'

// 自定义组件   ============开始
// 公共头部
Vue.component('md-header', resolve => require(['@/components/header'], resolve))
Vue.component('md-asider', resolve => require(['@/components/asider'], resolve))
Vue.component('md-contentAsider', resolve => require(['@/components/contentAsider'], resolve))
Vue.component('md-search', resolve => require(['@/components/search'], resolve))
Vue.component('md-artistDesc', resolve => require(['@/components/artistDesc'], resolve))