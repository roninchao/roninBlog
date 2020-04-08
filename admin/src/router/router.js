import Vue from 'vue'
import Router from 'vue-router'
import jsCookie from 'js-cookie'
Vue.use(Router)

const router =  new Router({
    mode:'hash',
    routes:[
        {
            path:'/loginAdmin',
            name:'loginAdmin',
            component:() => import('@/views/login'),
        },
        {
            path:'/',
            redirect:{
                path:'/admin'
            },
        },
        {
            path:'/admin',
            meta:{
                requireAuth:true
            },
            redirect:{
                path:'/admin/index'
            },
            component:() => import('@/views/index'),
            children:[ 
                {
                    path: 'index',
                    name: 'index',
                    component: resolve => require(['@/views/childPages/index'], resolve),
                },
                {
                    path:'usersManage',
                    name:'usersManage',
                    component:() => import('@/views/childPages/usersManage/usersInfo')
                },
                {
                    path:'category',
                    name:'category',
                    component:() => import('@/views/childPages/articleManage/category')
                },
                {
                    path:'article',
                    name:'article',
                    component:() => import('@/views/childPages/articleManage/article')
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !jsCookie.get('token')){
        router.push('/loginAdmin')
    }else{
        next()
    }
})
export default router