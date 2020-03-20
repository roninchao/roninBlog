import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import category from './modules/category'
import comments from './modules/comments'

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
    }
})

export default store