import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance

const state = {
    comment:{},
    commentsList:[],
}
const mutations = {}
const actions = {
    async addComment({state, commit}, payLoad){
        let {articleId, reviewerId, commentatorId, content} = payLoad
        console.log({articleId, reviewerId, commentatorId, content} )
        let res = await Vue.prototype.$http.post('/comments', {articleId, reviewerId, commentatorId, content})
        console.log('fff')
        // if(res.data.code == 0){
        //     console.log(res.data.data)
        // } 
    },
    async getCommentList(){
        await Vue.prototype.$http.post('/getCommentList')
    }
}
export default {
    state,
    mutations,
    actions
}