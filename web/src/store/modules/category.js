import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
import func from '@/public/js/function'
Vue.prototype.$func = func
const state = {
    categoryList:[],
    currentCategoryID:'',
    articleList:[],
    article:{},
    loadingCategory:false,
    loadingArticleList:false,
    loadingArticle:false,
    isMore:true,
    currentPage:1,
    pageSize:10
}
const mutations = {
    addCurrentPage(state) {
        state.currentPage = state.currentPage+1
    },
    clearCurrentPage(state) {
        state.currentPage = 1
    },
	getCategoryList(state, payLoad){
        setTimeout(() => {
            state.categoryList = payLoad
            state.loadingCategory = false
        }, 500)
    },
    getArticleList(state, payLoad){
        //设置没有更多数据
        if(payLoad.length < state.pageSize) {
            state.isMore = false
        }
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        });
        setTimeout(() => {
            if(state.currentPage == 1){
                state.articleList = payLoad
            }else{
                state.articleList = state.articleList.concat(payLoad)
            }
            state.loadingArticleList = false
        }, 500)
    },
    setCurrentCategoryID(state, payLoad){
        if(!payLoad){
            payLoad = ''
        }
        state.isMore = true
        state.currentCategoryID = payLoad
    },
    getArticle(state, payLoad){
        setTimeout(() => {
            state.article = payLoad
            state.loadingArticle = false
        }, 500)
    }
}
const actions = {
    //获取文章分类
    async getCategoryList({commit}){
        state.loadingCategory = true
        let res = await Vue.prototype.$http.get('/category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)
        }
    },
    //获取文章列表
    async getArticleList({state, commit}){
        state.loadingArticleList = true
        // console.log({id:state.currentCategoryID, currentPage:state.currentPage, pageSize:state.pageSize})
        let res = await Vue.prototype.$http.post('/articleList',{id:state.currentCategoryID, currentPage:state.currentPage, pageSize:state.pageSize})
        if(res.data.code == 0){
            commit('getArticleList', res.data.articleList)
        }
    },
    //根据搜索获取文章列表
    async searchArticle({state, commit}, payLoad){
        let { search } = payLoad
        state.loadingArticleList = true
        console.log(search)
        let res = await Vue.prototype.$http.post('/search',{search, currentPage:state.currentPage, pageSize:state.pageSize})
        if(res.data.code == 0){
            commit('getArticleList',res.data.articleList)
        }
    },
    //获取文章详情
    async getArticle({state, commit}, payLoad){
        let {id, next} = payLoad
        next = next || 0
        state.loadingArticle = true
        let res =  await Vue.prototype.$http.post('/article', {id, next})
        if(res.data.code == 0) {
            res.data.article.time = Vue.prototype.$func.getTime(parseInt(res.data.article.time))
            commit('getArticle', res.data.article)
        }
    },
}

export default {
    state,
    mutations,
    actions
}