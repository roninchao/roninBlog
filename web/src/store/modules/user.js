import Vue from 'vue'
// import http from '@/public/js/axios'
// Vue.prototype.$http = http.instance
// import func from '@/public/js/function'
// Vue.prototype.$func = func

const state = {
    userInfo:{}
}
const mutations = {
    getUserInfo(state, payLoad){
        console.log(payLoad)
        state.userInfo = payLoad
    },
}
const actions = {
    async getUserInfo({commit}, payLoad){
        let {userId} = payLoad
        const loading = Vue.prototype.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        let res = await Vue.prototype.$http.post('/personInfo', {userId})
        if(res.data.code == 0){
            commit('getUserInfo',res.data.user)
        }
        loading.close();
    },
    async updateUserInfo({state, commit}){
        let userInfo = state.userInfo
        const loading = Vue.prototype.$loading({
            lock: true,
            text: '保存中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        let res = await Vue.prototype.$http.put(`/personInfo/${userInfo._id}`, userInfo)
        if(res.data.code == 0){
            Vue.prototype.$message.success(res.data.message)
        }
        loading.close();
    }
}
export default {
    state,
    mutations,
    actions
}