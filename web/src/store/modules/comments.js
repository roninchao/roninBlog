import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance

const state = {
    comment:{},
    commentsList:[],
    commentListLoading:false,
    total:0
}
const mutations = {
    getCommentList(state, payLoad) {
        setTimeout(() => {
            state.commentsList = payLoad.data
            state.total = payLoad.total
            state.commentListLoading = false
        }, 500)
    }
}
const actions = {
    async addComment({state, commit}, payLoad){
        let {articleId, reviewerId, commentatorId, content} = payLoad
        let res = await Vue.prototype.$http.post('/comments', {articleId, reviewerId, commentatorId, content})
    },
    async getCommentList({state, commit}, payLoad){
        let {articleId, currentPage, pageSize} = payLoad
        state.commentListLoading = true
        let res = await Vue.prototype.$http.post('/commentList',{articleId, currentPage, pageSize})
        if(res.data.code == 0) {
            commit('getCommentList', res.data)
        }
    }
}
export default {
    state,
    mutations,
    actions
}