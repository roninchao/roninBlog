import Vue from 'vue'
import router from '@/router/index'
let state = {
    userInfo:{},
}

let mutations = {
    login(state, payLoad){
        let { avatar, token, userID, username } = payLoad
        // state.userInfo = { avatar, token, userID, username }
        Vue.prototype.$cookie.set('userID', userID)
        Vue.prototype.$cookie.set('username', username)
        if(avatar){
            Vue.prototype.$cookie.set('avatar', avatar)
        }
        Vue.prototype.$cookie.set('mobileToken', token)
        router.push('/')
    },
    logout(state){
        // state.userInfo = {}
        Vue.prototype.$cookie.remove('mobileToken')
        Vue.prototype.$cookie.remove('avatar')
        Vue.prototype.$cookie.remove('userID')
        router.push('/')
    },
    getUserInfo(state, payLoad){
        console.log(payLoad)
        state.userInfo = payLoad
    },
}

let actions = {
    async login({commit}, payLoad) {
        let {username, password} = payLoad
        let res = await Vue.prototype.$http.post('/login', {username, password})
        if(res.data.code == 0){
            commit('login',res.data.data)
        }
    },
    async register({commit}, payLoad){
        let {username, password} = payLoad
        let res = await Vue.prototype.$http.post('/register', {username, password})
        if(res.data.code == 0){
            Vue.prototype.$notify({ type: 'success', message: res.data.message });
            Vue.prototype.$cookie.set('username', username)
            router.push('/otherPage/login')
        }
    },
    async getUserInfo({commit}, payLoad){
        let {userId} = payLoad
        Vue.prototype.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        let res = await Vue.prototype.$http.post('/personInfo', {userId})
        if(res.data.code == 0){
            console.log(res.data.user)
            commit('getUserInfo',res.data.user)
        }
        Vue.prototype.$toast.clear()
    },
    async updateUserInfo({state, commit}){
        let userInfo = state.userInfo
        console.log(state.userInfo)
        Vue.prototype.$toast.loading({
            message: '保存...',
            forbidClick: true,
          });
        let res = await Vue.prototype.$http.put(`/personInfo/${userInfo._id}`, userInfo)
        if(res.data.code == 0){
            Vue.prototype.$notify({ type: 'success', message: res.data.message });
        }
        Vue.prototype.$toast.clear()
    }
}

export default  {
    state,
    mutations,
    actions
}