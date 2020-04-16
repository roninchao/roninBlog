import Vue from 'vue'

// 自定义组件   ============开始
/* tabBar */
Vue.component('md-tabBar', resolve => require(['@/components/tabBar'], resolve))