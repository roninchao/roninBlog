import Vue from 'vue'
import Router from 'vue-router'
import jsCookie from 'js-cookie'
Vue.use(Router)
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
let vueRouter = new Router({
    mode:"hash",
    routes: [
        {
            path:'/',
            redirect:{
                path:'/tabBar/home'
            }
        },
        {   
            path:'/tabBar',
            name:'tabBar',
            component:() => import('@/views/tabBarPage/index'),
            children:[
                {
                    path:'home',
                    name:'home',
                    meta:{
                        name:'首页'
                    },
                    component:() => import('@/views/tabBarPage/pages/home')
                },
                {
                    path:'classify',
                    name:'classify',
                    meta:{
                        name:'分类'
                    },
                    component:() => import('@/views/tabBarPage/pages/classify')
                },
                {
                    path:'chatroom',
                    name:'chatroom',
                    meta:{
                        name:'聊天室',
                        requireAuth: true
                    },
                    component:() => import('@/views/tabBarPage/pages/chatroom')
                },
                {
                    path:'personCentre',
                    name:'personCentre',
                    meta:{
                        name:'设置',
                        requireAuth: true
                    },
                    component:() => import('@/views/tabBarPage/pages/personCentre')
                }
            ]
        },
        {   
            path:'/childPage',
            name:'childPage',
            component:() => import('@/views/childPage/index'),
            children:[
                {
                    path:'articleDetail',
                    name:'articleDetail',
                    meta:{
                        name:'文章详情'
                    },
                    component:() => import('@/views/childPage/pages/articleDetail')
                }
            ]
        },
        {   
            path:'/otherPage',
            name:'otherPage',
            component:() => import('@/views/otherPage/index'),
            children:[
                {
                    path:'login',
                    name:'login',
                    meta:{
                        name:'登录'
                    },
                    component:() => import('@/views/otherPage/pages/login')
                },
                {
                    path:'register',
                    name:'register',
                    meta:{
                        name:'注册'
                    },
                    component:() => import('@/views/otherPage/pages/register')
                }
            ]
        },
    ]
})
// 导航守卫
vueRouter.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !jsCookie.get('mobileToken')){
        Vue.prototype.$dialog.confirm({
            message: '您还没有登录, 是否前往登录?',
        })
        .then(() => {
            vueRouter.push('/otherPage/login')
        })
        .catch(() =>{})
    }else{
        next()
    }
})
//防止多次点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default vueRouter