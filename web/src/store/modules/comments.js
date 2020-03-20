import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance

const state = {
    comment:{},
    commentsList:[],
    commentListLoading:false,
}
const mutations = {
    getCommentList(state, payLoad) {
        setTimeout(() => {
            state.commentsList = payLoad
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
        let {articleId, currentpage, pageSize} = payLoad
        state.commentListLoading = true
        let res = await Vue.prototype.$http.post('/commentList',{articleId, currentpage, pageSize})
        if(res.data.code == 0) {
            commit('getCommentList', res.data.data)
        }
    }
}
export default {
    state,
    mutations,
    actions
}