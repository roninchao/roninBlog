import Vue from 'vue'

// 自定义组件   ============开始
/* tabBar */
Vue.component('md-tabBar', resolve => require(['@/components/tabBar'], resolve))
// 文章简介
Vue.component('md-articleDesc', resolve => require(['@/components/articleDesc'], resolve))
// 公共头部
Vue.component('md-header', resolve => require(['@/components/header'], resolve))
// 排行榜
Vue.component('md-ranking', resolve => require(['@/components/ranking'], resolve))
// 文章详情
Vue.component('md-articleDetail', resolve => require(['@/components/articleDetail'], resolve))
// 评论
Vue.component('md-comments', resolve => require(['@/components/comments'], resolve))