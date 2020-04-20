import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './modules/users'
import article from './modules/article'

const store = new Vuex.Store({
    modules:{
        users:{
            namespaced: true,
            ...users
        },
        article:{
            namespaced: true,
            ...article
        }
    }
})

export default store