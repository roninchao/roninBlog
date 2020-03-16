import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
import func from '@/public/js/function'
Vue.prototype.$func = func
const state = {
    categoryList:[],
    currentCategoryID:'',
    articleList:[],
    loadingCategory:false,
    loadingArticleList:false
}
const mutations = {
	getCategoryList(state, payLoad){
        setTimeout(() => {
            state.categoryList = payLoad
            state.loadingCategory = false
        }, 500)
    },
    getArticleList(state, payLoad){
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        });
        setTimeout(() => {
            state.articleList = payLoad
            state.loadingArticleList = false
        }, 500)
    },
    setCurrentCategoryID(state, payLoad){
        state.currentCategoryID = payLoad
    }
}
const actions = {
    async getCategoryList({commit}){
        state.loadingCategory = true
        let res = await Vue.prototype.$http.get('/category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)
        }
    },
    async getArticleList({state, commit}){
        console.log(state.currentCategoryID,'dd')
        state.loadingArticleList = true
        let res = await Vue.prototype.$http.post('/article',{id:state.currentCategoryID})
        if(res.data.code == 0){
            commit('getArticleList',res.data.articleList)
        }
    },
}

export default {
    state,
    mutations,
    actions
}