import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
import func from '@/public/js/function'
Vue.prototype.$func = func

const state = {
    categoryList:[],
}
const mutations = {
	getCategoryList(state, payLoad){
        state.categoryList = payLoad
        // state.loadingCategory = false
    },
}
const actions = {
    //获取文章分类
    async getCategoryList({commit}){
        let res = await Vue.prototype.$http.get('/category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)

        }
    },
 
}

export default {
    state,
    mutations,
    actions
}