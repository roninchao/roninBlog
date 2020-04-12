import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import category from './modules/category'
import comments from './modules/comments'
import chatroom from './modules/chatroom'

const store = new Vuex.Store({
    modules:{
        category:{
			namespaced: true,
			...category
        },
        comments:{
			namespaced: true,
			...comments
        },
        chatroom:{
			namespaced: true,
			...chatroom
		},
    }
})

export default store