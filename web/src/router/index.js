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
// router.beforeEach((to, from, next) => {
//     if(to.meta.requireAuth && !jsCookie.get('token')){
//         router.push('/login')
//     }else{
//         next()
//     }
// })
export default router