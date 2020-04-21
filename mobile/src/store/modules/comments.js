import Vue from 'vue'

const state = {
    commentsList:[],
    total:0
}
const mutations = {
    getCommentList(state, payLoad) {
        if(payLoad.data){
            payLoad.data.map(item => {
                item.time = Vue.prototype.$func.getTime(parseInt(item.time))
            })
        }
        state.commentsList = payLoad.data
        state.total = payLoad.total
    }
}
const actions = {
    async addComment({state, commit}, payLoad){
        let {articleId, reviewerId, commentatorId, content} = payLoad
        let res = await Vue.prototype.$http.post('/comments', {articleId, reviewerId, commentatorId, content})
    },
    async getCommentList({state, commit}, payLoad){
        let {articleId, currentPage, pageSize} = payLoad
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