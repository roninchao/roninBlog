import Vue from 'vue'
import Router from 'vue-router'
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
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     if(to.meta.requireAuth && !localStorage.token){
//         router.push('/loginAdmin')
//     }else{
//         next()
//     }
// })
export default router