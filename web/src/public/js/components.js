import Vue from 'vue'

// 自定义组件   ============开始
// 公共头部
// Vue.component('md-header', resolve => require(['@/components/header'], resolve))
// //侧边导航栏
// Vue.component('md-asider', resolve => require(['@/components/asider'], resolve))
// //侧边栏
// Vue.component('md-contentAsider', resolve => require(['@/components/contentAsider'], resolve))
// //搜索
// Vue.component('md-search', resolve => require(['@/components/search'], resolve))
// //文章列表单个
// Vue.component('md-artistDesc', resolve => require(['@/components/artistDesc'], resolve))
// //评论
// Vue.component('md-comments', resolve => require(['@/components/comments'], resolve))

/* 侧边导航栏 */
Vue.component('md-navAside', resolve => require(['@/components/navAside'], resolve))
/* 文章简介 */
Vue.component('md-articleDesc', resolve => require(['@/components/articleDesc'], resolve))
/* 文章列表轮播 */
Vue.component('md-articleSwiper', resolve => require(['@/components/articleSwiper'], resolve))
/* 文章列表轮播 */
Vue.component('md-ranking', resolve => require(['@/components/ranking'], resolve))
/* 页脚 */
Vue.component('md-footer', resolve => require(['@/components/footer'], resolve))

