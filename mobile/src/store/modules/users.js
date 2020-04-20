import Vue from 'vue'
import router from '@/router/index'
let state = {
    userInfo:{},
}

let mutations = {
    login(state, payLoad){
        let { avatar, token, userID, username } = payLoad
        state.userInfo = { avatar, token, userID, username }
        Vue.prototype.$cookie.set('userID', userID)
        Vue.prototype.$cookie.set('username', username)
        if(avatar){
            Vue.prototype.$cookie.set('avatar', avatar)
        }
        Vue.prototype.$cookie.set('mobileToken', token)
        router.push('/')
    },
    logout(state){
        state.userInfo = {}
        Vue.prototype.$cookie.remove('mobileToken')
        Vue.prototype.$cookie.remove('avatar')
        Vue.prototype.$cookie.remove('userID')
        router.push('/')
    }
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
    }
}

export default  {
    state,
    mutations,
    actions
}