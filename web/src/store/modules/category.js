import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
import func from '@/public/js/function'
Vue.prototype.$func = func

const state = {
    // 分类列表
    categoryList:[],
    // 文章列表轮播
    articleSwiper:[],
    // 文章列表
    articleList:[],
    //文章详情
    articleDetail:{},
    // 当前页
    currentPage:1,
    // 每页大小
    pageSize:10
}
const mutations = {
	getCategoryList(state, payLoad){
        state.categoryList = payLoad
    },
    getArticleList(state, payLoad){
        // 将时间戳转化为标准时间
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        })
        for(let i=0; i<4; i++) {
            state.articleSwiper.push(payLoad[i])
        }
        state.articleList = payLoad
    },
    getArticleDetail(state, payLoad){
        state.articleDetail = payLoad
    }
}
const actions = {
    //获取文章分类
    async getCategoryList({commit}){
        let res = await Vue.prototype.$http.get('/category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)
        }
    },
    //获取文章列表
    async getArticleList({state, commit}){
        let res = await Vue.prototype.$http.post('/articleList', {id:'', currentPage: state.currentPage, pageSize:state.pageSize})
        if(res.data.code == 0){
            commit('getArticleList',res.data.articleList)
        }
    },
    //获取文章详情
    async getArticleDetail({commit}, payLoad){
        let {id, next} = payLoad
        next = next || 0
        let res =  await Vue.prototype.$http.post('/article', {id, next})
        if(res.data.code == 0) {
            res.data.article.time = Vue.prototype.$func.getTime(parseInt(res.data.article.time))
            commit('getArticleDetail', res.data.article)
        }
    }
}

export default {
    state,
    mutations,
    actions
}