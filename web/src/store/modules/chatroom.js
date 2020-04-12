import Vue from 'vue'
import http from '@/public/js/axios'
Vue.prototype.$http = http.instance
import moment from 'moment'
moment.locale('zh-cn');
Vue.prototype.$moment = moment;
import func from '@/public/js/function'
Vue.prototype.$func = func
const state = {
    chatList:[]
}
const mutations = {
    addChatItem(state, payLoad){
        payLoad.time = ""
        state.chatList.push(payLoad)
    },
    getChatList(state, payLoad) {
        let  arr = [];
        payLoad.forEach((item, index) => {
            item.time = parseInt(item.time)
            let nextTime = parseInt(payLoad[0].time);
            if(index != payLoad.length-1){
                nextTime = payLoad[index+1].time
                if(nextTime -item.time >= (3*60*1000)){
                    item.time = Vue.prototype.$func.getTime2(item.time)
                }else{
                    item.time = ""
                }
            }else{
                item.time = Vue.prototype.$func.getTime2(item.time)
            }
            arr.push(item)
        })
        state.chatList = arr
    }
}
const actions = {
    async getChatList({commit}){
        let res = await Vue.prototype.$http.get('/chatList')
        if(res.data.code == 0){
            commit('getChatList', res.data.chatList)
        }
    }
}

export default {
    state,
    mutations,
    actions
}