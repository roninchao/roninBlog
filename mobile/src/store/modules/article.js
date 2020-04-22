import Vue from 'vue'

let state = {
    articleList:[],
    hotRanking:[],
    newRanking:[],
    swiper:[],
    article:{},
    categoryList:[],
    abilityList:[],
    isMore:true
}
let mutations = {
    getSwiper(state, payLoad) {
        state.swiper = payLoad
    },
    getHotRanking(state, payLoad) {
         // 将时间戳转化为标准时间
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        })
        state.hotRanking = payLoad
    },
    getNewRanking(state, payLoad) {
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        })
        state.newRanking = payLoad
    },
    getArticle(state,payLoad){
        payLoad.time = Vue.prototype.$func.getTime(parseInt(payLoad.time))
        state.article = payLoad
    },
    getCategoryList(state,payLoad){
        payLoad.unshift({_id:0, category:"全部"})
        state.categoryList = payLoad
        state.abilityList = []
        payLoad.forEach((item, index) => {
            if(index != 0){
                state.abilityList.push(item)
            }
        }); 
    },
    getArticleList(state,payLoad){
        if(payLoad.data.length < payLoad.pageSize){
            state.isMore  = false
        }
        payLoad.data.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        })
        state.articleList = state.articleList.concat(payLoad.data)
    },
    clearArticleList(state){
        state.articleList = []
        state.isMore = true
    }
}
let actions = {
    async getSwiper({commit}){
        let res = await Vue.prototype.$http('swiper')
        if(res.data.code  == 0){
            commit('getSwiper', res.data.swiper)
        }
    },
    async getHotRanking({commit}){
        Vue.prototype.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        let res = await Vue.prototype.$http('commentsRanking')
        if(res.data.code  == 0){
            commit('getHotRanking', res.data.commentsRanking)
        }
        Vue.prototype.$toast.clear()
    },
    async getNewRanking({commit}) {
        Vue.prototype.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        let res = await Vue.prototype.$http('newRanking')
        if(res.data.code  == 0){
            commit('getNewRanking', res.data.newRanking)
        }
        Vue.prototype.$toast.clear()
    },
    async getArticle({commit},payLoad){
        let {id} = payLoad
        Vue.prototype.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        let res = await Vue.prototype.$http.post('article', {id})
        if(res.data.code == 0) {
            commit('getArticle', res.data.article)
        }
         Vue.prototype.$toast.clear()
    },
    async getCategoryList({commit}){
        let res = await Vue.prototype.$http.get('category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)
        }
    },
    async getArticleList({commit}, payLoad){
        let {id, currentPage, pageSize} = payLoad
        let res = await Vue.prototype.$http.post('/articleList', {id, currentPage, pageSize})
        if(res.data.code == 0){
            commit('getArticleList',{data:res.data.articleList,pageSize})
        }
    }
}

export default {
    state,
    mutations,
    actions
}