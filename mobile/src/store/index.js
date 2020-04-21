import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './modules/users'
import article from './modules/article'
import comments from './modules/comments'
import chatroom from './modules/chatroom'

const store = new Vuex.Store({
    modules:{
        users:{
            namespaced: true,
            ...users
        },
        article:{
            namespaced: true,
            ...article
        },
        comments:{
            namespaced: true,
            ...comments
        },
        chatroom:{
            namespaced:true,
            ...chatroom
        }
    }
})

export default store