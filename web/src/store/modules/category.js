import Vue from 'vue'
// import http from '@/public/js/axios'
// Vue.prototype.$http = http.instance
// import func from '@/public/js/function'
// Vue.prototype.$func = func

const state = {
    // 分类列表
    categoryList:[],
    abilityList:[],
    //当前选中分类ID
    selectedCateID: 0,
    // 文章列表
    articleList:[],
    //文章详情
    articleDetail:{},
    // 当前页
    currentPage:1,
    // 每页大小
    pageSize:10,
    // 是否还有更多
    isMore: true,
    // 热评榜
    commentsRanking:[],
    // 新增榜
    newRanking:[],
    // 轮播图
    swiper:[]
}
const mutations = {
    // 设置选中分类
    setSelectedCateID(state, payLoad) {
        if(state.selectedCateID != payLoad) {
            state.articleList = []
        }
        state.currentPage = 1
        state.pageSize = 10
        state.isMore = true
        state.selectedCateID = payLoad
    },
    clearArticleList(state){
        state.articleList = []
        state.currentPage = 1
        state.pageSize = 10
        state.isMore = true
    },
    // 设置页面
    setPage(state, payLoad){
        let {currentPage, pageSize} = payLoad
        state.currentPage = currentPage;
        state.pageSize = pageSize;
    },
	getCategoryList(state, payLoad){
        payLoad.unshift({_id:0, category:"全部"})
        state.categoryList = payLoad
        state.abilityList = []
        payLoad.forEach((item, index) => {
            if(index != 0){
                state.abilityList.push(item)
            }
        }); 
    },
    getCommentsRanking(state, payLoad){
        state.commentsRanking = payLoad
    },
    getNewRanking(state, payLoad){
        state.newRanking = payLoad
    },
    getSwiper(state, payLoad){
        state.swiper = payLoad
    },
    getArticleList(state, payLoad){
        // 将时间戳转化为标准时间
        payLoad.map(item => {
            item.time = Vue.prototype.$func.getTime(parseInt(item.time))
        })
        if(payLoad.length < state.pageSize) {
            state.isMore = false
        }
        // let len = 4;
        // if(payLoad.length < 4){
        //     len = payLoad.length
        // }
        state.articleList = state.articleList.concat(payLoad)
    },
    getArticleDetail(state, payLoad){
        state.articleDetail = payLoad
    }
}
const actions = {
    //获取文章分类
    async getCategoryList({commit}){
        let res = await Vue.prototype.$http.get('/category')
        if(res.data.code == 0){
            commit('getCategoryList',res.data.cate)
        }
    },
    //获取热评榜
    async getCommentsRanking({commit}){
        let res = await Vue.prototype.$http.get('/commentsRanking')
        if(res.data.code == 0){
            commit('getCommentsRanking',res.data.commentsRanking)
        }
    },
    //获取新增榜
    async getNewRanking({commit}){
        let res = await Vue.prototype.$http.get('/newRanking')
        if(res.data.code == 0){
            commit('getNewRanking',res.data.newRanking)
        }
    },
    // 获取轮播图
    async getSwiper({commit}){
        let res = await Vue.prototype.$http.get('/swiper')
        if(res.data.code == 0) {
            commit('getSwiper', res.data.swiper)
        }
    },
    //获取文章列表
    async getArticleList({state, commit}){
        const loading = Vue.prototype.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        let res = await Vue.prototype.$http.post('/articleList', {id:state.selectedCateID, currentPage: state.currentPage, pageSize:state.pageSize})
        if(res.data.code == 0){
            commit('getArticleList',res.data.articleList)
        }
        loading.close();
    },
    //获取文章详情
    async getArticleDetail({commit}, payLoad){
        let {id, next} = payLoad
        next = next || 0
        const loading = Vue.prototype.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        let res =  await Vue.prototype.$http.post('/article', {id, next})
        if(res.data.code == 0) {
            res.data.article.time = Vue.prototype.$func.getTime(parseInt(res.data.article.time))
            commit('getArticleDetail', res.data.article)
        }
        loading.close();
    }
}

export default {
    state,
    mutations,
    actions
}