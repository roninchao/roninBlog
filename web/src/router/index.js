import Vue from 'vue'
import Router from 'vue-router'
import jsCookie from 'js-cookie'
Vue.use(Router)

const router =  new Router({
    mode:'hash',
    routes:[
        {
            path:'/login',
            name:'login',
            component:() => import('@/views/otherPages/login'),
        },
        {
            path:'/',
            redirect:{
                path:'/index'
            },
            component:() => import('@/views/index'),
            children:[ 
                {
                    path: 'index',
                    name: 'index',
                    component: resolve => require(['@/views/childPages/articleList'], resolve),
                },
                {
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