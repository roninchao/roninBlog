import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import category from './modules/category'

const store = new Vuex.Store({
    modules:{
        category:{
			namespaced: true,
			...category
		},
    }
})

export default store