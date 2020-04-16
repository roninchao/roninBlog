import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let vueRouter = new Router({
    mode:"hash",
    routes: [
      // {   //登录
      //    path:'/login',
      //    name:'login',
      //    component:() => import('@/views/otherPages/login'),
      // },
      // {   //注册
      //     path:'/register',
      //     name:'register',
      //     component:() => import('@/views/otherPages/register'),
      // },
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
                    component:() => import('@/views/tabBarPage/pages/home')
                },
                {
                    path:'chatroom',
                    name:'chatroom',
                    component:() => import('@/views/tabBarPage/pages/chatroom')
                },
                {
                    path:'personCentre',
                    name:'personCentre',
                    component:() => import('@/views/tabBarPage/pages/personCentre')
                }
            ]
        },
        {   
            path:'/childPage',
            name:'childPage',
            component:() => import('@/views/childPages/index'),
            children:[
                {
                    path:'detail',
                    name:'detail',
                    component:() => import('@/views/childPages/pages/detail')
                },
                {
                    path:'detail2',
                    name:'detail2',
                    component:() => import('@/views/childPages/pages/detail2')
                }
            ]
        },
    ]
})

export default vueRouter