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
            path:'/admin',
            meta:{
                requireAuth:true
            },
            component:() => import('@/views/index'),
            children:[
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