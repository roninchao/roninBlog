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
}
const mutations = {
	getCategoryList(state, payLoad){
        setTimeout(() => {
            state.categoryList = payLoad
            state.loadingCategory = false
        }, 500)
    },
    getArticleList(state, payLoad){
        console.log(payLoad.data.length)
        console.log(payLoad.pageSize)
        if(payLoad.data.length < payLoad.pageSize) {
            state.isMore = false
        }
        payLoad.data.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        });
        setTimeout(() => {
            if(payLoad.currentPage == 1){
                state.articleList = payLoad.data
            }else{
                state.articleList.concat(payLoad.data)
            }
            state.loadingArticleList = false
        }, 500)
    },
    setCurrentCategoryID(state, payLoad){
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
    async getArticleList({state, commit}, payLoad){
        let { currentPage, pageSize} = payLoad
        state.loadingArticleList = true
        let res = await Vue.prototype.$http.post('/articleList',{id:state.currentCategoryID, currentPage, pageSize})
        if(res.data.code == 0){
            commit('getArticleList',{data:res.data.articleList, currentPage, pageSize})
        }
    },
    //根据搜索获取文章列表
    async searchArticle({state, commit}, payLoad){
        console.log(payLoad)
        state.loadingArticleList = true
        let res = await Vue.prototype.$http.post('/search',{search: payLoad.search, currentPage:1, pageSize:10})
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