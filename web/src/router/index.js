import Vue from 'vue'
import Router from 'vue-router'
import jsCookie from 'js-cookie'
Vue.use(Router)

const router =  new Router({
    mode:'hash',
    routes:[
        {   //登录
            path:'/login',
            name:'login',
            component:() => import('@/views/otherPages/login'),
        },
        {   //注册
            path:'/register',
            name:'register',
            component:() => import('@/views/otherPages/register'),
        },
        {   //聊天室
            path:'/chatRoom',
            name:'chatRoom',
            meta:{
                requireAuth: true
            },
            component:() => import('@/views/otherPages/chatRoom'),
        },
        {   //个人中心
            path:'/personCentre',
            name:'personCentre',
            meta:{
                requireAuth: true
            },
            component:() => import('@/views/otherPages/personCentre'),
        },
        {
            path:'/',
            redirect:{
                path:'/index'
            },
            component:() => import('@/views/index'),
            children:[ 
                {   //文章列表
                    path: 'index',
                    name: 'index',
                    component: resolve => require(['@/views/childPages/articleList'], resolve),
                },
                {   //文章详情
                    path: 'detail',
                    name: 'detail',
                    component: resolve => require(['@/views/childPages/articleDetail'], resolve),
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !jsCookie.get('webToken')){
        Vue.prototype.$confirm('您还没有登录, 是否前往登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            router.push('/login')
        })
    }else{
        next()
    }
})
export default router